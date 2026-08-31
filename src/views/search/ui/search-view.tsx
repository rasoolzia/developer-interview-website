import { getSearch } from "../api";
import { SearchFilters } from "../model";
import { SearchEmpty } from "./search-empty";
import { SearchResults } from "./search-results";

type Props = {
  filters: SearchFilters;
};

export async function SearchView({ filters }: Props) {
  const data = await getSearch(filters);

  if (!filters.query?.trim()) {
    return (
      <div className="container mx-auto py-20">
        <SearchEmpty />
      </div>
    );
  }

  if (data.results.length === 0) {
    return (
      <div className="container mx-auto py-20">
        <SearchEmpty query={filters.query} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <SearchResults
        query={filters.query}
        total={data.total}
        results={data.results}
      />
    </div>
  );
}
