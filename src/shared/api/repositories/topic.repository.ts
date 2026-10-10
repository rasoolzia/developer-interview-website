import "server-only";

import type { ApiTopic, Language } from "@/shared/types";

import { apiClient } from "../client";
import { API } from "../constants";
import { TopicSchema } from "../schemas";

export async function fetchTopic(
  domain: string,
  topic: string,
  language: Language,
): Promise<ApiTopic> {
  "use cache";

  return apiClient.get(API.TOPIC(domain, topic, language), TopicSchema);
}
