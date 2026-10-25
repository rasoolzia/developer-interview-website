import type { Question, QuestionDetails } from "@/entities/question/model";
import { getTopicDetails } from "@/entities/topic/api";
import type { Language } from "@/shared/types";

export async function getQuestions(
  domain: string,
  topic: string,
  language: Language,
): Promise<Question[]> {
  const data = await getTopicDetails(domain, topic, language);

  return data.questions;
}

export async function getQuestionDetails(
  domain: string,
  topic: string,
  language: Language,
  slug: string,
): Promise<QuestionDetails | undefined> {
  const questions = await getQuestions(domain, topic, language);

  const index = questions.findIndex((question) => question.slug === slug);

  if (index === -1) {
    return undefined;
  }

  return {
    question: questions[index],
    navigation: {
      previousSlug: questions[index - 1]?.slug,
      nextSlug: questions[index + 1]?.slug,
      progress: {
        current: index + 1,
        total: questions.length,
      },
    },
  };
}
