import { useTranslations } from "next-intl";

import { toQuestionCard } from "@/entities/question/lib";
import { QuestionCard } from "@/entities/question/ui";
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
          <span className="text-primary">{total}</span>{" "}
          <span>{t("results")}</span>
        </h1>

        {query && (
          <p className="text-muted-foreground mt-1">
            {t("resultsFor")}{" "}
            <span className="text-foreground font-medium">“{query}”</span>
          </p>
        )}
      </div>

      <div className="space-y-4">
        {results.map((item) => (
          <QuestionCard
            key={`${item.id}-${item.language}`}
            item={toQuestionCard(item)}
          />
        ))}
      </div>

      <SearchPagination page={page} totalPages={totalPages} />
    </section>
  );
}
