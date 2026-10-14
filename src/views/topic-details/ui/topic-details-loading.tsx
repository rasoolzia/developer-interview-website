import { QuestionCardSkeleton } from "@/entities/question/ui";
import { Skeleton } from "@/shared/ui/shadcn";

export function TopicDetailsLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-col-reverse flex-wrap gap-y-3 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-10 w-64 rounded-md" />
          <Skeleton className="h-6 w-36 rounded-md" />
        </div>
        <Skeleton className="h-4 w-40 rounded-md" />
        <div className="mt-4 flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>

      <div className="space-y-4">
        <QuestionCardSkeleton count={6} />
      </div>
    </div>
  );
}
