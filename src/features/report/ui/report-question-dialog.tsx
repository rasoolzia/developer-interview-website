"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { SITE } from "@/shared/constants";
import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/shadcn";

import { indexedDbReportRepository as repo } from "../storage/indexed-db-report.repository";

type Props = {
  questionId: string;
  onReported: () => void;
};

export function ReportQuestionDialog({ questionId, onReported }: Props) {
  const t = useTranslations("question.reportDialog");

  const [isReporting, setIsReporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleReport() {
    if (isReporting) return;
    setIsReporting(true);
    setError(null);
    try {
      await repo.addReport(questionId);
      onReported();

      const url = `${SITE.github}/issues/new?title=${encodeURIComponent(
        `[Question] ${questionId}`,
      )}&labels=question-report`;
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      setError(t("errorReport"));
    } finally {
      setIsReporting(false);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogDescription>
          {t("description", { questionId })}
        </DialogDescription>
      </DialogHeader>

      {error && <p className="text-destructive text-sm">{error}</p>}

      <DialogFooter showCloseButton={false}>
        <DialogClose render={<Button variant="outline" />}>
          {t("cancel")}
        </DialogClose>
        <Button
          type="button"
          onClick={() => void handleReport()}
          disabled={isReporting}
        >
          {t("openGithub")}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
