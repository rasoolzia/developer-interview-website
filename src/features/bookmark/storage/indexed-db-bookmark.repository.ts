import { dbDelete, dbGet, dbGetAll, dbPut } from "@/shared/lib";

import type { BookmarkItem, BookmarkList, BookmarkRepository } from "../model";

export class DuplicateListNameError extends Error {}

export const indexedDbBookmarkRepository: BookmarkRepository = {
  getLists(): Promise<BookmarkList[]> {
    return dbGetAll<BookmarkList>("bookmarkLists").then((lists) =>
      lists.sort((a, b) => b.createdAt - a.createdAt),
    );
  },

  getItems(listId: string): Promise<BookmarkItem[]> {
    return dbGetAll<BookmarkItem>("bookmarkItems").then((items) =>
      items
        .filter((item) => item.listId === listId)
        .sort((a, b) => b.createdAt - a.createdAt),
    );
  },

  async isQuestionSaved(questionId: string): Promise<boolean> {
    const items = await dbGetAll<BookmarkItem>("bookmarkItems");
    return items.some((item) => item.questionId === questionId);
  },

  async createList(name: string): Promise<BookmarkList> {
    const normalized = name.trim().toLowerCase();
    const existing = await dbGetAll<BookmarkList>("bookmarkLists");
    if (existing.some((l) => l.name.trim().toLowerCase() === normalized)) {
      throw new DuplicateListNameError(name);
    }
    const list: BookmarkList = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await dbPut("bookmarkLists", list);
    return list;
  },

  async addQuestion(listId: string, questionId: string): Promise<void> {
    const existing = await dbGet<BookmarkItem>("bookmarkItems", [
      listId,
      questionId,
    ]);
    if (!existing) {
      await dbPut("bookmarkItems", {
        listId,
        questionId,
        createdAt: Date.now(),
      });
    }
  },

  removeQuestion(listId: string, questionId: string): Promise<void> {
    return dbDelete("bookmarkItems", [listId, questionId]);
  },

  async deleteList(listId: string): Promise<void> {
    await dbDelete("bookmarkLists", listId);
    const items = await dbGetAll<BookmarkItem>("bookmarkItems");
    await Promise.all(
      items
        .filter((item) => item.listId === listId)
        .map((item) =>
          dbDelete("bookmarkItems", [item.listId, item.questionId]),
        ),
    );
  },

  async renameList(listId: string, name: string): Promise<void> {
    const list = await dbGet<BookmarkList>("bookmarkLists", listId);
    if (list) {
      await dbPut("bookmarkLists", { ...list, name, updatedAt: Date.now() });
    }
  },
};
