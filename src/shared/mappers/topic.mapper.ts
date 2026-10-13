import type { Question } from "@/entities/question/model";
import type { TopicDetails } from "@/entities/topic/model";
import type { ApiTopic } from "@/shared/types";

export function mapTopicDetails(api: ApiTopic): TopicDetails {
  return {
    version: api.version,
    meta: api.meta,
    content: api.content,
    stats: api.stats,
    questions: mapQuestions(api),
  };
}

function mapQuestions(api: ApiTopic): Question[] {
  return api.questions.map((question) => ({
    ...question,
    id: `${question.id}-${question.language}`,
  }));
}
