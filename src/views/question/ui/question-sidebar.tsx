import type { QuestionDetails } from "@/entities/question/model";

import { QuestionSidebarContent } from "./question-sidebar-content";

type Props = QuestionDetails & {
  className?: string;
};

export function QuestionSidebar({ question, navigation, className }: Props) {
  return (
    <aside className={className}>
      <div className="sticky top-20">
        <QuestionSidebarContent question={question} navigation={navigation} />
      </div>
    </aside>
  );
}
