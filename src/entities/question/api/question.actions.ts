"use server";

import type { SearchItem } from "@/entities/search/model";
import type { Language } from "@/shared/types";

import type { Question } from "../model";
import { getQuestionById } from "./question.service";

export async function fetchQuestionById(
  language: Language,
  questionId: string,
  base?: SearchItem,
): Promise<Question | undefined> {
  return getQuestionById(language, questionId, base);
}
