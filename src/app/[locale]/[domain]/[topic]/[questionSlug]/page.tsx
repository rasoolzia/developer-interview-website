import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import { getQuestionDetails, getQuestions } from "@/entities/question/api";
import { ROUTES } from "@/shared/config";
import { LOCALE_CODES, redirect } from "@/shared/config/i18n";
import { decodeUrlParam, parseLanguage } from "@/shared/lib";
import { QuestionDetailsView } from "@/views/question";

type Props = {
  params: Promise<{
    locale: string;
    domain: string;
    topic: string;
    questionSlug: string;
  }>;
};

function getBaseQuestionId(id: string) {
  return id.slice(0, id.lastIndexOf("-"));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ domain, topic, questionSlug }, locale] = await Promise.all([
    params,
    getLocale(),
  ]);

  const decodedQuestionSlug = decodeUrlParam(questionSlug);

  const questionDetails = await getQuestionDetails(
    domain,
    topic,
    parseLanguage(locale),
    decodedQuestionSlug,
  );

  const question = questionDetails?.question;

  if (!question) {
    return {
      title: "Not Found",
    };
  }

  const description = question.markdown
    .replace(/[`*_#>-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

  return {
    title: question.title,
    description,
  };
}

export default async function QuestionPage({ params }: Props) {
  const [{ domain, topic, questionSlug }, locale] = await Promise.all([
    params,
    getLocale(),
  ]);

  const decodedQuestionSlug = decodeUrlParam(questionSlug);

  const questionDetails = await getQuestionDetails(
    domain,
    topic,
    parseLanguage(locale),
    decodedQuestionSlug,
  );

  if (!questionDetails) {
    const sourceQuestionLists = await Promise.all(
      LOCALE_CODES.filter((code) => code !== locale).map((code) =>
        getQuestions(domain, topic, parseLanguage(code)),
      ),
    );
    const sourceQuestion = sourceQuestionLists
      .flat()
      .find((question) => question.slug === decodedQuestionSlug);

    if (sourceQuestion) {
      const translatedQuestions = await getQuestions(
        domain,
        topic,
        parseLanguage(locale),
      );
      const sourceQuestionId = getBaseQuestionId(sourceQuestion.id);
      const translatedQuestion = translatedQuestions.find(
        (question) => getBaseQuestionId(question.id) === sourceQuestionId,
      );

      if (translatedQuestion) {
        redirect({
          href: ROUTES.question(domain, topic, translatedQuestion.slug),
          locale,
        });
      }
    }

    notFound();
  }

  return <QuestionDetailsView {...questionDetails} />;
}
