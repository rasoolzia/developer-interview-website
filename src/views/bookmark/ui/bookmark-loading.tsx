import { Skeleton } from "@/shared/ui/shadcn";
import { QuestionListLoading } from "@/widgets/question-list";

export function BookmarkLoading({ detail = false }: { detail?: boolean }) {
  if (detail) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-y-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-40 sm:h-9" />
              <div className="flex gap-1">
                <Skeleton className="size-7" />
                <Skeleton className="size-7" />
              </div>
            </div>
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex flex-col items-end gap-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
        <QuestionListLoading count={5} showDate />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-8 w-40 sm:h-9" />
        <div className="flex w-full gap-2 sm:w-auto">
          <Skeleton className="h-8 min-w-0 flex-1 sm:w-48 sm:flex-none" />
          <Skeleton className="h-8 w-28" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-xl border px-4 py-5"
          >
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-40 sm:h-5" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-36" />
            </div>
            <Skeleton className="size-5" />
            <div className="flex shrink-0 items-center gap-1 border-s ps-3">
              <Skeleton className="size-7" />
              <Skeleton className="size-7" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
