import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

const NAMESPACES = [
  "common",
  "management",
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

export default getRequestConfig(async () => {
  const requested = await rootParams.locale();

  if (!hasLocale(routing.locales, requested)) {
    notFound();
  }

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
});
