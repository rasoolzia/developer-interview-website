export type Direction = "ltr" | "rtl";
export type Locale = keyof typeof LOCALES;

export const LOCALES = {
  en: {
    code: "en",
    label: "English",
    nativeLabel: "English",
    direction: "ltr",
  },
  fa: {
    code: "fa",
    label: "Persian",
    nativeLabel: "فارسی",
    direction: "rtl",
  },
} as const;

export const LANGUAGE_CODES = Object.keys(LOCALES) as Locale[];

export const defaultLocale: Locale = "en";

export function getDirection(locale: string): Direction {
  return LOCALES[locale as Locale]?.direction ?? "ltr";
}

export function isRTL(locale: string): boolean {
  return getDirection(locale) === "rtl";
}

export function getDrawerSide(locale: string): "right" | "left" {
  return isRTL(locale) ? "right" : "left";
}
