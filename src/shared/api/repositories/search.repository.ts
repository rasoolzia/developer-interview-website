import "server-only";

import type { ApiSearchIndex, Language } from "@/shared/types";

import { apiClient } from "../client";
import { API } from "../constants";
import { SearchIndexSchema } from "../schemas";

export async function fetchSearchIndex(
  language: Language,
): Promise<ApiSearchIndex> {
  "use cache";

  return apiClient.get<ApiSearchIndex>(
    API.SEARCH_INDEX(language),
    SearchIndexSchema,
  );
}
