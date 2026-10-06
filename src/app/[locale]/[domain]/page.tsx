import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TopicsView } from "@/views/topic";
import { getDomainBySlug } from "@/views/topic/api";

type Props = {
  params: Promise<{ locale: string; domain: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain } = await params;
  const data = await getDomainBySlug(domain);

  if (!data) {
    return { title: "Not Found" };
  }

  return {
    title: data.label,
    description: `${data.topics.length} topics in ${data.label}`,
  };
}

export default async function DomainPage({ params }: Props) {
  const { domain, locale } = await params;
  const data = await getDomainBySlug(domain);

  if (!data) {
    notFound();
  }

  return <TopicsView groups={[data]} locale={locale} isSingleDomain />;
}
