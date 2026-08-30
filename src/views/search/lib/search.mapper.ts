import type { SearchItem } from "@/entities/search/model";

import type { SearchFilters, SearchViewModel } from "../model";

export function mapSearch(
  items: SearchItem[],
  filters: SearchFilters,
): SearchViewModel {
  const query = normalize(filters.query);

  if (!query) {
    return {
      filters,

      results: [],

      total: 0,
    };
  }

  const results = items.filter((item) => matches(item, query));

  return {
    filters,

    results,

    total: results.length,
  };
}

function matches(item: SearchItem, query: string): boolean {
  return (
    normalize(item.title).includes(query) ||
    normalize(item.label).includes(query) ||
    normalize(item.topic).includes(query) ||
    normalize(item.domain).includes(query) ||
    normalize(item.difficulty).includes(query) ||
    item.categories.some((category) => normalize(category).includes(query))
  );
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}
