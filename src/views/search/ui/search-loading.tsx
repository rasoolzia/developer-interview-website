import { QuestionCardSkeleton } from "@/entities/question/ui";
import { Skeleton } from "@/shared/ui/shadcn";

export function SearchLoading() {
  return (
    <div className="flex gap-6 lg:gap-8">
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-20 space-y-6">
          <FilterSectionSkeleton rows={3} />
          <Skeleton className="h-px w-full" />
          <FilterSectionSkeleton rows={4} />
          <Skeleton className="h-px w-full" />
          <FilterSectionSkeleton rows={3} />
          <Skeleton className="h-px w-full" />
          <FilterSectionSkeleton rows={6} />
        </div>
      </aside>

      <div className="mt-6 min-w-0 flex-1 space-y-4">
        <Skeleton className="mx-auto h-11 w-4/5 max-w-3xl rounded-md" />

        <div className="space-y-2">
          <Skeleton className="h-8 w-40 rounded-md" />
          <Skeleton className="h-4 w-56 rounded-md" />
        </div>

        <div className="space-y-4">
          <QuestionCardSkeleton count={10} />
        </div>
      </div>
    </div>
  );
}

function FilterSectionSkeleton({ rows }: { rows: number }) {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-24 rounded-md" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-full rounded-md" />
      ))}
    </div>
  );
}
