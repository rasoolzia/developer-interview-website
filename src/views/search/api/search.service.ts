import { getSearchItems } from "@/entities/search/api";

import { mapSearch } from "../lib";
import type { SearchFilters, SearchViewModel } from "../model";

export async function getSearch(
  filters: SearchFilters,
): Promise<SearchViewModel> {
  const items = await getSearchItems();

  return mapSearch(items, filters);
}
