import type { ApiSearchItem } from "@/shared/types";

import { apiClient } from "../client";

export class SearchRepository {
  async getSearchIndex(): Promise<ApiSearchItem[]> {
    return apiClient.get<ApiSearchItem[]>("search-index.json");
  }
}

export const searchRepository = new SearchRepository();
