import type { SearchItem } from "@/entities/search/model";

import type { SearchFilters, SearchViewModel } from "../model";

export function mapSearch(
  items: SearchItem[],
  filters: SearchFilters,
): SearchViewModel {
  return {
    filters,

    results: items,
  };
}
