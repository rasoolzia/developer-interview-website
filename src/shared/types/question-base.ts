import type { Difficulty, Language } from "./index";

export interface QuestionBase {
  id: string;
  slug: string;
  title: string;
  domain: string;
  topic: string;
  language: Language;
  difficulty: Difficulty;
  categories: string[];
  readingTime: number;
}
