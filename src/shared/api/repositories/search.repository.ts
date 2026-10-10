import "server-only";

import { apiClient } from "../client";
import { API } from "../constants";
import { SearchIndexSchema } from "../schemas";

export async function fetchSearchIndex() {
  "use cache";

  return apiClient.get(API.SEARCH_INDEX, SearchIndexSchema);
}
