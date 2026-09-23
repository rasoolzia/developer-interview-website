import "server-only";

import { apiClient } from "../client";
import { SearchIndexSchema } from "../schemas";

export async function fetchSearchIndex() {
  "use cache";

  return apiClient.get("search-index.json", SearchIndexSchema);
}
