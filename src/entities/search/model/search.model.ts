import type { Difficulty, Language } from "@/shared/types";

export interface SearchItem {
  id: string;
  slug: string;
  title: string;
  domain: string;
  topic: string;
  label: string;
  language: Language;
  difficulty: Difficulty;
  categories: string[];
  path: string;
  readingTime: number;
}

export interface SearchFilters {
  query?: string;
  domain?: string;
  topic?: string;
  difficulty?: string;
  category?: string;
  language?: string;
  page?: number;
}

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
