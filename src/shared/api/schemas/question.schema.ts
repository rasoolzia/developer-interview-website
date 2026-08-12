import { z } from "zod";

import { DifficultySchema, LanguageSchema } from "./common.schema";

export const QuestionSchema = z.object({
  id: z.string(),

  slug: z.string(),

  title: z.string(),

  difficulty: DifficultySchema,

  categories: z.array(z.string()),

  domain: z.string(),

  topic: z.string(),

  language: LanguageSchema,

  tags: z.array(z.string()).optional(),

  answer: z.object({
    markdown: z.string(),

    readingTime: z.number(),
  }),
});
