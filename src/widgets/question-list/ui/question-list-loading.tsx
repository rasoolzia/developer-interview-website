import { QuestionCardSkeleton } from "@/entities/question/ui";

type Props = {
  count: number;
  showDate?: boolean;
};

export function QuestionListLoading({ count, showDate }: Props) {
  return (
    <QuestionCardSkeleton count={count < 1 ? 1 : count} showDate={showDate} />
  );
}
