import { QuestionCard } from "@/entities/question/ui";
import type { QuestionBase } from "@/shared/types";

type QuestionDate = {
  timestamp: number;
  message: string;
};

type Props<T extends QuestionBase = QuestionBase> = {
  questions: T[];
  getHref?: (question: T) => string;
  getAction?: (question: T) => React.ReactNode;
  getDate?: (question: T) => QuestionDate | undefined;
};

export function QuestionList<T extends QuestionBase>({
  questions,
  getHref,
  getAction,
  getDate,
}: Props<T>) {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          href={getHref?.(question)}
          action={getAction?.(question)}
          date={getDate?.(question)}
        />
      ))}
    </div>
  );
}
