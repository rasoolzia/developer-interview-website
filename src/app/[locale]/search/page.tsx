import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { SearchParams } from "@/entities/search/model";
import { SearchView } from "@/views/search";
import { toSearchFilters } from "@/views/search/lib";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");

  return {
    title: t("site.pages.search"),
    description: t("site.description"),
  };
}

export default async function SearchPage({
  searchParams,
  params,
}: {
  searchParams?: Promise<SearchParams>;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const paramsValue = (await searchParams) ?? {};

  return <SearchView filters={toSearchFilters(paramsValue, locale)} />;
}
