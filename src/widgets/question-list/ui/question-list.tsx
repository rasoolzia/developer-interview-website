import { QuestionCard } from "@/entities/question/ui";
import type { SearchItem } from "@/entities/search/model";
import type { QuestionBase } from "@/shared/types";

type QuestionDate = {
  timestamp: number;
  message: string;
};

type Props<T extends QuestionBase> = {
  questions: T[];
  domain?: string;
  topic?: string;
  getHref?: (question: T) => string;
  getAction?: (question: T) => React.ReactNode;
  getDate?: (question: T) => QuestionDate | undefined;
};

function isSearchItem(question: QuestionBase): question is SearchItem {
  return "domain" in question && "topic" in question;
}

export function QuestionList<T extends QuestionBase>({
  questions,
  domain = "",
  topic = "",
  getHref,
  getAction,
  getDate,
}: Props<T>) {
  return (
    <div className="space-y-4">
      {questions.map((question) => {
        const questionDomain = isSearchItem(question)
          ? question.domain
          : domain;

        const questionTopic = isSearchItem(question) ? question.topic : topic;

        return (
          <QuestionCard
            key={question.id}
            question={question}
            domain={questionDomain}
            topic={questionTopic}
            href={getHref?.(question)}
            action={getAction?.(question)}
            date={getDate?.(question)}
          />
        );
      })}
    </div>
  );
}
