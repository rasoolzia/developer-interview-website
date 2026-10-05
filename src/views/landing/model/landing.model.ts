import { Locale } from "@/shared/config/i18n";

export interface LandingStats {
  questions: Record<Locale, number>;
  topics: number;
  domains: number;
  languages: number;
}
