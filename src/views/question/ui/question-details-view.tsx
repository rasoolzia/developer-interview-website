import type { QuestionDetails } from "@/entities/question/model";

import { QuestionContent } from "./content/question-content";
import { QuestionHeader } from "./navigation/question-header";
import { QuestionNavigation } from "./navigation/question-navigation";
import { QuestionProgress } from "./navigation/question-progress";
import { QuestionSidebar } from "./sidebar/question-sidebar";
import { QuestionSidebarSheet } from "./sidebar/question-sidebar-sheet";

export function QuestionDetailsView({ question, navigation }: QuestionDetails) {
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

        <QuestionProgress
          className="mt-10 lg:hidden"
          progress={navigation.progress}
        />

        <QuestionNavigation
          className="mt-10 lg:hidden"
          question={question}
          previousSlug={navigation.previousSlug}
          nextSlug={navigation.nextSlug}
        />
      </article>

      <QuestionSidebar
        className="hidden w-72 shrink-0 lg:block"
        question={question}
        navigation={navigation}
      />
    </main>
  );
}
