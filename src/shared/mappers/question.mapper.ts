import type { Language, QuestionBase } from "@/shared/types";

export function mapQuestions<T extends QuestionBase>(
  questions: T[],
  language: Language,
): T[] {
  return questions.map((question) => ({
    ...question,
    id: `${question.id}-${language}`,
  }));
}
