import type { SearchItem } from "@/entities/search/model";

export interface SearchFilters {
  query: string;

  domain?: string;

  topic?: string;

  difficulty?: string;

  category?: string;

  language?: string;
}

export interface SearchViewModel {
  filters: SearchFilters;

  results: SearchItem[];
}
