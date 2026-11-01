import type { SearchFacets, SearchFilters } from "@/entities/search/model";
import type { QuestionBase } from "@/shared/types";

export interface SearchViewModel {
  filters: SearchFilters;
  results: QuestionBase[];
  total: number;
  page: number;
  totalPages: number;
  facets: SearchFacets;
}
