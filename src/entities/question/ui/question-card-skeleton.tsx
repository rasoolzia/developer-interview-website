import { Skeleton } from "@/shared/ui/shadcn";

type Props = {
  count?: number;
  showDate?: boolean;
};

export function QuestionCardSkeleton({ count = 1, showDate = false }: Props) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-xl border p-5">
          <div className="flex gap-1.5">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>

          <Skeleton className="h-6 w-full max-w-md" />

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <div className="flex items-center gap-1.5">
              <Skeleton className="size-3.5 rounded-full" />
              <Skeleton className="h-4 w-15" />
            </div>
            {showDate && (
              <span className="inline-flex items-center gap-1.5">
                <Skeleton className="size-3.5 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
