import type { Language } from "@/shared/types";

export interface LandingStats {
  questions: Partial<Record<Language, number>>;
  topics: number;
  domains: number;
  languages: number;
}
