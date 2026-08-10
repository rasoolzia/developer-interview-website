import { z } from "zod";

export const LanguageSchema = z.enum(["fa", "en"]);

export const DifficultySchema = z.enum(["easy", "medium", "hard"]);

export type Language = z.infer<typeof LanguageSchema>;

export type Difficulty = z.infer<typeof DifficultySchema>;
