import { QuestionListLoading } from "@/widgets/question-list";

export function ReportLoading() {
  return (
    <div className="space-y-6 py-6 sm:py-8">
      <div className="bg-muted h-8 w-56 animate-pulse rounded-md" />
      <QuestionListLoading count={5} />
    </div>
  );
}
