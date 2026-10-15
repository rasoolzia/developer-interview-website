import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getQuestionBySlug } from "@/entities/question/api";
import { decodeUrlParam } from "@/shared/lib";
import type { Language } from "@/shared/types";
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
  const { locale, domain, topic, questionSlug } = await params;

  const decodedQuestionSlug = decodeUrlParam(questionSlug);

  const question = await getQuestionBySlug(
    domain,
    topic,
    locale as Language,
    decodedQuestionSlug,
  );

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
  const { locale, domain, topic, questionSlug } = await params;

  const decodedQuestionSlug = decodeUrlParam(questionSlug);

  const question = await getQuestionBySlug(
    domain,
    topic,
    locale as Language,
    decodedQuestionSlug,
  );

  if (!question) {
    notFound();
  }

  return <QuestionDetailsView question={question} />;
}
