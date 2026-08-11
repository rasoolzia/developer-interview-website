import { topicRepository } from "@/shared/api/repositories";
import { mapQuestions, mapTopic } from "@/shared/mappers";

import { TopicDetails } from "../model";

export async function getTopicDetails(
  domain: string,
  topic: string,
  language: string,
): Promise<TopicDetails> {
  const topicData = await topicRepository.getTopic(domain, topic, language);

  return {
    topic: mapTopic(topicData),

    questions: mapQuestions(topicData),
  };
}
