import { Skeleton } from "@/shared/ui/shadcn";
import { QuestionListLoading } from "@/widgets/question-list";

export function BookmarkLoading({ detail = false }: { detail?: boolean }) {
  if (detail) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <QuestionListLoading count={5} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-40" />
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-24 w-full rounded-xl" />
      ))}
    </div>
  );
}
