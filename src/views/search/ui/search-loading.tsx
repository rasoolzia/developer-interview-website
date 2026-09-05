import { Skeleton } from "@/shared/ui/shadcn";

export function SearchLoading() {
  return (
    <div className="space-y-8">
      <Skeleton className="mx-auto h-11 max-w-3xl rounded-md" />

      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
