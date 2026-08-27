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
