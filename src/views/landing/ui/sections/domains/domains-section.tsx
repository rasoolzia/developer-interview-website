import { getTranslations } from "next-intl/server";

import { getDomains } from "@/entities/domain/api";
import { ROUTES } from "@/shared/config";
import { Link } from "@/shared/config/i18n";
import { Container } from "@/shared/ui";
import { DomainGrid } from "@/widgets/domain-grid";

export async function DomainsSection() {
  const [domains, t] = await Promise.all([
    getDomains(),
    getTranslations("landing.domains"),
  ]);

  const visibleDomains = domains.slice(0, 3);

  return (
    <Container className="space-y-10 py-16 sm:py-24" as="section">
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">
          {t("eyebrow")}
        </p>

        <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("title")}
        </h2>

        <p className="text-muted-foreground text-pretty">{t("description")}</p>
      </div>

      <DomainGrid domains={visibleDomains} />

      <div className="flex justify-center">
        <Link
          href={ROUTES.domains}
          className="text-primary hover:text-primary/80 text-sm font-medium underline-offset-4 hover:underline"
        >
          {t("viewAll")}
        </Link>
      </div>
    </Container>
  );
}
