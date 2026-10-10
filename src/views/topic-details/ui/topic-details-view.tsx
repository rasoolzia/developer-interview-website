import { useTranslations } from "next-intl";

import type { TopicDetails } from "@/entities/topic/model";
import { ROUTES } from "@/shared/config";
import { Link } from "@/shared/config/i18n";
import { QuestionList } from "@/widgets/question-list";

type Props = {
  data: TopicDetails;
};

export function TopicDetailsView({ data }: Props) {
  const t = useTranslations("topic");

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-2">
          <Link
            href={ROUTES.domain(data.topic.domain)}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            ← {t("backToDomain")}
          </Link>
        </div>

        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {data.topic.label}
        </h1>

        <p className="text-muted-foreground mt-2">
          {t("questionsCount", { count: data.questions.length })}
        </p>
      </div>

      {data.questions.length > 0 ? (
        <QuestionList questions={data.questions} />
      ) : (
        <div className="bg-muted/40 rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">{t("noQuestions")}</p>
        </div>
      )}
    </div>
  );
}
