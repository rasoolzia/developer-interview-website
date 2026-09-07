"use client";

import { SlidersHorizontalIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import type { SearchFacets, SearchFilters } from "@/entities/search/model";
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/shadcn";

import { countActiveFilters } from "../lib/count-active-filters";
import { FiltersContent } from "./filters-content";

type Props = {
  facets: SearchFacets;
  filters: SearchFilters;
};

export function FiltersSheet({ facets, filters }: Props) {
  const t = useTranslations("search");
  const locale = useLocale();
  const activeCount = countActiveFilters(filters);

  const isRTL = locale === "fa";
  const side = isRTL ? "right" : "left";

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" className="lg:hidden">
            <SlidersHorizontalIcon className="size-4" />
            {t("filters.title")}
            {activeCount > 0 && (
              <span className="bg-primary text-primary-foreground rounded-full px-1.5 text-xs">
                {activeCount}
              </span>
            )}
          </Button>
        }
      />

      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>{t("filters.title")}</SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto px-4 pb-4">
          <FiltersContent facets={facets} filters={filters} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
