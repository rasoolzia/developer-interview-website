import type { QuestionDetails } from "@/entities/question/model";

import type { QuestionNavigationHrefs } from "../../model/question-navigation.model";
import { QuestionSidebarContent } from "./question-sidebar-content";

type Props = QuestionDetails & {
  navigationHrefs?: QuestionNavigationHrefs;
  className?: string;
};

export function QuestionSidebar({
  question,
  navigation,
  navigationHrefs,
  className,
}: Props) {
  return (
    <aside className={className}>
      <div className="sticky top-20">
        <QuestionSidebarContent
          question={question}
          navigation={navigation}
          navigationHrefs={navigationHrefs}
        />
      </div>
    </aside>
  );
}
