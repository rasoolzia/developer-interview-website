import { Container } from "@/shared/ui";
import { Skeleton } from "@/shared/ui/shadcn";

export function StatsSectionSkeleton() {
  return (
    <section className="bg-muted/30 border-y">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
          <Skeleton className="mx-auto h-8 w-48" />
          <Skeleton className="mx-auto h-4 w-72" />
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-xl border p-6 text-center shadow-sm sm:p-8"
            >
              <Skeleton className="mx-auto h-10 w-20" />
              <Skeleton className="mx-auto mt-2 h-4 w-16" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
