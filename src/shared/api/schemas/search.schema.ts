import { z } from "zod";

export const SearchItemSchema = z.object({
  id: z.string(),

  slug: z.string(),

  title: z.string(),

  domain: z.string(),

  topic: z.string(),

  label: z.string(),

  language: z.enum(["en", "fa"]),

  path: z.string(),

  difficulty: z.enum(["easy", "medium", "hard"]),

  categories: z.array(z.string()),

  readingTime: z.number(),

  tags: z.array(z.string()).optional(),
});

export const SearchIndexSchema = z.array(SearchItemSchema);

export type SearchItem = z.infer<typeof SearchItemSchema>;
