import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTopicDetails } from "@/entities/topic/api";
import type { Language } from "@/shared/types";
import { TopicDetailsView } from "@/views/topic-details";

type Props = {
  params: Promise<{ locale: string; domain: string; topic: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, domain, topic } = await params;
  const data = await getTopicDetails(domain, topic, locale as Language);

  if (!data) {
    return { title: "Not Found" };
  }

  return {
    title: data.topic.label,
    description: `${data.questions.length} questions in ${data.topic.label}`,
  };
}

export default async function TopicPage({ params }: Props) {
  const { locale, domain, topic } = await params;
  const data = await getTopicDetails(domain, topic, locale as Language);

  if (!data) {
    notFound();
  }

  return <TopicDetailsView data={data} />;
}
