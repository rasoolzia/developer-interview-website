import { ROUTES } from "@/shared/config";
import type { QuestionBase } from "@/shared/types";

import type { QuestionCardItem } from "../model";

export function toQuestionCard(item: QuestionBase): QuestionCardItem {
  return {
    id: item.id,
    title: item.title,
    href: ROUTES.question(item.language, item.domain, item.topic, item.slug),
    topic: item.topic,
    difficulty: item.difficulty,
    categories: item.categories,
    language: item.language,
    readingTime: item.readingTime,
  };
}
