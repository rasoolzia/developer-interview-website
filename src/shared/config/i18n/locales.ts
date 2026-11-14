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

export const LOCALE_CODES = Object.keys(LOCALES).filter(isLocale);

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return Object.hasOwn(LOCALES, value);
}

export function getDirection(locale: Locale): Direction {
  return LOCALES[locale]?.direction ?? "ltr";
}

export function isRTL(locale: Locale): boolean {
  return getDirection(locale) === "rtl";
}

export function getDrawerSide(locale: Locale): "right" | "left" {
  return isRTL(locale) ? "right" : "left";
}
