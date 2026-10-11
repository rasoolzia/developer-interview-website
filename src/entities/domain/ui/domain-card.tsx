import { Code2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Domain } from "@/entities/domain/model";
import { ROUTES } from "@/shared/config";
import { BaseCard } from "@/shared/ui/base-card";

type Props = {
  domain: Domain;
};

export function DomainCard({ domain }: Props) {
  const t = useTranslations("topic");

  return (
    <BaseCard href={ROUTES.domain(domain.slug)}>
      <div className="bg-primary/10 text-primary mb-4 flex size-10 items-center justify-center rounded-lg">
        <Code2Icon className="size-5" />
      </div>

      <h3 className="group-hover:text-primary font-heading pe-8 text-start text-lg font-semibold transition-colors">
        {domain.label}
      </h3>

      <p className="text-muted-foreground mt-2 text-start text-sm">
        {t("topicsCount", { count: domain.topics.length })}
      </p>
    </BaseCard>
  );
}
