import type { SearchItem } from "@/shared/types";

import { apiClient } from "../client";

export class SearchRepository {
  async getSearchIndex(): Promise<SearchItem[]> {
    return apiClient.get<SearchItem[]>("search-index.json");
  }
}

export const searchRepository = new SearchRepository();
