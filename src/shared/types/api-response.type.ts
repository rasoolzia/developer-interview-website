import type { z } from "zod";

import {
  DifficultySchema,
  LanguageSchema,
  ManifestSchema,
  QuestionBaseSchema,
  QuestionSchema,
  SearchItemSchema,
  TopicSchema,
} from "@/shared/api/schemas";

// Type definitions for API responses
export type Language = z.infer<typeof LanguageSchema>;

export type Difficulty = z.infer<typeof DifficultySchema>;

export type ApiManifest = z.infer<typeof ManifestSchema>;

export type ApiTopic = z.infer<typeof TopicSchema>;

export type QuestionBase = z.infer<typeof QuestionBaseSchema>;

export type ApiQuestion = z.infer<typeof QuestionSchema>;

export type ApiSearchItem = z.infer<typeof SearchItemSchema>;
