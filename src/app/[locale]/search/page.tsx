import { getLocale } from "next-intl/server";

import { SEARCH_PARAMS } from "@/shared/config";
import { toSingleParam } from "@/shared/lib";
import { SearchView } from "@/views/search";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getLocale();
  const params = (await searchParams) ?? {};

  return (
    <SearchView
      filters={{
        query: toSingleParam(params[SEARCH_PARAMS.query]),
        domain: toSingleParam(params[SEARCH_PARAMS.domain]),
        topic: toSingleParam(params[SEARCH_PARAMS.topic]),
        difficulty: toSingleParam(params[SEARCH_PARAMS.difficulty]),
        category: toSingleParam(params[SEARCH_PARAMS.category]),
        language: toSingleParam(params[SEARCH_PARAMS.language]) ?? locale,
        page: Number(toSingleParam(params[SEARCH_PARAMS.page])) || 1,
      }}
    />
  );
}
