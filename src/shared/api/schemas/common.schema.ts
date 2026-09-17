import { z } from "zod";

import { LANGUAGE_CODES } from "@/shared/config/i18n";

export const LanguageSchema = z.enum(LANGUAGE_CODES);

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
