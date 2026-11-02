import { getQuestionsByIds } from "@/entities/search/api/search.actions";
import type { QuestionBase } from "@/shared/types";

import { bookmarkRepository } from "../storage";

export async function getBookmarkedQuestions(
  listId: string,
): Promise<QuestionBase[]> {
  const items = await bookmarkRepository.getItems(listId);
  return getQuestionsByIds(items.map((item) => item.questionId));
}
