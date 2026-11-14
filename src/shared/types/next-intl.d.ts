import type { Locale } from "@/shared/config/i18n";

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
  }
}
