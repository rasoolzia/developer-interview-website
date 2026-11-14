import { DEFAULT_LANGUAGE, LanguageSchema } from "../api/schemas";
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
  return fallback.success ? fallback.data : DEFAULT_LANGUAGE;
}
