"use client";

import { FlagIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Question } from "@/entities/question/model";
import { Button } from "@/shared/ui/shadcn";

type Props = {
  questionId: Question["id"];
};

export function ReportQuestionButton({ questionId }: Props) {
  console.log("questionId :", questionId);
  const t = useTranslations("question");

  return (
    <Button
      type="button"
      variant="ghost"
      className="text-muted-foreground hover:text-foreground w-full justify-start"
    >
      <FlagIcon className="size-4" />
      {t("report")}
    </Button>
  );
}
