import type { SearchParams } from "@/entities/search/model";
import { SearchView } from "@/views/search";
import { toSearchFilters } from "@/views/search/lib";

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
