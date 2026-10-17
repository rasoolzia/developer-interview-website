import type { Question } from "@/entities/question/model";

import { QuestionContent } from "./question-content";
import { QuestionHeader } from "./question-header";
import { QuestionSidebar } from "./question-sidebar";
import { QuestionSidebarSheet } from "./question-sidebar-sheet";

type Props = {
  question: Question;
  navigation: {
    previousSlug?: string;
    nextSlug?: string;
  };
};

export function QuestionDetailsView({ question, navigation }: Props) {
  return (
    <main className="mx-auto max-w-7xl lg:flex lg:gap-10 lg:px-6">
      <QuestionSidebarSheet
        className="mb-6 lg:hidden"
        question={question}
        navigation={navigation}
      />

      <article className="min-w-0 flex-1 lg:max-w-4xl">
        <QuestionHeader className="mb-10" question={question} />
        <QuestionContent markdown={question.markdown} />
      </article>

      <QuestionSidebar
        className="hidden w-72 shrink-0 lg:block"
        question={question}
        navigation={navigation}
      />
    </main>
  );
}
