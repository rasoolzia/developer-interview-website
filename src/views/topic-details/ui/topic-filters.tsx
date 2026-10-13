"use client";

import { toCanonicalDifficulty } from "@/entities/question/lib";
import { SEARCH_PARAMS } from "@/shared/config";
import { useQueryState } from "@/shared/hooks";
import { Badge } from "@/shared/ui/shadcn";

type Props = {
  difficulties: string[];
  byDifficulty: Record<string, number>;
  categories: string[];
  activeDifficulty?: string;
  activeCategory?: string;
};

export function TopicFilters({
  difficulties,
  byDifficulty,
  categories,
  activeDifficulty,
  activeCategory,
}: Props) {
  const { updateParams } = useQueryState();

  return (
    <div className="mt-4 space-y-3">
      <div className="flex scrollbar-none items-center gap-2 overflow-auto">
        {difficulties.map((difficulty) => {
          const canonical = toCanonicalDifficulty(difficulty);
          const isActive = canonical === activeDifficulty;

          return (
            <button
              key={difficulty}
              type="button"
              onClick={() =>
                updateParams({
                  [SEARCH_PARAMS.difficulty]: isActive ? undefined : canonical,
                })
              }
              className="cursor-pointer"
            >
              <Badge
                className="font-normal"
                variant={isActive ? "default" : "outline"}
              >
                {difficulty} ({byDifficulty[difficulty] ?? 0})
              </Badge>
            </button>
          );
        })}
      </div>

      {categories.length > 0 && (
        <div className="flex scrollbar-none gap-1.5 overflow-auto">
          {categories.map((category) => {
            const isActive = category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  updateParams({
                    [SEARCH_PARAMS.category]: isActive ? undefined : category,
                  })
                }
                className="cursor-pointer"
              >
                <Badge
                  className="font-normal"
                  variant={isActive ? "default" : "secondary"}
                >
                  {category}
                </Badge>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
