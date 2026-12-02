import { QuestionListLoading } from "@/widgets/question-list";

export function ReportLoading() {
  return (
    <div className="space-y-6">
      <div className="bg-muted h-9 w-56 animate-pulse rounded-md" />
      <QuestionListLoading count={5} />
    </div>
  );
}
