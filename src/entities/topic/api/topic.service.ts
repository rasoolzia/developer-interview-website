import { fetchTopic } from "@/shared/api/repositories";
import { mapQuestions, mapTopic } from "@/shared/mappers";

import type { TopicDetails } from "../model";

export async function getTopicDetails(
  domain: string,
  topic: string,
  language: string,
): Promise<TopicDetails> {
  const topicData = await fetchTopic(domain, topic, language);

  return {
    topic: mapTopic(topicData),

    questions: mapQuestions(topicData),
  };
}
