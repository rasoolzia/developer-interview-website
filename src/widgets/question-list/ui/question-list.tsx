import { toQuestionCard } from "@/entities/question/lib";
import { QuestionCard } from "@/entities/question/ui";
import type { QuestionBase } from "@/shared/types";

type Props = {
  questions: QuestionBase[];
};

export function QuestionList({ questions }: Props) {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard key={question.id} item={toQuestionCard(question)} />
      ))}
    </div>
  );
}
