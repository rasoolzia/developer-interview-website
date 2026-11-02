"use server";

import { fetchSearchIndex } from "@/shared/api/repositories";
import type { QuestionBase } from "@/shared/types";

function createQuestionKey(id: string, language: string) {
  return `${id}-${language}`;
}

export async function getQuestionsByIds(
  questionIds: string[],
): Promise<QuestionBase[]> {
  const questions = await fetchSearchIndex();

  const questionsById = new Map(
    questions.map((question) => [
      createQuestionKey(question.id, question.language),
      question,
    ]),
  );

  return questionIds.flatMap((id) => {
    const question = questionsById.get(id);
    return question ? [question] : [];
  });
}
