import { ArrowRightIcon, ClockIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/shared/config/i18n";
import { formatLabel } from "@/shared/lib";
import { Badge } from "@/shared/ui/shadcn";

import type { QuestionCardItem } from "../model";

type Props = {
  item: QuestionCardItem;
};

const VISIBLE_CATEGORIES = 2;

export function QuestionCard({ item }: Props) {
  const t = useTranslations("question");

  const visibleCategories = item.categories.slice(0, VISIBLE_CATEGORIES);
  const hiddenCount = item.categories.length - visibleCategories.length;

  return (
    <Link
      href={item.href}
      className="group hover:border-primary/50 hover:bg-accent/30 relative block rounded-xl border p-5 transition-all hover:shadow-md"
    >
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <Badge>{formatLabel(item.topic)}</Badge>

        <Badge variant="outline">{item.difficulty}</Badge>

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
        {item.title}
      </h2>

      <div className="text-muted-foreground mt-3 flex items-center gap-1.5 text-xs">
        <ClockIcon className="size-3.5" />
        <span>{t("readingTime", { minutes: item.readingTime })}</span>
      </div>

      <ArrowRightIcon className="text-muted-foreground group-hover:text-primary absolute inset-e-5 top-5 size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
    </Link>
  );
}
