import { SearchFilters } from "@/entities/search/model";
import { fetchSearchIndex } from "@/shared/api/repositories";

import { mapSearch } from "../lib";
import type { SearchViewModel } from "../model";

export async function getSearch(
  filters: SearchFilters,
): Promise<SearchViewModel> {
  const items = await fetchSearchIndex();

  return mapSearch(items, filters);
}
