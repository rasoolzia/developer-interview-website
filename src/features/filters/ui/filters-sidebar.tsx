import type { SearchFacets, SearchFilters } from "@/entities/search/model";

import { FiltersContent } from "./filters-content";

type Props = {
  facets: SearchFacets;
  filters: SearchFilters;
};

export function FiltersSidebar({ facets, filters }: Props) {
  return (
    <aside className="hidden w-64 shrink-0 border-e lg:block">
      <div className="sticky top-20 mt-3.75">
        <FiltersContent facets={facets} filters={filters} />
      </div>
    </aside>
  );
}
