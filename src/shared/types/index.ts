import type { z } from "zod";

import {
  DifficultySchema,
  LanguageSchema,
  ManifestSchema,
  QuestionSchema,
  SearchItemSchema,
  TopicSchema,
} from "@/shared/api/schemas";

import { routing } from "../config/i18n";

// Type definitions for API responses
export type Language = z.infer<typeof LanguageSchema>;

export type Difficulty = z.infer<typeof DifficultySchema>;

export type ApiManifest = z.infer<typeof ManifestSchema>;

export type ApiTopic = z.infer<typeof TopicSchema>;

export type ApiQuestion = z.infer<typeof QuestionSchema>;

export type ApiSearchItem = z.infer<typeof SearchItemSchema>;

// Type definitions for i18n routing
export type Locale = (typeof routing.locales)[number];
