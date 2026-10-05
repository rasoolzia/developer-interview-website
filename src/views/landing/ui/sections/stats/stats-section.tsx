import { getLocale, getTranslations } from "next-intl/server";

import { Locale } from "@/shared/config/i18n";
import { Container } from "@/shared/ui";

import { getLandingStats } from "../../../api";

export async function StatsSection() {
  const [locale, stats, t] = await Promise.all([
    getLocale(),
    getLandingStats(),
    getTranslations("landing.stats"),
  ]);

  return (
    <section className="bg-muted/30 border-y">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("title")}
          </h2>

          <p className="text-muted-foreground">{t("description")}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <StatCard
            title={t("questions")}
            value={stats.questions[locale as Locale]}
          />

          <StatCard title={t("topics")} value={stats.topics} />

          <StatCard title={t("domains")} value={stats.domains} />

          <StatCard title={t("languages")} value={stats.languages} />
        </div>
      </Container>
    </section>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-card rounded-xl border p-6 text-center shadow-sm sm:p-8">
      <div dir="ltr" className="text-3xl font-bold tabular-nums sm:text-4xl">
        {value}
      </div>

      <div className="text-muted-foreground mt-2 text-sm">{title}</div>
    </div>
  );
}
