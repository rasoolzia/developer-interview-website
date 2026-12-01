"use client";

import { useTranslations } from "next-intl";

import { ROUTES } from "@/shared/config";
import { Locale } from "@/shared/config/i18n";
import { parseLanguage } from "@/shared/lib";
import { BackLink } from "@/shared/ui";
import { QuestionDetailsView, QuestionLoading } from "@/views/question";

import { useBookmarkReview } from "../model/use-bookmark-review";

export function BookmarkReviewView({
  locale,
  listId,
  questionId,
}: {
  locale: Locale;
  listId: string;
  questionId: string;
}) {
  const t = useTranslations("management.bookmarks");

  const { loading, error, listNotFound, questionUnavailable, list, details } =
    useBookmarkReview(listId, questionId, parseLanguage(locale));

  if (loading) {
    return <QuestionLoading />;
  }

  if (error) {
    return <p className="text-destructive py-10 text-center">{t("error")}</p>;
  }

  if (listNotFound) {
    return (
      <p className="text-muted-foreground py-10 text-center">{t("notFound")}</p>
    );
  }

  if (questionUnavailable || !details) {
    return (
      <div className="space-y-4 py-10">
        {list && (
          <BackLink href={ROUTES.bookmarkList(listId)}>{list.name}</BackLink>
        )}
        <p className="text-muted-foreground text-center">
          {t("questionUnavailable")}
        </p>
      </div>
    );
  }

  const { previousQuestionId, nextQuestionId } = details.navigation;

  return (
    <QuestionDetailsView
      {...details}
      navigationHrefs={{
        previous: previousQuestionId
          ? ROUTES.bookmarkReview(listId, previousQuestionId)
          : undefined,
        next: nextQuestionId
          ? ROUTES.bookmarkReview(listId, nextQuestionId)
          : undefined,
      }}
    />
  );
}
