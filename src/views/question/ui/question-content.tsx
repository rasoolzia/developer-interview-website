type Props = {
  markdown: string;
};

export function QuestionContent({ markdown }: Props) {
  return <div className="question-markdown">{markdown}</div>;
}
