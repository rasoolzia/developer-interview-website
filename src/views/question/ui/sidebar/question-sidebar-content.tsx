import type { QuestionDetails } from "@/entities/question/model";

import type { QuestionNavigationHrefs } from "../../model/question-navigation.model";
import { QuestionNavigation } from "../navigation/question-navigation";
import { QuestionProgress } from "../navigation/question-progress";
import { QuestionActions } from "../question-actions";
import { QuestionInfo } from "../question-info";

type Props = Pick<QuestionDetails, "question" | "topic" | "navigation"> & {
  navigationHrefs: QuestionNavigationHrefs;
  onNavigate?: () => void;
};

export function QuestionSidebarContent({
  question,
  topic,
  navigation,
  navigationHrefs,
  onNavigate,
}: Props) {
  return (
    <div className="space-y-6">
      <QuestionInfo question={question} topic={topic} />

      <QuestionProgress
        className="hidden lg:block"
        progress={navigation.progress}
      />

      <QuestionActions questionId={question.id} />

      <QuestionNavigation
        className="hidden lg:flex"
        navigationHrefs={navigationHrefs}
        onNavigate={onNavigate}
      />
    </div>
  );
}
