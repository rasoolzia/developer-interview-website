import type { QuestionDetails } from "@/entities/question/model";
import { ROUTES } from "@/shared/config";
import { formatLabel } from "@/shared/lib";

import type { QuestionNavigationHrefs } from "../model/question-navigation.model";
import { QuestionContent } from "./content/question-content";
import { QuestionHeader } from "./navigation/question-header";
import { QuestionNavigation } from "./navigation/question-navigation";
import { QuestionProgress } from "./navigation/question-progress";
import { QuestionSidebar } from "./sidebar/question-sidebar";
import { QuestionSidebarSheet } from "./sidebar/question-sidebar-sheet";

type Props = QuestionDetails & {
  navigationHrefs?: QuestionNavigationHrefs;
};

export function QuestionDetailsView({
  question,
  domain,
  topic,
  navigation,
  header,
  navigationHrefs,
}: Props) {
  const resolvedHeader = {
    backHref: header?.backHref ?? ROUTES.topic(domain, topic),
    backPage: header?.backPage ?? formatLabel(topic),
  };

  const resolvedNavigationHrefs: QuestionNavigationHrefs = {
    previous:
      navigationHrefs?.previous ??
      (navigation.previousSlug
        ? ROUTES.question(domain, topic, navigation.previousSlug)
        : undefined),

    next:
      navigationHrefs?.next ??
      (navigation.nextSlug
        ? ROUTES.question(domain, topic, navigation.nextSlug)
        : undefined),
  };

  return (
    <main className="mx-auto max-w-7xl lg:flex lg:gap-10 lg:px-6">
      <QuestionSidebarSheet
        className="mb-6 lg:hidden"
        question={question}
        topic={topic}
        navigation={navigation}
        navigationHrefs={resolvedNavigationHrefs}
      />

      <article className="min-w-0 flex-1 lg:max-w-4xl">
        <QuestionHeader
          className="mb-10"
          questionTitle={question.title}
          {...resolvedHeader}
        />

        <QuestionContent markdown={question.markdown} />

        <QuestionProgress
          className="mt-10 lg:hidden"
          progress={navigation.progress}
        />

        <QuestionNavigation
          className="mt-10 lg:hidden"
          navigationHrefs={resolvedNavigationHrefs}
        />
      </article>

      <QuestionSidebar
        className="hidden w-72 shrink-0 lg:block"
        question={question}
        topic={topic}
        navigation={navigation}
        navigationHrefs={resolvedNavigationHrefs}
      />
    </main>
  );
}
