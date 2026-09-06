import type {
  SearchFacets,
  SearchFilters,
  SearchItem,
} from "@/entities/search/model";

export interface SearchViewModel {
  filters: SearchFilters;
  results: SearchItem[];
  total: number;
  page: number;
  totalPages: number;
  facets: SearchFacets;
}
