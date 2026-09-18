import { Difficulty } from "@/shared/types";

export type CanonicalDifficulty = "easy" | "medium" | "hard";

const ALIASES: Record<Difficulty, CanonicalDifficulty> = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
  آسان: "easy",
  متوسط: "medium",
  سخت: "hard",
};

export function toCanonicalDifficulty(raw: Difficulty): CanonicalDifficulty {
  const normalized = raw.trim().toLowerCase();

  const canonical = ALIASES[normalized];

  if (!canonical) {
    throw new Error(`Unknown difficulty: ${raw}`);
  }

  return canonical;
}
