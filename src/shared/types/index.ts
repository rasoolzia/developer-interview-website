import type { z } from "zod";

import {
  DifficultySchema,
  LanguageSchema,
  ManifestSchema,
  QuestionSchema,
  SearchItemSchema,
  TopicSchema,
} from "@/shared/api/schemas";

export type Language = z.infer<typeof LanguageSchema>;

export type Difficulty = z.infer<typeof DifficultySchema>;

export type Manifest = z.infer<typeof ManifestSchema>;

export type Topic = z.infer<typeof TopicSchema>;

export type Question = z.infer<typeof QuestionSchema>;

export type SearchItem = z.infer<typeof SearchItemSchema>;
