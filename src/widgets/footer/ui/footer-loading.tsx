import { Container } from "@/shared/ui";
import { Skeleton } from "@/shared/ui/shadcn";

export function FooterLoading() {
  return (
    <footer className="border-t">
      <Container className="flex min-h-16 flex-col items-center justify-between gap-3 py-4 sm:flex-row sm:py-0">
        <Skeleton className="h-4 w-52" />

        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="size-6 rounded-full" />
        </div>
      </Container>
    </footer>
  );
}
