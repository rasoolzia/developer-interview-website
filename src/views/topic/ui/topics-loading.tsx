import { Skeleton } from "@/shared/ui/shadcn";

export function TopicsLoading() {
  return (
    <div className="space-y-12">
      {Array.from({ length: 2 }).map((_, domainIdx) => (
        <div key={domainIdx} className="py-8">
          <div className="mb-6">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="mt-2 h-5 w-24" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, topicIdx) => (
              <div key={topicIdx} className="rounded-xl border p-6 shadow-sm">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="mt-2 h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
