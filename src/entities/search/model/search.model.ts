import type { QuestionBase } from "@/shared/types";

export type SearchItem = QuestionBase;

export interface SearchFilters {
  query?: string;
  domain?: string;
  topic?: string;
  difficulty?: string;
  category?: string;
  language?: string;
  page?: number;
}

export type SearchParams = Record<string, string | string[] | undefined>;

export interface FacetOption {
  value: string;
  label: string;
}

export interface SearchFacets {
  domains: FacetOption[];
  topics: FacetOption[];
  difficulties: FacetOption[];
  categories: FacetOption[];
}
