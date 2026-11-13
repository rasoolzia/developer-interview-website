import type { TopicDetails } from "@/entities/topic/model";
import { mapQuestions } from "@/shared/mappers";
import type { ApiTopic } from "@/shared/types";

export function mapTopicDetails(api: ApiTopic): TopicDetails {
  return {
    version: api.version,
    meta: api.meta,
    content: api.content,
    questions: mapQuestions(api.questions),
  };
}
