import { fetchSearchIndex } from "@/shared/api/repositories";
import type { Language, QuestionBase } from "@/shared/types";

import { mapSearchQuestions } from "../lib";

export async function getSearchQuestions(
  language: Language,
): Promise<QuestionBase[]> {
  const questions = await fetchSearchIndex();

  return mapSearchQuestions(questions, language);
}
