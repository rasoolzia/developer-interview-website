"use client";

import { useTranslations } from "next-intl";

import { ROUTES } from "@/shared/config";
import { Locale } from "@/shared/config/i18n";
import { parseLanguage } from "@/shared/lib";
import { BackLink } from "@/shared/ui";
import { QuestionDetailsView, QuestionLoading } from "@/views/question";

import { useReportReview } from "../model/use-report-review";

export function ReportReviewView({
  locale,
  questionId,
}: {
  locale: Locale;
  questionId: string;
}) {
  const t = useTranslations("management.reports");
  const commonT = useTranslations("common");
  const { loading, error, questionUnavailable, questionNotFound, details } =
    useReportReview(questionId, parseLanguage(locale));

  if (loading) {
    return <QuestionLoading />;
  }

  if (error) {
    return <p className="text-destructive py-10 text-center">{t("error")}</p>;
  }

  if (questionUnavailable || questionNotFound) {
    return (
      <div className="space-y-4 py-10">
        <BackLink href={ROUTES.reports}>{commonT("reports")}</BackLink>
        <p className="text-muted-foreground text-center">
          {questionNotFound ? t("questionNotFound") : t("questionUnavailable")}
        </p>
      </div>
    );
  }

  if (!details) {
    return <p className="text-destructive py-10 text-center">{t("error")}</p>;
  }

  const { previousQuestionId, nextQuestionId } = details.navigation;

  return (
    <QuestionDetailsView
      {...details}
      header={{ backHref: ROUTES.reports, backPage: commonT("reports") }}
      navigationHrefs={{
        previous: previousQuestionId
          ? ROUTES.reportReview(previousQuestionId)
          : undefined,
        next: nextQuestionId ? ROUTES.reportReview(nextQuestionId) : undefined,
      }}
    />
  );
}
