"use client";

import { XIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { reportRepository } from "@/features/report/storage";
import { useMutationState } from "@/shared/hooks";
import { Button } from "@/shared/ui/shadcn";
import { QuestionList } from "@/widgets/question-list";

import { useReportedQuestions } from "../model";
import { ReportLoading } from "./report-loading";

export function ReportsView() {
  const t = useTranslations("management.reports");
  const { questions, loading, error, removeLocal } = useReportedQuestions();
  const { saving, error: mutationError, run: runMutation } = useMutationState();

  async function removeReport(questionId: string) {
    if (!confirm(t("confirmRemove"))) return;
    await runMutation(async () => {
      await reportRepository.removeReport(questionId);
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
        <div className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="relative">
              <QuestionList questions={[question]} />
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute inset-e-3 top-3"
                aria-label={t("remove")}
                disabled={saving}
                onClick={() => void removeReport(question.id)}
              >
                <XIcon />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
