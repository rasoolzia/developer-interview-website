import { CalendarDaysIcon, ClockIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { ROUTES } from "@/shared/config";
import { formatLabel } from "@/shared/lib";
import type { QuestionBase } from "@/shared/types";
import { BaseCard } from "@/shared/ui";
import { Badge } from "@/shared/ui/shadcn";

type Props = {
  question: QuestionBase;
  domain: string;
  topic: string;
  href?: string;
  action?: React.ReactNode;
  showArrow?: boolean;
  date?: {
    timestamp: number;
    message: string;
  };
};

const VISIBLE_CATEGORIES = 2;

export function QuestionCard({
  question,
  domain,
  topic,
  href,
  action,
  showArrow: showArrowProp,
  date,
}: Props) {
  const t = useTranslations("question");

  const visibleCategories = question.categories.slice(0, VISIBLE_CATEGORIES);
  const hiddenCount = question.categories.length - visibleCategories.length;
  const showArrow = action ? false : showArrowProp;

  return (
    <BaseCard
      href={href ?? ROUTES.question(domain, topic, question.slug)}
      showArrow={showArrow}
      action={action}
    >
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        {topic && <Badge>{formatLabel(topic)}</Badge>}

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

      <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
        <span className="inline-flex items-center gap-1.5">
          <ClockIcon className="size-3.5" />
          {t("readingTime", { minutes: question.readingTime })}
        </span>
        {date && (
          <span className="inline-flex items-center gap-1.5">
            <CalendarDaysIcon className="size-3.5" />
            <time dateTime={new Date(date.timestamp).toISOString()}>
              {date.message}
            </time>
          </span>
        )}
      </div>
    </BaseCard>
  );
}
