import { apiClient } from "../client";
import { SearchIndexSchema } from "../schemas";

export class SearchRepository {
  async getSearchIndex() {
    return apiClient.get("search-index.json", SearchIndexSchema);
  }
}

export const searchRepository = new SearchRepository();
