import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { getSearchItemById } from "@/entities/search/api";
import { parseLanguage } from "@/shared/lib";
import { BookmarkReviewView } from "@/views/bookmark";

type Props = {
  params: Promise<{
    listId: string;
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

export default async function BookmarkReviewPage({ params }: Props) {
  const [{ listId, questionId }, locale] = await Promise.all([
    params,
    getLocale(),
  ]);

  return (
    <BookmarkReviewView
      locale={parseLanguage(locale)}
      listId={listId}
      questionId={questionId}
    />
  );
}
