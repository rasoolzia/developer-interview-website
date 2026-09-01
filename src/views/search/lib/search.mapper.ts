import type { SearchItem } from "@/entities/search/model";

import type { SearchFilters, SearchViewModel } from "../model";

export function mapSearch(
  items: SearchItem[],
  filters: SearchFilters,
): SearchViewModel {
  const query = normalize(filters.query ?? "");

  const results = items.filter((item) => {
    // Language filter
    if (
      filters.language &&
      normalize(item.language) !== normalize(filters.language)
    ) {
      return false;
    }

    // Domain filter
    if (
      filters.domain &&
      normalize(item.domain) !== normalize(filters.domain)
    ) {
      return false;
    }

    // Topic filter
    if (filters.topic && normalize(item.topic) !== normalize(filters.topic)) {
      return false;
    }

    // Difficulty filter
    if (
      filters.difficulty &&
      normalize(item.difficulty) !== normalize(filters.difficulty)
    ) {
      return false;
    }

    // Category filter
    if (
      filters.category &&
      !item.categories.some(
        (c) => normalize(c) === normalize(filters.category!),
      )
    ) {
      return false;
    }

    // Search query filter
    if (query && !matches(item, query)) {
      return false;
    }

    return true;
  });

  return {
    filters,

    results,

    total: results.length,
  };
}

function matches(item: SearchItem, query: string): boolean {
  return (
    normalize(item.title).includes(query) ||
    item.categories.some((category) => normalize(category).includes(query))
  );
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}
