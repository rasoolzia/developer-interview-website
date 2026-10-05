import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { getDomains } from "@/entities/domain/api";
import { DomainGrid } from "@/widgets/domain-grid";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common.site");

  return {
    title: t("pages.domains"),
    description: t("description"),
  };
}

export default async function DomainsPage() {
  const domains = await getDomains();

  if (!domains.length) {
    notFound();
  }

  return <DomainGrid domains={domains} />;
}
