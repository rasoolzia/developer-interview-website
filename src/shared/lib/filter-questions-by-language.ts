import type { Language, QuestionBase } from "@/shared/types";

export function filterQuestionsByLanguage(
  questions: QuestionBase[],
  language: Language,
): QuestionBase[] {
  return questions.filter((question) => question.language === language);
}
