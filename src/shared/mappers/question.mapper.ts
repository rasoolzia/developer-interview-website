import type { QuestionBase } from "@/shared/types";

export function mapQuestions<T extends QuestionBase>(questions: T[]): T[] {
  return questions.map((question) => ({
    ...question,
    id: `${question.id}-${question.language}`,
  }));
}
