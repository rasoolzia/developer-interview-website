"use client";

import { useLocale, useTranslations } from "next-intl";

import type { QuestionProgress as QuestionProgressData } from "@/entities/question/model";
import { Progress } from "@/shared/ui/shadcn";

type Props = {
  progress: QuestionProgressData;
  className?: string;
};

export function QuestionProgress({ progress, className }: Props) {
  const t = useTranslations("question");
  const locale = useLocale();
  const { current, total } = progress;
  const percent = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={className}>
      <div className="text-muted-foreground mb-2 flex items-center justify-between text-xs">
        <span>{t("progress", { current, total })}</span>
      </div>

      <Progress value={percent} locale={locale} className="h-1.5" />
    </div>
  );
}
