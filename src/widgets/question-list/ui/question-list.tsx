import { QuestionCard } from "@/entities/question/ui";
import type { QuestionBase } from "@/shared/types";

type Props = {
  questions: QuestionBase[];
  getAction?: (question: QuestionBase) => React.ReactNode;
};

export function QuestionList({ questions, getAction }: Props) {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          action={getAction?.(question)}
        />
      ))}
    </div>
  );
}
