import { LanguageSchema } from "../api/schemas";
import { defaultLocale } from "../config/i18n";
import type { Language } from "../types";

export function parseLanguage(
  value: string | undefined,
  fallbackValue?: string,
): Language {
  const result = LanguageSchema.safeParse(value);
  if (result.success) {
    return result.data;
  }

  const fallback = LanguageSchema.safeParse(fallbackValue);
  return fallback.success ? fallback.data : defaultLocale;
}
