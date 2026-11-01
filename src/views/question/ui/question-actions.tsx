"use client";

import { useTranslations } from "next-intl";

import { Question } from "@/entities/question/model";
import { SaveQuestionButton } from "@/features/bookmark";
import { CopyButton } from "@/features/copy";
import { ReportQuestionButton } from "@/features/report";

type Props = {
  questionId: Question["id"];
};

export function QuestionActions({ questionId }: Props) {
  const t = useTranslations("question");

  return (
    <section className="rounded-xl border p-5">
      <h2 className="mb-4 text-sm font-semibold">{t("actions")}</h2>

      <div className="space-y-1">
        <SaveQuestionButton questionId={questionId} />

        <CopyButton
          value={() => window.location.href}
          className="w-full justify-start"
        >
          {({ copied }) => (copied ? t("linkCopied") : t("copyLink"))}
        </CopyButton>

        <ReportQuestionButton questionId={questionId} />
      </div>
    </section>
  );
}
