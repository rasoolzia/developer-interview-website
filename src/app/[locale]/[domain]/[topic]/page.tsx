import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTopicDetails } from "@/entities/topic/api";
import { SEARCH_PARAMS } from "@/shared/config";
import { toSingleParam } from "@/shared/lib";
import type { Language } from "@/shared/types";
import { TopicDetailsView } from "@/views/topic-details";
import { filterQuestions } from "@/views/topic-details/lib";

type Props = {
  params: Promise<{ locale: string; domain: string; topic: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, domain, topic } = await params;
  const data = await getTopicDetails(domain, topic, locale as Language);

  if (!data) {
    return { title: "Not Found" };
  }

  return {
    title: data.content.title,
    description: `${data.stats.total} questions in ${data.content.title}`,
  };
}

export default async function TopicPage({ params, searchParams }: Props) {
  const [{ locale, domain, topic }, rawParams] = await Promise.all([
    params,
    searchParams,
  ]);

  const data = await getTopicDetails(domain, topic, locale as Language);

  if (!data) {
    notFound();
  }

  const filters = {
    difficulty: toSingleParam(rawParams?.[SEARCH_PARAMS.difficulty]),
    category: toSingleParam(rawParams?.[SEARCH_PARAMS.category]),
  };

  const questions = filterQuestions(data.questions, filters);

  return (
    <TopicDetailsView data={data} questions={questions} filters={filters} />
  );
}
