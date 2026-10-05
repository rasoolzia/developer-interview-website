import { Code2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Domain } from "@/entities/domain/model";
import { ROUTES } from "@/shared/config";
import { Link } from "@/shared/config/i18n";

type Props = {
  domain: Domain;
};

export function DomainCard({ domain }: Props) {
  const t = useTranslations("topic");

  return (
    <Link href={ROUTES.domain(domain.slug)}>
      <article className="group bg-card hover:bg-muted/40 rounded-xl border p-6 shadow-sm transition-colors">
        <div className="bg-primary/10 text-primary mb-5 flex size-10 items-center justify-center rounded-lg">
          <Code2Icon className="size-5" />
        </div>

        <h3 className="font-heading text-start text-lg font-semibold">
          {domain.label}
        </h3>

        <p className="text-muted-foreground mt-2 text-start text-sm">
          {t("topicsCount", { count: domain.topics.length })}
        </p>
      </article>
    </Link>
  );
}
