import type { SearchFilters, SearchParams } from "@/entities/search/model";
import { SEARCH_PARAMS } from "@/shared/config";
import { toSingleParam } from "@/shared/lib";

export function toSearchFilters(
  params: SearchParams,
  locale: string,
): SearchFilters {
  return {
    query: toSingleParam(params[SEARCH_PARAMS.query]),
    domain: toSingleParam(params[SEARCH_PARAMS.domain]),
    topic: toSingleParam(params[SEARCH_PARAMS.topic]),
    difficulty: toSingleParam(params[SEARCH_PARAMS.difficulty]),
    category: toSingleParam(params[SEARCH_PARAMS.category]),
    language: toSingleParam(params[SEARCH_PARAMS.language]) ?? locale,
    page: Number(toSingleParam(params[SEARCH_PARAMS.page])) || 1,
  };
}
