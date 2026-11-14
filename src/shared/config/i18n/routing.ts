import { defineRouting } from "next-intl/routing";

import { defaultLocale, LOCALE_CODES } from "./locales";

export const routing = defineRouting({
  locales: LOCALE_CODES,
  defaultLocale,
  localePrefix: "always",
});
