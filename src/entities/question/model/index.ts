import type { Difficulty, Language } from "@/shared/api/schemas";

export interface Question {
  id: string;

  slug: string;

  title: string;

  difficulty: Difficulty;

  categories: string[];

  domain: string;

  topic: string;

  language: Language;

  markdown: string;

  readingTime: number;

  tags?: string[];
}
