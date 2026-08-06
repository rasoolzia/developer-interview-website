import { z } from "zod";

export const DifficultySchema = z.enum(["easy", "medium", "hard"]);

export const QuestionSchema = z.object({
  id: z.string(),

  slug: z.string(),

  title: z.string(),

  difficulty: DifficultySchema,

  categories: z.array(z.string()),

  domain: z.string(),

  topic: z.string(),

  language: z.string(),

  tags: z.array(z.string()).optional(),

  answer: z.object({
    markdown: z.string(),

    readingTime: z.number(),
  }),
});

export type Question = z.infer<typeof QuestionSchema>;
