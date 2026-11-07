import { ClockIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { ROUTES } from "@/shared/config";
import { formatLabel } from "@/shared/lib";
import type { QuestionBase } from "@/shared/types";
import { BaseCard } from "@/shared/ui";
import { Badge } from "@/shared/ui/shadcn";

type Props = {
  question: QuestionBase;
  action?: React.ReactNode;
  showArrow?: boolean;
};

const VISIBLE_CATEGORIES = 2;

export function QuestionCard({
  question,
  action,
  showArrow: showArrowProp,
}: Props) {
  const t = useTranslations("question");

  const visibleCategories = question.categories.slice(0, VISIBLE_CATEGORIES);
  const hiddenCount = question.categories.length - visibleCategories.length;
  const showArrow = !!action ? false : showArrowProp;

  return (
    <BaseCard
      href={ROUTES.question(question.domain, question.topic, question.slug)}
      showArrow={showArrow}
      action={action}
    >
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <Badge>{formatLabel(question.topic)}</Badge>

        <Badge variant="outline">{question.difficulty}</Badge>

        {visibleCategories.map((category) => (
          <Badge
            key={category}
            variant="outline"
            className="text-muted-foreground font-normal"
          >
            {category}
          </Badge>
        ))}

        {hiddenCount > 0 && (
          <Badge
            variant="outline"
            className="text-muted-foreground font-normal"
          >
            +{hiddenCount}
          </Badge>
        )}
      </div>

      <h2 className="group-hover:text-primary line-clamp-2 pe-8 text-lg font-semibold transition-colors">
        {question.title}
      </h2>

      <div className="text-muted-foreground mt-3 flex items-center gap-1.5 text-xs">
        <ClockIcon className="size-3.5" />
        <span>{t("readingTime", { minutes: question.readingTime })}</span>
      </div>
    </BaseCard>
  );
}
