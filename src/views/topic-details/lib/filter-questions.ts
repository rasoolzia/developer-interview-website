import { toCanonicalDifficulty } from "@/entities/question/lib";
import type { Question } from "@/entities/question/model";

interface QuestionFilters {
  difficulty?: string;
  category?: string;
}

export function filterQuestions(
  questions: Question[],
  filters: QuestionFilters,
): Question[] {
  return questions.filter((question) => {
    if (
      filters.difficulty &&
      toCanonicalDifficulty(question.difficulty) !== filters.difficulty
    ) {
      return false;
    }

    if (filters.category && !question.categories.includes(filters.category)) {
      return false;
    }

    return true;
  });
}
