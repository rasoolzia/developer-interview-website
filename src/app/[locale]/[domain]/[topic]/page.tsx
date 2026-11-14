import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import { getTopicDetails } from "@/entities/topic/api";
import { SEARCH_PARAMS } from "@/shared/config";
import { parseLanguage, toSingleParam } from "@/shared/lib";
import { TopicDetailsView } from "@/views/topic-details";
import { filterQuestions } from "@/views/topic-details/lib";

type Props = {
  params: Promise<{ locale: string; domain: string; topic: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ domain, topic }, locale] = await Promise.all([params, getLocale()]);

  const data = await getTopicDetails(domain, topic, parseLanguage(locale));

  if (!data) {
    return { title: "Not Found" };
  }

  return {
    title: data.content.title,
    description: `${data.questions.length} questions in ${data.content.title}`,
  };
}

export default async function TopicPage({ params, searchParams }: Props) {
  const [{ domain, topic }, rawParams, locale] = await Promise.all([
    params,
    searchParams,
    getLocale(),
  ]);

  const data = await getTopicDetails(domain, topic, parseLanguage(locale));

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
