import { QuestionCardSkeleton } from "@/entities/question/ui";

type Props = {
  count: number;
};

export function QuestionListLoading({ count }: Props) {
  return <QuestionCardSkeleton count={count < 1 ? 1 : count} />;
}
