import Link from "next/link";

import type { SearchItem } from "@/entities/search/model";

type Props = {
  query: string;

  total: number;

  results: SearchItem[];
};

export function SearchResults({ query, total, results }: Props) {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{total} results</h1>

        <p className="text-muted-foreground">{query}</p>
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
    </section>
  );
}
