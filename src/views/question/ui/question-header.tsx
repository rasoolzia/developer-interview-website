import { ArrowLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { Question } from "@/entities/question/model";
import { ROUTES } from "@/shared/config";
import { Link } from "@/shared/config/i18n";
import { formatLabel } from "@/shared/lib";

type Props = {
  question: Question;
  className?: string;
};

export function QuestionHeader({ question, className }: Props) {
  const t = useTranslations("topic");

  return (
    <header className={className}>
      <Link
        href={ROUTES.topic(question.domain, question.topic)}
        className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeftIcon className="size-4 rtl:rotate-180" />
        {t("backToPage", {
          page: formatLabel(question.topic),
        })}
      </Link>

      <h1 className="text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
        {question.title}
      </h1>
    </header>
  );
}
