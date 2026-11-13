import { getSearchQuestions } from "@/entities/search/api";
import type { SearchFilters } from "@/entities/search/model";
import { Language } from "@/shared/types";

import { mapSearch } from "../lib";
import type { SearchViewModel } from "../model";

export async function getSearch(
  filters: SearchFilters,
): Promise<SearchViewModel> {
  const items = await getSearchQuestions(filters.language as Language);

  return mapSearch(items, filters);
}
