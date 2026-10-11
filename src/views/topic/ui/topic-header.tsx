import { useTranslations } from "next-intl";

import type { Domain } from "@/entities/domain/model";
import { ROUTES } from "@/shared/config";
import { Link } from "@/shared/config/i18n";

type TopicHeaderProps = {
  domain: Domain;
  isSingleDomain?: boolean;
};

export function TopicHeader({
  domain,
  isSingleDomain = false,
}: TopicHeaderProps) {
  const t = useTranslations("topic");

  return (
    <div className="mb-6">
      {isSingleDomain ? (
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          {domain.label}
        </h1>
      ) : (
        <Link
          href={ROUTES.domain(domain.slug)}
          className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {domain.label}
        </Link>
      )}
      <p className="text-muted-foreground mt-2">
        {t("topicsCount", { count: domain.topics.length })}
      </p>
    </div>
  );
}
