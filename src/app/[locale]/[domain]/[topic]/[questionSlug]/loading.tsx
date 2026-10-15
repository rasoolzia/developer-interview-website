import { Skeleton } from "@/shared/ui/shadcn";

export default function QuestionPageLoading() {
  return (
    <main className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        <Skeleton className="h-9 w-full max-w-3xl rounded-md" />

        <div className="flex items-center gap-1.5">
          <Skeleton className="size-3.5 rounded-full" />
          <Skeleton className="h-3 w-24 rounded-md" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-28 rounded-md" />

        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        <Skeleton className="h-32 w-full rounded-lg" />

        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-10/12" />
          <Skeleton className="h-4 w-9/12" />
        </div>
      </div>
    </main>
  );
}
