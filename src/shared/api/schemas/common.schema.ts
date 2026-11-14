import { z } from "zod";

export const SUPPORTED_LANGUAGES = ["en", "fa"] as const;

export const DEFAULT_LANGUAGE = "en" as const;

export const LanguageSchema = z.enum(SUPPORTED_LANGUAGES);

export const DifficultySchema = z.string();

export const QuestionBaseSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  domain: z.string(),
  topic: z.string(),
  language: LanguageSchema,
  difficulty: DifficultySchema,
  categories: z.array(z.string()),
  readingTime: z.number(),
});
