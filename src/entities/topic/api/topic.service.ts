import { topicRepository } from "@/shared/api/repositories";
import type { Topic } from "@/shared/api/schemas";

export async function getTopic(
  domain: string,
  topic: string,
  language: string,
): Promise<Topic> {
  return topicRepository.getTopic(domain, topic, language);
}
