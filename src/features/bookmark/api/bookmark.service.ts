import { getQuestionsByIds } from "@/entities/search/api/search.actions";
import type { Language } from "@/shared/types";

import type {
  BookmarkedQuestion,
  BookmarkItem,
  BookmarkList,
  BookmarkListSummary,
} from "../model";
import { bookmarkRepository } from "../storage";

export async function getBookmarkListSummaries(
  questionId: string,
  language: Language,
): Promise<BookmarkListSummary[]> {
  const [lists, items] = await Promise.all([
    bookmarkRepository.getLists(),
    bookmarkRepository.getAllItems(),
  ]);

  const questionIds = [...new Set(items.map((item) => item.questionId))];
  const questions = await getQuestionsByIds(questionIds, language);
  const availableQuestionIds = new Set(
    questions.map((question) => question.id),
  );

  const summaries = new Map<
    string,
    { questionCount: number; containsQuestion: boolean }
  >();

  for (const item of items) {
    const summary = summaries.get(item.listId) ?? {
      questionCount: 0,
      containsQuestion: false,
    };

    if (availableQuestionIds.has(item.questionId)) {
      summary.questionCount += 1;
    }

    if (item.questionId === questionId) {
      summary.containsQuestion = true;
    }

    summaries.set(item.listId, summary);
  }

  return lists.map((list) => {
    const summary = summaries.get(list.id);

    return {
      list,
      questionCount: summary?.questionCount ?? 0,
      containsQuestion: summary?.containsQuestion ?? false,
    };
  });
}

export async function getBookmarkListQuestionCounts(
  language: Language,
): Promise<Map<string, number>> {
  const items = await bookmarkRepository.getAllItems();

  const questionIds = [...new Set(items.map((item) => item.questionId))];

  const questions = await getQuestionsByIds(questionIds, language);
  const availableQuestionIds = new Set(
    questions.map((question) => question.id),
  );

  const counts = new Map<string, number>();

  for (const item of items) {
    if (!availableQuestionIds.has(item.questionId)) {
      continue;
    }

    counts.set(item.listId, (counts.get(item.listId) ?? 0) + 1);
  }

  return counts;
}

export async function resolveBookmarkListContext(
  listId: string,
  language: Language,
): Promise<{
  list: BookmarkList;
  items: BookmarkItem[];
  questions: BookmarkedQuestion[];
} | null> {
  const lists = await bookmarkRepository.getLists();
  const list = lists.find((item) => item.id === listId);
  if (!list) {
    return null;
  }

  const items = await bookmarkRepository.getItems(listId);
  const questionRecords = await getQuestionsByIds(
    items.map((item) => item.questionId),
    language,
  );
  const questionsById = new Map(
    questionRecords.map((question) => [question.id, question]),
  );
  const questions = items.flatMap((item) => {
    const question = questionsById.get(item.questionId);

    return question ? [{ ...question, savedAt: item.createdAt }] : [];
  });

  return { list, items, questions };
}
