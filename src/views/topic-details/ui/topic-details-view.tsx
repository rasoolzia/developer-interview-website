import { ArrowLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { Question } from "@/entities/question/model";
import type { TopicDetails } from "@/entities/topic/model";
import { ROUTES } from "@/shared/config";
import { Link } from "@/shared/config/i18n";
import { QueryStateProvider } from "@/shared/hooks";
import { formatLabel } from "@/shared/lib";
import { QuestionList } from "@/widgets/question-list";

import { TopicFilters } from "./topic-filters";

type Props = {
  data: TopicDetails;
  questions: Question[];
  filters: { difficulty?: string; category?: string };
};

export function TopicDetailsView({ data, questions, filters }: Props) {
  const t = useTranslations("topic");
  const isFiltered = Boolean(filters.difficulty || filters.category);

  return (
    <QueryStateProvider>
      <div className="space-y-8">
        <div>
          <div className="flex flex-col-reverse flex-wrap gap-y-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {data.content.title}
            </h1>
            <Link
              href={ROUTES.domain(data.meta.domain)}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors select-none"
            >
              <ArrowLeftIcon className="rtl:rotate-180" />
              {t("backToDomain", { domain: formatLabel(data.meta.domain) })}
            </Link>
          </div>

          <p className="text-muted-foreground mt-2">
            {t("questionsCount", { count: data.stats.total })} -{" "}
            {t("version", { version: data.version })}
          </p>

          <TopicFilters
            difficulties={data.content.difficulties}
            byDifficulty={data.stats.byDifficulty}
            categories={data.content.categories}
            activeDifficulty={filters.difficulty}
            activeCategory={filters.category}
          />
        </div>

        {questions.length > 0 ? (
          <QuestionList questions={questions} />
        ) : (
          <div className="bg-muted/40 rounded-lg border p-8 text-center">
            <p className="text-muted-foreground">
              {isFiltered
                ? t("noFilteredQuestions")
                : t("noQuestions", { topic: data.meta.label })}
            </p>
          </div>
        )}
      </div>
    </QueryStateProvider>
  );
}
