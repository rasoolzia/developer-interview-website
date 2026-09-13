import { toCanonicalDifficulty } from "@/entities/question/lib";
import type {
  FacetOption,
  SearchFilters,
  SearchItem,
} from "@/entities/search/model";
import { SEARCH_PAGE_SIZE } from "@/shared/config";
import { formatLabel, normalize } from "@/shared/lib";

import type { SearchViewModel } from "../model";

export function mapSearch(
  items: SearchItem[],
  filters: SearchFilters,
): SearchViewModel {
  const query = normalize(filters.query ?? "");

  const byLanguage = items.filter(
    (item) =>
      !filters.language ||
      normalize(item.language) === normalize(filters.language),
  );

  const byQuery = byLanguage.filter(
    (item) => !query || matchesQuery(item, query),
  );

  const domains = toOptions(
    byQuery,
    (item) => item.domain,
    (item) => formatLabel(item.domain),
  );

  const byDomain = filters.domain
    ? byQuery.filter(
        (item) => normalize(item.domain) === normalize(filters.domain!),
      )
    : byQuery;

  const topics = toOptions(
    byDomain,
    (item) => item.topic,
    (item) => formatLabel(item.topic),
  );

  const byTopic = filters.topic
    ? byDomain.filter(
        (item) => normalize(item.topic) === normalize(filters.topic!),
      )
    : byDomain;

  const difficulties = toOptions(
    byTopic,
    (item) => toCanonicalDifficulty(item.difficulty),
    (item) => formatLabel(item.difficulty),
  );

  const byDifficulty = filters.difficulty
    ? byTopic.filter(
        (item) =>
          toCanonicalDifficulty(item.difficulty) ===
          normalize(filters.difficulty!),
      )
    : byTopic;

  const categories = toCategoryOptions(byDifficulty);

  const filtered = filters.category
    ? byDifficulty.filter((item) =>
        item.categories.some(
          (category) => normalize(category) === normalize(filters.category!),
        ),
      )
    : byDifficulty;

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / SEARCH_PAGE_SIZE));
  const page = clamp(filters.page ?? 1, 1, totalPages);

  const start = (page - 1) * SEARCH_PAGE_SIZE;
  const results = filtered.slice(start, start + SEARCH_PAGE_SIZE);

  return {
    filters,
    results,
    total,
    page,
    totalPages,
    facets: { domains, topics, difficulties, categories },
  };
}

function matchesQuery(item: SearchItem, query: string): boolean {
  return (
    normalize(item.title).includes(query) ||
    item.categories.some((category) => normalize(category).includes(query))
  );
}

function toOptions(
  items: SearchItem[],
  getValue: (item: SearchItem) => string,
  getLabel: (item: SearchItem) => string,
): FacetOption[] {
  const seen = new Map<string, FacetOption>();

  for (const item of items) {
    const value = getValue(item);
    const key = normalize(value);
    if (!seen.has(key)) seen.set(key, { value, label: getLabel(item) });
  }

  return [...seen.values()].sort((a, b) => a.label.localeCompare(b.label));
}

function toCategoryOptions(items: SearchItem[]): FacetOption[] {
  const seen = new Map<string, FacetOption>();

  for (const item of items) {
    for (const category of item.categories) {
      const key = normalize(category);
      if (!seen.has(key)) seen.set(key, { value: category, label: category });
    }
  }

  return [...seen.values()].sort((a, b) => a.label.localeCompare(b.label));
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
