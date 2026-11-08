import { dbDelete, dbGet, dbGetAll, dbPut } from "@/shared/lib";

import type { BookmarkItem, BookmarkList, BookmarkRepository } from "../model";

export class DuplicateListNameError extends Error {}

const byCreatedAtDesc = <T extends { createdAt: number }>(a: T, b: T) =>
  b.createdAt - a.createdAt;

export const indexedDbBookmarkRepository: BookmarkRepository = {
  async getLists() {
    const lists = await dbGetAll<BookmarkList>("bookmarkLists");
    return lists.sort(byCreatedAtDesc);
  },

  async getItems(listId) {
    const items = await dbGetAll<BookmarkItem>("bookmarkItems");
    return items.filter((item) => item.listId === listId).sort(byCreatedAtDesc);
  },

  async getItemsCount(listId) {
    //TODO remove if not needed
    const items = await dbGetAll<BookmarkItem>("bookmarkItems");
    return items.reduce(
      (count, item) => (item.listId === listId ? count + 1 : count),
      0,
    );
  },

  async isQuestionSaved(questionId) {
    const items = await dbGetAll<BookmarkItem>("bookmarkItems");
    return items.some((item) => item.questionId === questionId);
  },

  async createList(name) {
    const trimmed = name.trim();
    const normalized = trimmed.toLowerCase();

    const existing = await dbGetAll<BookmarkList>("bookmarkLists");
    if (existing.some((l) => l.name.trim().toLowerCase() === normalized)) {
      throw new DuplicateListNameError(name);
    }

    const now = Date.now();
    const list: BookmarkList = {
      id: crypto.randomUUID(),
      name: trimmed,
      createdAt: now,
      updatedAt: now,
    };
    await dbPut("bookmarkLists", list);
    return list;
  },

  async addQuestion(listId, questionId) {
    const existing = await dbGet<BookmarkItem>("bookmarkItems", [
      listId,
      questionId,
    ]);
    if (existing) return;

    await dbPut("bookmarkItems", {
      listId,
      questionId,
      createdAt: Date.now(),
    });
  },

  async removeQuestion(listId, questionId) {
    await dbDelete("bookmarkItems", [listId, questionId]);
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

    await dbPut("bookmarkLists", {
      ...list,
      name: name.trim(),
      updatedAt: Date.now(),
    });
  },
};
