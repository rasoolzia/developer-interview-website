import { useTranslations } from "next-intl";

import type { Question } from "@/entities/question/model";
import { ROUTES } from "@/shared/config";
import { formatLabel } from "@/shared/lib";
import { BackLink } from "@/shared/ui";

type Props = {
  question: Question;
  className?: string;
};

export function QuestionHeader({ question, className }: Props) {
  const t = useTranslations("topic");

  return (
    <header className={className}>
      <BackLink
        href={ROUTES.topic(question.domain, question.topic)}
        className="mb-4"
      >
        {t("backToPage", { page: formatLabel(question.topic) })}
      </BackLink>

      <h1 className="text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
        {question.title}
      </h1>
    </header>
  );
}
