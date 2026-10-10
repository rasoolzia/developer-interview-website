import type { Question } from "@/entities/question/model";
import { getTopicDetails } from "@/entities/topic/api";
import { Language } from "@/shared/types";

export async function getQuestions(
  domain: string,
  topic: string,
  language: Language,
): Promise<Question[]> {
  const data = await getTopicDetails(domain, topic, language);

  return data.questions;
}

export async function getQuestionBySlug(
  domain: string,
  topic: string,
  language: Language,
  slug: string,
): Promise<Question | undefined> {
  const questions = await getQuestions(domain, topic, language);

  return questions.find((question) => question.slug === slug);
}
