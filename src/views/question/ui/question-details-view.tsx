import type { Question } from "@/entities/question/model";

import { QuestionActions } from "./question-actions";
import { QuestionContent } from "./question-content";
import { QuestionHeader } from "./question-header";

type Props = {
  question: Question;
};

export function QuestionDetailsView({ question }: Props) {
  return (
    <main>
      <QuestionHeader question={question} />

      <QuestionContent markdown={question.markdown} />

      <QuestionActions id={question.id} />
    </main>
  );
}
