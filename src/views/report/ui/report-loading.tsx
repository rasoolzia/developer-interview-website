import { Skeleton } from "@/shared/ui/shadcn";
import { QuestionListLoading } from "@/widgets/question-list";

export function ReportLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-56 sm:h-9 sm:w-68" />
        <Skeleton className="h-8 w-16" />
      </div>
      <QuestionListLoading count={5} />
    </div>
  );
}
