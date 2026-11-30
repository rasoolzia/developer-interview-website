"use server";

import type { Language, QuestionBase } from "@/shared/types";

import type { Question } from "../model";
import { getQuestionById } from "./question.service";

export async function fetchQuestionById(
  language: Language,
  questionId: string,
  base?: QuestionBase,
): Promise<Question | undefined> {
  return getQuestionById(language, questionId, base);
}
