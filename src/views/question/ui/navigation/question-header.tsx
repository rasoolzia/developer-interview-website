import { useTranslations } from "next-intl";

import { BackLink } from "@/shared/ui";

type Props = {
  questionTitle: string;
  backHref: string;
  backPage: string;
  className?: string;
};

export function QuestionHeader({
  questionTitle,
  className,
  backHref,
  backPage,
}: Props) {
  const t = useTranslations("topic");

  return (
    <header className={className}>
      <BackLink href={backHref} className="mb-4">
        {t("backToPage", {
          page: backPage,
        })}
      </BackLink>

      <h1 className="text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
        {questionTitle}
      </h1>
    </header>
  );
}
