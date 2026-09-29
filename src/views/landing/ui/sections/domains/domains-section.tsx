import { Code2Icon } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Container } from "@/shared/ui";

import { getLanding } from "../../../api";

export async function DomainsSection() {
  const [{ domains }, t] = await Promise.all([
    getLanding(),
    getTranslations("landing.domains"),
  ]);

  return (
    <Container className="py-16 sm:py-24" as="section">
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
          <Link href={domain.slug} key={domain.slug}>
            <article className="group bg-card hover:bg-muted/40 rounded-xl border p-6 shadow-sm transition-colors">
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
          </Link>
        ))}
      </div>
    </Container>
  );
}
