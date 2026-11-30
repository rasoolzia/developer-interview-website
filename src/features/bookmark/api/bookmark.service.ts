import { getQuestionsByIds } from "@/entities/search/api/search.actions";
import type { Language, QuestionBase } from "@/shared/types";

import type { BookmarkItem, BookmarkList } from "../model";
import { bookmarkRepository } from "../storage";

export async function getBookmarkedQuestions(
  listId: string,
  language: Language,
): Promise<QuestionBase[]> {
  const items = await bookmarkRepository.getItems(listId);
  return getQuestionsByIds(
    items.map((item) => item.questionId),
    language,
  );
}

export async function resolveBookmarkListContext(
  listId: string,
  language: Language,
): Promise<{
  list: BookmarkList;
  items: BookmarkItem[];
  questions: QuestionBase[];
} | null> {
  const lists = await bookmarkRepository.getLists();
  const list = lists.find((item) => item.id === listId);
  if (!list) {
    return null;
  }

  const items = await bookmarkRepository.getItems(listId);
  const questions = await getQuestionsByIds(
    items.map((item) => item.questionId),
    language,
  );

  return { list, items, questions };
}
