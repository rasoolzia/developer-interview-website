import { fetchSearchIndex } from "@/shared/api/repositories";
import { mapQuestions } from "@/shared/mappers";
import type { Language, QuestionBase } from "@/shared/types";

export async function getSearchQuestions(
  language: Language,
): Promise<QuestionBase[]> {
  const questions = await fetchSearchIndex(language);
  return mapQuestions(questions, language);
}

export async function getQuestionsByIds(
  questionIds: string[],
  language: Language,
): Promise<QuestionBase[]> {
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

export async function getQuestionBaseById(
  language: Language,
  questionId: string,
): Promise<QuestionBase | undefined> {
  const [question] = await getQuestionsByIds([questionId], language);
  return question;
}
