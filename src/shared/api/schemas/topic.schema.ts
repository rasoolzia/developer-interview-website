import { z } from "zod";

import { LanguageSchema } from "./common.schema";
import { QuestionSchema } from "./question.schema";

export const TopicSchema = z.object({
  version: z.number(),
  meta: z.object({
    domain: z.string(),
    topic: z.string(),
    language: LanguageSchema,
    label: z.string(),
  }),
  content: z.object({
    title: z.string(),
    categories: z.array(z.string()),
    difficulties: z.array(z.string()),
  }),
  hash: z.string(),
  stats: z.object({
    total: z.number(),
    byDifficulty: z.record(z.string(), z.number()),
  }),
  questions: z.array(QuestionSchema),
});
