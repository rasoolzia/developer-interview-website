"use server";

import type { Language, QuestionBase } from "@/shared/types";

import { getQuestionsByIds as getQuestionsByIdsFromService } from "./search.service";

export async function getQuestionsByIds(
  questionIds: string[],
  language: Language,
): Promise<QuestionBase[]> {
  return getQuestionsByIdsFromService(questionIds, language);
}
