import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { TopicsView } from "@/views/topic";
import { getAllDomains } from "@/views/topic/api";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common.site");

  return {
    title: t("pages.topics"),
    description: t("description"),
  };
}

export default async function TopicsPage({ params }: Props) {
  const { locale } = await params;
  const topicsByDomain = await getAllDomains();

  if (!topicsByDomain.length) {
    notFound();
  }

  return <TopicsView groups={topicsByDomain} locale={locale} />;
}
