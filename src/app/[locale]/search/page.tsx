import { SearchView } from "@/views/search";
import { SearchFilters } from "@/views/search/model";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchFilters>;
}) {
  const params = await searchParams;

  return (
    <SearchView
      filters={{
        query: params.query ?? "",
        domain: params.domain,
        topic: params.topic,
        difficulty: params.difficulty,
        category: params.category,
        language: params.language,
      }}
    />
  );
}
