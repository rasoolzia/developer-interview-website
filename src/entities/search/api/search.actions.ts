"use server";

import type { Language } from "@/shared/types";

import type { SearchItem } from "../model";
import { getSearchQuestionsByIds } from "./search.service";

export async function getQuestionsByIdsAction(
  questionIds: string[],
  language: Language,
): Promise<SearchItem[]> {
  return getSearchQuestionsByIds(questionIds, language);
}
