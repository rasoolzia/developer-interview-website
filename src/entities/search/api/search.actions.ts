"use server";

import type { Language, QuestionBase } from "@/shared/types";

import { getSearchQuestions } from "./search.service";

export async function getQuestionsByIds(
  questionIds: string[],
  language: Language,
): Promise<QuestionBase[]> {
  const questions = await getSearchQuestions(language);

  const questionsById = new Map(
    questions.map((question) => [question.id, question]),
  );

  return questionIds.flatMap((id) => {
    const question = questionsById.get(id);
    return question ? [question] : [];
  });
}
