import type { Question, QuestionDetails } from "@/entities/question/model";
import { getSearchQuestionsByIds } from "@/entities/search/api";
import type { SearchItem } from "@/entities/search/model";
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

export async function getQuestionById(
  language: Language,
  questionId: string,
  base?: SearchItem,
): Promise<Question | undefined> {
  const resolvedBase =
    base ?? (await getSearchQuestionsByIds([questionId], language))[0];
  if (!resolvedBase) {
    return undefined;
  }

  const questions = await getQuestions(
    resolvedBase.domain,
    resolvedBase.topic,
    language,
  );
  return questions.find((item) => item.id === questionId);
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
    domain,
    topic,
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
