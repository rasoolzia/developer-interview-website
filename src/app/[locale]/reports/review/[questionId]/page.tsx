import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { getQuestionBaseById } from "@/entities/search/api/search.service";
import { parseLanguage } from "@/shared/lib";
import { ReportReviewView } from "@/views/report";

type Props = {
  params: Promise<{
    questionId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ questionId }, locale] = await Promise.all([params, getLocale()]);
  const question = await getQuestionBaseById(parseLanguage(locale), questionId);

  if (!question) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: question.title,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ReportReviewPage({ params }: Props) {
  const [{ questionId }, locale] = await Promise.all([params, getLocale()]);

  return (
    <ReportReviewView locale={parseLanguage(locale)} questionId={questionId} />
  );
}
