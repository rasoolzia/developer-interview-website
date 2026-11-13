import { mapQuestions } from "@/shared/mappers";
import type { Language, QuestionBase } from "@/shared/types";

export function mapSearchQuestions(
  questions: QuestionBase[],
  language: Language,
): QuestionBase[] {
  return mapQuestions(
    questions.filter((question) => question.language === language),
  );
}
