"use client";

import { BookmarkIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Question } from "@/entities/question/model";
import { Button } from "@/shared/ui/shadcn";

type Props = {
  questionId: Question["id"];
};

export function SaveQuestionButton({ questionId }: Props) {
  console.log("questionId :", questionId);
  const t = useTranslations("question");

  return (
    <Button type="button" variant="ghost" className="w-full justify-start">
      <BookmarkIcon className="size-4" />
      {t("save")}
    </Button>
  );
}
