import { Skeleton } from "@/shared/ui/shadcn";

export function TopicDetailsLoading() {
  return (
    <div className="space-y-8">
      <div>
        <div className="mb-2">
          <Skeleton className="h-5 w-32" />
        </div>

        <Skeleton className="h-10 w-64" />
        <Skeleton className="mt-2 h-5 w-24" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="rounded-lg border p-6">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="mt-2 h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
