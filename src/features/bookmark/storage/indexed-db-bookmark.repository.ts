import { dbDelete, dbGet, dbGetAll, dbPut, getDb } from "@/shared/lib";

import type { BookmarkItem, BookmarkList, BookmarkRepository } from "../model";

export class DuplicateListNameError extends Error {}

async function assertUniqueListName(
  name: string,
  excludeListId?: string,
): Promise<string> {
  const trimmed = name.trim();
  const normalized = trimmed.toLowerCase();

  const existing = await dbGetAll<BookmarkList>("bookmarkLists");

  const duplicate = existing.some(
    (list) =>
      list.id !== excludeListId &&
      list.name.trim().toLowerCase() === normalized,
  );

  if (duplicate) {
    throw new DuplicateListNameError(name);
  }

  return trimmed;
}

const byCreatedAtDesc = <T extends { createdAt: number }>(a: T, b: T) =>
  b.createdAt - a.createdAt;

async function updateList(
  listId: string,
  update: (list: BookmarkList) => BookmarkList,
): Promise<BookmarkList | undefined> {
  const db = await getDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("bookmarkLists", "readwrite");
    const store = transaction.objectStore("bookmarkLists");
    const request = store.get(listId);
    let updatedList: BookmarkList | undefined;

    request.onsuccess = () => {
      const list = request.result as BookmarkList | undefined;
      if (list) {
        updatedList = update(list);
        store.put(updatedList);
      }
    };
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => resolve(updatedList);
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

async function mutateListQuestion(
  listId: string,
  questionId: string,
  operation: "add" | "remove",
): Promise<void> {
  const db = await getDb();

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(
      ["bookmarkItems", "bookmarkLists"],
      "readwrite",
    );
    const items = transaction.objectStore("bookmarkItems");
    const request = items.get([listId, questionId]);

    request.onsuccess = () => {
      const item = request.result as BookmarkItem | undefined;
      const changed = operation === "add" ? !item : !!item;
      if (!changed) return;

      if (operation === "add") {
        items.put({ listId, questionId, createdAt: Date.now() });
      } else {
        items.delete([listId, questionId]);
      }

      const lists = transaction.objectStore("bookmarkLists");
      const listRequest = lists.get(listId);
      listRequest.onsuccess = () => {
        const list = listRequest.result as BookmarkList | undefined;
        if (list) lists.put({ ...list, updatedAt: Date.now() });
      };
    };
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

export const indexedDbBookmarkRepository: BookmarkRepository = {
  async getLists() {
    const lists = await dbGetAll<BookmarkList>("bookmarkLists");
    return lists.sort(byCreatedAtDesc);
  },

  async getAllItems() {
    return dbGetAll<BookmarkItem>("bookmarkItems");
  },

  async getItems(listId) {
    const items = await dbGetAll<BookmarkItem>("bookmarkItems");
    return items.filter((item) => item.listId === listId).sort(byCreatedAtDesc);
  },

  async isQuestionSaved(questionId) {
    const items = await dbGetAll<BookmarkItem>("bookmarkItems");
    return items.some((item) => item.questionId === questionId);
  },

  async createList(name) {
    const trimmed = await assertUniqueListName(name);

    const now = Date.now();
    const list: BookmarkList = {
      id: crypto.randomUUID().split("-")[0],
      name: trimmed,
      createdAt: now,
      updatedAt: now,
    };

    await dbPut("bookmarkLists", list);
    return list;
  },

  async addQuestion(listId, questionId) {
    await mutateListQuestion(listId, questionId, "add");
  },

  async removeQuestion(listId, questionId) {
    await mutateListQuestion(listId, questionId, "remove");
  },

  async deleteList(listId) {
    await dbDelete("bookmarkLists", listId);

    const items = await dbGetAll<BookmarkItem>("bookmarkItems");
    const listItems = items.filter((item) => item.listId === listId);

    await Promise.all(
      listItems.map((item) =>
        dbDelete("bookmarkItems", [item.listId, item.questionId]),
      ),
    );
  },

  async renameList(listId, name) {
    const list = await dbGet<BookmarkList>("bookmarkLists", listId);
    if (!list) return;

    const trimmed = await assertUniqueListName(name, listId);

    return updateList(listId, (currentList) => ({
      ...currentList,
      name: trimmed,
      updatedAt: Date.now(),
    }));
  },
};
