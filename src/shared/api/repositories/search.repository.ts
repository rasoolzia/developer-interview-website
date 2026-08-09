import { apiClient } from "../client";
import type { SearchItem } from "../schemas";

export class SearchRepository {
  async getSearchIndex(): Promise<SearchItem[]> {
    return apiClient.get<SearchItem[]>("search-index.json");
  }
}

export const searchRepository = new SearchRepository();
