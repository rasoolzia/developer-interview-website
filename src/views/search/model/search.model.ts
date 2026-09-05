import type { SearchItem } from "@/entities/search/model";

export interface SearchFilters {
  query?: string;

  domain?: string;

  topic?: string;

  difficulty?: string;

  category?: string;

  language?: string;

  page?: number;
}

export interface SearchViewModel {
  filters: SearchFilters;

  results: SearchItem[];

  total: number;

  page: number;

  totalPages: number;
}
