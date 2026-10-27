"use client";

import { useTranslations } from "next-intl";

import type { Question } from "@/entities/question/model";
import type { TopicDetails } from "@/entities/topic/model";
import { ROUTES } from "@/shared/config";
import { QueryStateProvider, useQueryState } from "@/shared/hooks";
import { formatLabel } from "@/shared/lib";
import { BackLink } from "@/shared/ui";
import { QuestionList, QuestionListLoading } from "@/widgets/question-list";

import { TopicFilters } from "./topic-filters";

type Props = {
  data: TopicDetails;
  questions: Question[];
  filters: { difficulty?: string; category?: string };
};

export function TopicDetailsView(props: Props) {
  return (
    <QueryStateProvider>
      <TopicDetailsContent {...props} />
    </QueryStateProvider>
  );
}

function TopicDetailsContent({ data, questions, filters }: Props) {
  const t = useTranslations("topic");
  const { isPending } = useQueryState();

  const isFiltered = Boolean(filters.difficulty || filters.category);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-col-reverse flex-wrap gap-y-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {data.content.title}
          </h1>

          <BackLink href={ROUTES.domain(data.meta.domain)} className="mb-4">
            {t("backToPage", { page: formatLabel(data.meta.domain) })}
          </BackLink>
        </div>

        <p className="text-muted-foreground mt-2">
          {t("version", { version: data.version })} -{" "}
          {t("questionsShowing", {
            filtered: questions.length,
            total: data.questions.length,
          })}
        </p>

        <TopicFilters
          difficulties={data.content.difficulties}
          categories={data.content.categories}
          activeDifficulty={filters.difficulty}
          activeCategory={filters.category}
        />
      </div>

      {isPending ? (
        <QuestionListLoading count={questions.length} />
      ) : questions.length > 0 ? (
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
  );
}
