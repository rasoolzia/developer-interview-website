import type { Question } from "@/entities/question/model";

type Props = {
  question: Question;
};

export function QuestionHeader({ question }: Props) {
  return <div>{question.title}</div>;
}
