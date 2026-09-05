import { SearchInput } from "@/features/search";

import { getSearch } from "../api";
import type { SearchFilters } from "../model";
import { SearchEmpty } from "./search-empty";
import { SearchNavigationProvider } from "./search-navigation";
import { SearchResults } from "./search-results";
import { SearchResultsPending } from "./search-results-pending";

type Props = {
  filters: SearchFilters;
};

export async function SearchView({ filters }: Props) {
  const data = await getSearch(filters);
  const hasResults = data.results.length > 0;
  const trimmedQuery = filters.query?.trim();

  return (
    <SearchNavigationProvider>
      <SearchInput key={trimmedQuery} defaultValue={trimmedQuery} autoFocus />

      <SearchResultsPending>
        {!hasResults ? (
          <SearchEmpty query={trimmedQuery} />
        ) : (
          <SearchResults
            query={trimmedQuery}
            total={data.total}
            results={data.results}
            page={data.page}
            totalPages={data.totalPages}
          />
        )}
      </SearchResultsPending>
    </SearchNavigationProvider>
  );
}
