import "server-only";

import type { Language } from "@/shared/types";

import { apiClient } from "../client";
import { API } from "../constants";
import { SearchIndexSchema } from "../schemas";

export async function fetchSearchIndex(language: Language) {
  "use cache";

  return apiClient.get(API.SEARCH_INDEX(language), SearchIndexSchema);
}
