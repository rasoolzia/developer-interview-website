import { getQuestionsByIds } from "@/entities/search/api/search.actions";
import type { Language, QuestionBase } from "@/shared/types";

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
