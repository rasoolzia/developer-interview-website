import type { ApiTopic } from "@/shared/types";

import { cacheKeys, CacheManager } from "../cache";
import { apiClient } from "../client";

export class TopicRepository {
  async getTopic(
    domain: string,
    topic: string,
    language: string,
    hash?: string,
  ): Promise<ApiTopic> {
    const key = cacheKeys.topic(domain, topic, language);

    if (hash) {
      const cached = CacheManager.get<ApiTopic>(key, hash);

      if (cached) {
        return cached;
      }
    }

    const data = await apiClient.get<ApiTopic>(
      `${domain}/${topic}/${language}.json`,
    );

    CacheManager.set(key, data.hash, data);

    return data;
  }
}

export const topicRepository = new TopicRepository();
