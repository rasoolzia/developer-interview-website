import { z } from "zod";

import { LOCALE_CODES } from "@/shared/config/i18n";

export const LanguageSchema = z.enum(LOCALE_CODES);

export const DifficultySchema = z.string();

export const QuestionBaseSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  domain: z.string(),
  topic: z.string(),
  difficulty: DifficultySchema,
  categories: z.array(z.string()),
  readingTime: z.number(),
});
