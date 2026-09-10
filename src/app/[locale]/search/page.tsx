import { getLocale } from "next-intl/server";

import type { SearchParams } from "@/entities/search/model";
import { SearchView } from "@/views/search";
import { toSearchFilters } from "@/views/search/lib";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const locale = await getLocale();
  const params = (await searchParams) ?? {};

  return <SearchView filters={toSearchFilters(params, locale)} />;
}
