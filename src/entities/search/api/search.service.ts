import { fetchSearchIndex } from "@/shared/api/repositories";
import { mapQuestions } from "@/shared/mappers";
import type { Language } from "@/shared/types";

import type { SearchItem } from "../model";

export async function getSearchQuestions(
  language: Language,
): Promise<SearchItem[]> {
  const searchItems = await fetchSearchIndex(language);
  return mapQuestions(searchItems, language);
}

export async function getSearchQuestionsByIds(
  questionIds: string[],
  language: Language,
): Promise<SearchItem[]> {
  if (questionIds.length === 0) return [];

  const requestedIds = new Set(questionIds);
  const questions = await getSearchQuestions(language);

  const matchingQuestions = questions.filter((q) => requestedIds.has(q.id));

  const questionsById = new Map(
    matchingQuestions.map((question) => [question.id, question]),
  );

  return questionIds.flatMap((id) => {
    const question = questionsById.get(id);
    return question ? [question] : [];
  });
}

export async function getSearchItemById(
  language: Language,
  questionId: string,
): Promise<SearchItem | undefined> {
  const [question] = await getSearchQuestionsByIds([questionId], language);
  return question;
}
