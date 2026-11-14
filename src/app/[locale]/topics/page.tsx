import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { TopicsView } from "@/views/topic";
import { getAllDomains } from "@/views/topic/api";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common.site");

  return {
    title: t("pages.topics"),
    description: t("description"),
  };
}

export default async function TopicsPage() {
  const [locale, topicsByDomain] = await Promise.all([
    getLocale(),
    getAllDomains(),
  ]);

  if (!topicsByDomain.length) {
    notFound();
  }

  return <TopicsView groups={topicsByDomain} locale={locale} />;
}
