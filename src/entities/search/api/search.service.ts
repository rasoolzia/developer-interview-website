import { fetchSearchIndex } from "@/shared/api/repositories";
import type { Language, QuestionBase } from "@/shared/types";

import { mapSearchQuestions } from "../lib";

export async function getSearchQuestions(
  language: Language,
): Promise<QuestionBase[]> {
  const questions = await fetchSearchIndex();

  return mapSearchQuestions(questions, language);
}

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

export async function getQuestionBaseById(
  language: Language,
  questionId: string,
): Promise<QuestionBase | undefined> {
  const [question] = await getQuestionsByIds([questionId], language);
  return question;
}
