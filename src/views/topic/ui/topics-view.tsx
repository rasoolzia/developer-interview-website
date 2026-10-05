import { useTranslations } from "next-intl";

import type { Domain } from "@/entities/domain/model";
import { ROUTES } from "@/shared/config";
import { Link, type Locale } from "@/shared/config/i18n";

type Props = {
  groups: Domain[];
  locale: string;
};

export function TopicsView({ groups, locale }: Props) {
  const t = useTranslations("topic");

  return (
    <div className="space-y-12">
      {groups.map((item) => (
        <section key={item.slug} className="py-8">
          <div className="mb-6">
            <Link
              href={ROUTES.domain(item.slug)}
              className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {item.label}
            </Link>
            <p className="text-muted-foreground mt-2">
              {t("topicsCount", { count: item.topics.length })}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {item.topics.map((topic) => {
              const totalQuestions =
                topic.languages[locale as Locale]?.total ?? 0;

              return (
                <Link
                  key={topic.slug}
                  href={ROUTES.topic(item.slug, topic.slug)}
                  className="group block"
                >
                  <article className="bg-card hover:bg-muted/40 rounded-xl border p-6 shadow-sm transition-colors">
                    <h3 className="font-heading text-start text-lg font-semibold">
                      {topic.label}
                    </h3>

                    <p className="text-muted-foreground mt-2 text-start text-sm">
                      {t("questionsCount", { count: totalQuestions })}
                    </p>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
