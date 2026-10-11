import { useTranslations } from "next-intl";

import type { Topic } from "@/entities/topic/model";
import { ROUTES } from "@/shared/config";
import type { Locale } from "@/shared/config/i18n";
import { BaseCard } from "@/shared/ui/base-card";

type TopicCardProps = {
  topic: Topic;
  domainSlug: string;
  locale: Locale;
};

export function TopicCard({ topic, domainSlug, locale }: TopicCardProps) {
  const t = useTranslations("topic");
  const totalQuestions = topic.languages[locale]?.total ?? 0;

  return (
    <BaseCard href={ROUTES.topic(domainSlug, topic.slug)}>
      <h3 className="group-hover:text-primary font-heading pe-8 text-start text-lg font-semibold transition-colors">
        {topic.label}
      </h3>

      <p className="text-muted-foreground mt-2 text-start text-sm">
        {t("questionsCount", { count: totalQuestions })}
      </p>
    </BaseCard>
  );
}
