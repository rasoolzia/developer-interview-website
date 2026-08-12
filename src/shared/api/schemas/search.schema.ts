import { z } from "zod";

import { DifficultySchema, LanguageSchema } from "./common.schema";

export const SearchItemSchema = z.object({
  id: z.string(),

  slug: z.string(),

  title: z.string(),

  domain: z.string(),

  topic: z.string(),

  label: z.string(),

  language: LanguageSchema,

  path: z.string(),

  difficulty: DifficultySchema,

  categories: z.array(z.string()),

  readingTime: z.number(),

  tags: z.array(z.string()).optional(),
});

export const SearchIndexSchema = z.array(SearchItemSchema);
