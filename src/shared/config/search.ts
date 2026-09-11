import type { SearchFilters } from "@/entities/search/model";

export const SEARCH_PARAMS: Record<keyof SearchFilters, string> = {
  query: "query",
  domain: "domain",
  topic: "topic",
  difficulty: "difficulty",
  category: "category",
  language: "language",
  page: "page",
} as const;

export const SEARCH_PAGE_SIZE = 10;
