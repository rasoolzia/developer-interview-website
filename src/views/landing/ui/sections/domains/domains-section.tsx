import { Code2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { LandingDomain } from "../../../model";

type Props = {
  domains: LandingDomain[];
};

export function DomainsSection({ domains }: Props) {
  const t = useTranslations("landing.domains");

  return (
    <section className="container mx-auto px-4 py-16 sm:py-24">
      <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">
          {t("eyebrow")}
        </p>

        <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("title")}
        </h2>

        <p className="text-muted-foreground text-pretty">{t("description")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {domains.map((domain) => (
          <article
            key={domain.slug}
            className="group bg-card rounded-xl border p-6 shadow-sm transition-colors hover:bg-muted/40"
          >
            <div className="bg-primary/10 text-primary mb-5 flex size-10 items-center justify-center rounded-lg">
              <Code2Icon className="size-5" />
            </div>

            <h3 className="font-heading text-start text-lg font-semibold">
              {domain.label}
            </h3>

            <p className="text-muted-foreground mt-2 text-start text-sm">
              {t("topics", { count: domain.topics })}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
