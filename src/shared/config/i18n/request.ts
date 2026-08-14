import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

const NAMESPACES = [
  "common",
  "landing",
  "question",
  "search",
  "topic",
] as const;

async function loadMessages(locale: string) {
  const modules = await Promise.all(
    NAMESPACES.map((ns) => import(`../../../../messages/${locale}/${ns}.json`)),
  );

  return NAMESPACES.reduce<Record<string, unknown>>((acc, ns, i) => {
    acc[ns] = modules[i].default;
    return acc;
  }, {});
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
