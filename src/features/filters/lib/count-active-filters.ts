import type { SearchFilters } from "@/entities/search/model";

const FACET_KEYS = ["domain", "topic", "difficulty", "category"] as const;

export function countActiveFilters(filters: SearchFilters): number {
  return FACET_KEYS.filter((key) => Boolean(filters[key])).length;
}
