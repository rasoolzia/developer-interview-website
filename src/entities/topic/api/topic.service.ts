import { fetchTopic } from "@/shared/api/repositories";
import { mapTopicDetails } from "@/shared/mappers";
import type { Language } from "@/shared/types";

import type { TopicDetails } from "../model";

export async function getTopicDetails(
  domain: string,
  topic: string,
  language: Language,
): Promise<TopicDetails> {
  const topicData = await fetchTopic(domain, topic, language);
  return mapTopicDetails(topicData);
}
