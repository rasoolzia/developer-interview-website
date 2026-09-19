import type { ApiTopic } from "@/shared/types";

import { apiClient } from "../client";
import { TopicSchema } from "../schemas";

export class TopicRepository {
  async getTopic(
    domain: string,
    topic: string,
    language: string,
  ): Promise<ApiTopic> {
    return apiClient.get(
      `${domain}/${topic}/${language}.json`,
      TopicSchema,
    );
  }
}

export const topicRepository = new TopicRepository();
