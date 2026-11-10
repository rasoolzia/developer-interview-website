"use client";

import { Trash2Icon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { reportRepository } from "@/features/report/storage";
import { Locale } from "@/shared/config/i18n";
import { useMutationState } from "@/shared/hooks";
import { ConfirmationDialog } from "@/shared/ui";
import { Button } from "@/shared/ui/shadcn";
import { QuestionList } from "@/widgets/question-list";

import { useReportedQuestions } from "../model";
import { ReportLoading } from "./report-loading";

export function ReportsView() {
  const t = useTranslations("management.reports");
  const locale = useLocale();
  const { questions, loading, error, removeLocal } = useReportedQuestions(
    locale as Locale,
  );
  const { saving, error: mutationError, run: runMutation } = useMutationState();
  const [pendingQuestionId, setPendingQuestionId] = useState<string | null>(
    null,
  );

  async function removeReport(questionId: string) {
    await runMutation(async () => {
      await reportRepository.removeReport(questionId);
      setPendingQuestionId(null);
      removeLocal(questionId);
    });
  }

  if (loading) return <ReportLoading />;

  return (
    <div className="space-y-6 py-6 sm:py-8">
      <h1 className="text-2xl font-bold sm:text-3xl">{t("title")}</h1>

      {(error || mutationError) && (
        <p className="text-destructive text-sm">{t("error")}</p>
      )}

      {questions.length === 0 ? (
        <p className="text-muted-foreground py-10 text-center">{t("empty")}</p>
      ) : (
        <QuestionList
          questions={questions}
          getAction={(question) => (
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              aria-label={t("remove")}
              disabled={saving}
              onClick={() => setPendingQuestionId(question.id)}
            >
              <Trash2Icon />
            </Button>
          )}
        />
      )}

      <ConfirmationDialog
        open={pendingQuestionId !== null}
        title={t("removeTitle")}
        description={t("removeDescription")}
        cancelLabel={t("cancel")}
        confirmLabel={t("remove")}
        onOpenChange={(open) => {
          if (!open) setPendingQuestionId(null);
        }}
        onConfirm={() => {
          if (pendingQuestionId) return removeReport(pendingQuestionId);
        }}
      />
    </div>
  );
}
