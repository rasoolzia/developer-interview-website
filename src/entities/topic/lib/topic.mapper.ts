import type { TopicDetails } from "@/entities/topic/model";
import { mapQuestions } from "@/shared/mappers";
import type { ApiTopic, Language } from "@/shared/types";

export function mapTopicDetails(
  api: ApiTopic,
  language: Language,
): TopicDetails {
  return {
    version: api.version,
    meta: api.meta,
    content: api.content,
    questions: mapQuestions(api.questions, language),
  };
}
