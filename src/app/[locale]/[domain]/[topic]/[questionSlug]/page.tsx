import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import { getQuestionDetails } from "@/entities/question/api";
import { decodeUrlParam, parseLanguage } from "@/shared/lib";
import { QuestionDetailsView } from "@/views/question";

type Props = {
  params: Promise<{
    locale: string;
    domain: string;
    topic: string;
    questionSlug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ domain, topic, questionSlug }, locale] = await Promise.all([
    params,
    getLocale(),
  ]);

  const decodedQuestionSlug = decodeUrlParam(questionSlug);

  const questionDetails = await getQuestionDetails(
    domain,
    topic,
    parseLanguage(locale),
    decodedQuestionSlug,
  );

  const question = questionDetails?.question;

  if (!question) {
    return {
      title: "Not Found",
    };
  }

  const description = question.markdown
    .replace(/[`*_#>-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

  return {
    title: question.title,
    description,
  };
}

export default async function QuestionPage({ params }: Props) {
  const [{ domain, topic, questionSlug }, locale] = await Promise.all([
    params,
    getLocale(),
  ]);

  const decodedQuestionSlug = decodeUrlParam(questionSlug);

  const questionDetails = await getQuestionDetails(
    domain,
    topic,
    parseLanguage(locale),
    decodedQuestionSlug,
  );

  if (!questionDetails) {
    notFound();
  }

  return <QuestionDetailsView {...questionDetails} />;
}
