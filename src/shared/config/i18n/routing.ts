import { defineRouting } from "next-intl/routing";

import { defaultLocale, LANGUAGE_CODES } from "./locales";

export const routing = defineRouting({
  locales: LANGUAGE_CODES,
  defaultLocale,
  localePrefix: "always",
});
