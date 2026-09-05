import Link from "next/link";
import { useTranslations } from "next-intl";

import type { SearchItem } from "@/entities/search/model";

import { SearchPagination } from "./search-pagination";

type Props = {
  query?: string;

  total: number;

  results: SearchItem[];

  page: number;

  totalPages: number;
};

export function SearchResults({
  query,
  total,
  results,
  page,
  totalPages,
}: Props) {
  const t = useTranslations("search");

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {total} {t("results")}
        </h1>

        {query && <p className="text-muted-foreground">{query}</p>}
      </div>

      <div className="space-y-4">
        {results.map((item) => (
          <Link
            key={`${item.id}-${item.language}`}
            href={`/${item.path}`}
            className="hover:border-primary block rounded-xl border p-6 transition"
          >
            <div className="mb-2 flex gap-2 text-sm">
              <span>{item.label}</span>
              <span>•</span>
              <span>{item.topic}</span>
              <span>•</span>
              <span>{item.difficulty}</span>
            </div>

            <h2 className="text-lg font-semibold">{item.title}</h2>
          </Link>
        ))}
      </div>

      <SearchPagination page={page} totalPages={totalPages} />
    </section>
  );
}
