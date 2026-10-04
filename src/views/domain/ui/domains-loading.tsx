import { Skeleton } from "@/shared/ui/shadcn";

export function DomainsLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-xl border p-6 shadow-sm">
          <Skeleton className="mb-5 size-10 rounded-lg" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-2 h-4 w-20" />
        </div>
      ))}
    </div>
  );
}
