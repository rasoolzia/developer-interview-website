import type { QuestionDetails } from "@/entities/question/model";

import { QuestionNavigation } from "../navigation/question-navigation";
import { QuestionProgress } from "../navigation/question-progress";
import { QuestionActions } from "../question-actions";
import { QuestionInfo } from "../question-info";

type Props = QuestionDetails & {
  onNavigate?: () => void;
};

export function QuestionSidebarContent({
  question,
  navigation,
  onNavigate,
}: Props) {
  return (
    <div className="space-y-6">
      <QuestionInfo question={question} />

      <QuestionProgress
        className="hidden lg:block"
        progress={navigation.progress}
      />

      <QuestionActions questionId={question.id} />

      <QuestionNavigation
        className="hidden lg:flex"
        question={question}
        previousSlug={navigation.previousSlug}
        nextSlug={navigation.nextSlug}
        onNavigate={onNavigate}
      />
    </div>
  );
}
