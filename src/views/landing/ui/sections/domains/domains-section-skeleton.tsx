import { Skeleton } from "@/shared/ui/shadcn";

export function DomainsSectionSkeleton() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-24">
      <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
        <Skeleton className="mx-auto h-4 w-24" />
        <Skeleton className="mx-auto h-8 w-56" />
        <Skeleton className="mx-auto h-4 w-80" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-card rounded-xl border p-6 shadow-sm">
            <Skeleton className="mb-5 size-10 rounded-lg" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="mt-2 h-4 w-20" />
          </div>
        ))}
      </div>
    </section>
  );
}
