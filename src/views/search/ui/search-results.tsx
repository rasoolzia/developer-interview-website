import { useTranslations } from "next-intl";

import type { SearchItem } from "@/entities/search/model";
import { QuestionList } from "@/widgets/question-list";

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

      <QuestionList questions={results} />

      <SearchPagination page={page} totalPages={totalPages} />
    </section>
  );
}
