import { getLocale } from "next-intl/server";

import { SEARCH_PARAMS } from "@/shared/config";
import { SearchView } from "@/views/search";
import { SearchFilters } from "@/views/search/model";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<SearchFilters>;
}) {
  const locale = await getLocale();
  const params = await searchParams;

  return (
    <SearchView
      filters={{
        query: params?.[SEARCH_PARAMS.query],
        domain: params?.[SEARCH_PARAMS.domain],
        topic: params?.[SEARCH_PARAMS.topic],
        difficulty: params?.[SEARCH_PARAMS.difficulty],
        category: params?.[SEARCH_PARAMS.category],
        language: params?.[SEARCH_PARAMS.language] ?? locale,
      }}
    />
  );
}
