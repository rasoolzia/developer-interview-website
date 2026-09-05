import type { SearchItem } from "@/entities/search/model";
import { SEARCH_PAGE_SIZE } from "@/shared/config";

import type { SearchFilters, SearchViewModel } from "../model";

export function mapSearch(
  items: SearchItem[],
  filters: SearchFilters,
): SearchViewModel {
  const query = normalize(filters.query ?? "");

  const filtered = items.filter((item) => {
    if (
      filters.language &&
      normalize(item.language) !== normalize(filters.language)
    ) {
      return false;
    }

    if (
      filters.domain &&
      normalize(item.domain) !== normalize(filters.domain)
    ) {
      return false;
    }

    if (filters.topic && normalize(item.topic) !== normalize(filters.topic)) {
      return false;
    }

    if (
      filters.difficulty &&
      normalize(item.difficulty) !== normalize(filters.difficulty)
    ) {
      return false;
    }

    if (
      filters.category &&
      !item.categories.some(
        (c) => normalize(c) === normalize(filters.category!),
      )
    ) {
      return false;
    }

    if (query && !matches(item, query)) {
      return false;
    }

    return true;
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / SEARCH_PAGE_SIZE));
  const page = clamp(filters.page ?? 1, 1, totalPages);

  const start = (page - 1) * SEARCH_PAGE_SIZE;
  const results = filtered.slice(start, start + SEARCH_PAGE_SIZE);

  return { filters, results, total, page, totalPages };
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

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
