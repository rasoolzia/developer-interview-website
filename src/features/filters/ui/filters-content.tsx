"use client";

import { useTranslations } from "next-intl";

import type { SearchFacets, SearchFilters } from "@/entities/search/model";
import { SEARCH_PARAMS } from "@/shared/config";
import { useQueryState } from "@/shared/hooks";
import { Separator } from "@/shared/ui/shadcn";

import { FilterSection } from "./filter-section";

type Props = {
  facets: SearchFacets;
  filters: SearchFilters;
};

export function FiltersContent({ facets, filters }: Props) {
  const t = useTranslations("search");
  const { updateParams } = useQueryState();

  const sections = [
    {
      key: "domain",
      title: t("filters.domain"),
      options: facets.domains,
      value: filters.domain,
      onChange: (value: string | undefined) =>
        updateParams({
          [SEARCH_PARAMS.domain]: value,
          [SEARCH_PARAMS.topic]: undefined,
          [SEARCH_PARAMS.difficulty]: undefined,
          [SEARCH_PARAMS.category]: undefined,
          [SEARCH_PARAMS.page]: undefined,
        }),
    },
    {
      key: "topic",
      title: t("filters.topic"),
      options: facets.topics,
      value: filters.topic,
      onChange: (value: string | undefined) =>
        updateParams({
          [SEARCH_PARAMS.topic]: value,
          [SEARCH_PARAMS.difficulty]: undefined,
          [SEARCH_PARAMS.category]: undefined,
          [SEARCH_PARAMS.page]: undefined,
        }),
    },
    {
      key: "difficulty",
      title: t("filters.difficulty"),
      options: facets.difficulties,
      value: filters.difficulty,
      onChange: (value: string | undefined) =>
        updateParams({
          [SEARCH_PARAMS.difficulty]: value,
          [SEARCH_PARAMS.category]: undefined,
          [SEARCH_PARAMS.page]: undefined,
        }),
    },
    {
      key: "category",
      title: t("filters.category"),
      options: facets.categories,
      value: filters.category,
      scrollable: true,
      onChange: (value: string | undefined) =>
        updateParams({
          [SEARCH_PARAMS.category]: value,
          [SEARCH_PARAMS.page]: undefined,
        }),
    },
  ];

  const visibleSections = sections.filter((s) => s.options.length > 0);

  if (visibleSections.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">{t("filters.empty")}</p>
    );
  }

  return (
    <div className="space-y-6">
      {visibleSections.map((section, index) => (
        <div key={section.key}>
          {index > 0 && <Separator className="mb-6" />}
          <FilterSection
            title={section.title}
            options={section.options}
            value={section.value}
            scrollable={section.scrollable}
            onChange={section.onChange}
          />
        </div>
      ))}
    </div>
  );
}
