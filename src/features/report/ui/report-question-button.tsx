"use client";

import { FlagIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import type { Question } from "@/entities/question/model";
import { cn } from "@/shared/lib/utils";
import { Button, Dialog, DialogTrigger } from "@/shared/ui/shadcn";

import { reportRepository } from "../storage";
import { ReportQuestionDialog } from "./report-question-dialog";

type Props = {
  questionId: Question["id"];
};

export function ReportQuestionButton({ questionId }: Props) {
  const t = useTranslations("question");

  const [open, setOpen] = useState(false);
  const [isReported, setIsReported] = useState(false);

  useEffect(() => {
    reportRepository
      .isQuestionReported(questionId)
      .then(setIsReported)
      .catch(() => {});
  }, [questionId]);

  function handleReported() {
    setIsReported(true);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "w-full justify-start",
              isReported
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          />
        }
      >
        <FlagIcon className={cn("size-4", isReported && "fill-current")} />
        {isReported ? t("reported") : t("report")}
      </DialogTrigger>

      {open && (
        <ReportQuestionDialog
          questionId={questionId}
          onReported={handleReported}
        />
      )}
    </Dialog>
  );
}
