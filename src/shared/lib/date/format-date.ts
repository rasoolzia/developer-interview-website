import type { Locale } from "@/shared/config/i18n";

const DATE_LOCALES: Record<Locale, string> = {
  en: "en-US-u-ca-gregory",
  fa: "fa-IR-u-ca-persian",
};

export function formatDate(timestamp: number, locale: Locale): string {
  return new Intl.DateTimeFormat(DATE_LOCALES[locale], {
    dateStyle: "medium",
  }).format(new Date(timestamp));
}
