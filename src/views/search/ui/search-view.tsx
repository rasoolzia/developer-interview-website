import { SearchFilters } from "@/entities/search/model";
import { FiltersSheet, FiltersSidebar } from "@/features/filters";
import { SearchInput } from "@/features/search";
import { QueryStateProvider } from "@/shared/hooks";

import { getSearch } from "../api";
import { SearchEmpty } from "./search-empty";
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
    <QueryStateProvider>
      <div className="flex gap-8">
        <FiltersSidebar facets={data.facets} filters={data.filters} />

        <div className="min-w-0 flex-1 space-y-6 py-8">
          <SearchInput
            key={trimmedQuery}
            defaultValue={trimmedQuery}
            autoFocus
            searchOnEmptyInput
            clearable
          />

          <FiltersSheet facets={data.facets} filters={data.filters} />

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
        </div>
      </div>
    </QueryStateProvider>
  );
}
