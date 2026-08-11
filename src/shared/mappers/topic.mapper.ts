import type { Question } from "@/entities/question/model";
import type { Topic } from "@/entities/topic/model";
import type { Topic as ApiTopic } from "@/shared/api/schemas";

export function mapTopic(api: ApiTopic): Topic {
  return {
    domain: api.meta.domain,

    slug: api.meta.topic,

    label: api.meta.label,

    languages: {
      [api.meta.language]: {
        total: api.stats.total,

        hash: api.hash,
      },
    },
  };
}

export function mapQuestions(api: ApiTopic): Question[] {
  return api.questions.map((question) => ({
    id: question.id,

    slug: question.slug,

    title: question.title,

    difficulty: question.difficulty,

    categories: question.categories,

    domain: question.domain,

    topic: question.topic,

    language: question.language,

    markdown: question.answer.markdown,

    readingTime: question.answer.readingTime,

    tags: question.tags,
  }));
}
