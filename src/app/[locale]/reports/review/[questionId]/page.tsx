import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { getSearchItemById } from "@/entities/search/api";
import { parseLanguage } from "@/shared/lib";
import { ReportReviewView } from "@/views/report";

type Props = {
  params: Promise<{
    questionId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ questionId }, locale] = await Promise.all([params, getLocale()]);
  const question = await getSearchItemById(parseLanguage(locale), questionId);

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
