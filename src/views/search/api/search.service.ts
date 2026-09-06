import { getSearchItems } from "@/entities/search/api";
import { SearchFilters } from "@/entities/search/model";

import { mapSearch } from "../lib";
import type { SearchViewModel } from "../model";

export async function getSearch(
  filters: SearchFilters,
): Promise<SearchViewModel> {
  const items = await getSearchItems();

  return mapSearch(items, filters);
}
