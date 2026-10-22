import { ClockIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { Question } from "@/entities/question/model";
import { formatLabel } from "@/shared/lib";

import { QuestionActions } from "./question-actions";
import { QuestionNavigation } from "./question-navigation";

type Props = {
  question: Question;
  navigation: {
    previousSlug?: string;
    nextSlug?: string;
  };
  onNavigate?: () => void;
};

export function QuestionSidebarContent({
  question,
  navigation,
  onNavigate,
}: Props) {
  const t = useTranslations("question");

  return (
    <div className="space-y-6">
      <section className="rounded-xl border p-5">
        <h2 className="mb-4 text-sm font-semibold">{t("info")}</h2>

        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-muted-foreground mb-1">{t("topic")}</dt>

            <dd className="font-medium">{formatLabel(question.topic)}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground mb-1">{t("difficulty")}</dt>

            <dd className="font-medium">{question.difficulty}</dd>
          </div>

          {question.categories.length > 0 && (
            <div>
              <dt className="text-muted-foreground mb-1">{t("categories")}</dt>

              <dd className="flex flex-wrap gap-1.5">
                {question.categories.map((category) => (
                  <span
                    key={category}
                    className="bg-muted rounded-md px-2 py-1 text-xs"
                  >
                    {category}
                  </span>
                ))}
              </dd>
            </div>
          )}

          <div>
            <dt className="text-muted-foreground mb-1">
              {t("readingTimeLabel")}
            </dt>

            <dd className="flex items-center gap-1.5 font-medium">
              <ClockIcon className="size-3.5" />
              {t("readingTime", {
                minutes: question.readingTime,
              })}
            </dd>
          </div>
        </dl>
      </section>

      <QuestionActions id={question.id} />

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
