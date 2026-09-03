import { SearchInput } from "@/features/search";

import { getSearch } from "../api";
import { SearchFilters } from "../model";
import { SearchEmpty } from "./search-empty";
import { SearchResults } from "./search-results";

type Props = {
  filters: SearchFilters;
};

export async function SearchView({ filters }: Props) {
  const data = await getSearch(filters);
  const hasQuery = Boolean(filters.query?.trim());
  const hasResults = data.results.length > 0;

  const showEmpty = !hasQuery || !hasResults;

  return (
    <>
      <SearchInput key={filters.query} defaultValue={filters.query} autoFocus />

      {showEmpty ? (
        <SearchEmpty query={hasQuery ? filters.query : undefined} />
      ) : (
        <SearchResults
          query={filters.query}
          total={data.total}
          results={data.results}
        />
      )}
    </>
  );
}
