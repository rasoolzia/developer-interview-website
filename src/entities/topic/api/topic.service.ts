import { apiClient } from "@/shared/api/client";
import { GeneratedTopic } from "@/shared/types/api.types";

export async function getTopic(
  domain: string,
  topic: string,
  language: string,
): Promise<GeneratedTopic> {
  const path = `/${domain}/${topic}/${language}.json`;

  return apiClient.get<GeneratedTopic>(path);
}
