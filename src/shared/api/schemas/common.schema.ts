import { z } from "zod";

import { LANGUAGE_CODES } from "@/shared/config/i18n";

export const LanguageSchema = z.enum(LANGUAGE_CODES);

export const DifficultySchema = z.enum(["easy", "medium", "hard"]);
