import { getTopic } from "@/entities/topic/api";
import { GeneratedQuestion } from "@/shared/types/api.types";

export async function getQuestions(
  domain: string,
  topic: string,
  language: string,
): Promise<GeneratedQuestion[]> {
  const data = await getTopic(domain, topic, language);

  return data.questions;
}

export async function getQuestionBySlug(
  domain: string,
  topic: string,
  language: string,
  slug: string,
): Promise<GeneratedQuestion | undefined> {
  const questions = await getQuestions(domain, topic, language);

  return questions.find((question) => question.slug === slug);
}
