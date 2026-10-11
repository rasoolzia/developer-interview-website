import type { Domain } from "@/entities/domain/model";
import { TopicCard } from "@/entities/topic/ui";
import type { Locale } from "@/shared/config/i18n";

import { TopicHeader } from "./topic-header";

type Props = {
  groups: Domain[];
  locale: Locale;
  isSingleDomain?: boolean;
};

export function TopicsView({ groups, locale, isSingleDomain = false }: Props) {
  return groups.map((domain) => (
    <section key={domain.slug} className="py-8">
      <TopicHeader domain={domain} isSingleDomain={isSingleDomain} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {domain.topics.map((topic) => (
          <TopicCard
            key={topic.slug}
            topic={topic}
            domainSlug={domain.slug}
            locale={locale}
          />
        ))}
      </div>
    </section>
  ));
}
