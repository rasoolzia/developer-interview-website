import "server-only";

import type { ApiTopic } from "@/shared/types";

import { apiClient } from "../client";
import { TopicSchema } from "../schemas";

export async function fetchTopic(
  domain: string,
  topic: string,
  language: string,
): Promise<ApiTopic> {
  "use cache";

  return apiClient.get(`${domain}/${topic}/${language}.json`, TopicSchema);
}
