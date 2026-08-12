import type { Question } from "@/entities/question/model";
import type { Language } from "@/shared/types";

export interface Topic {
  domain: string;

  slug: string;

  label: string;

  languages: Partial<
    Record<
      Language,
      {
        total: number;

        hash: string;
      }
    >
  >;
}

export interface TopicDetails {
  topic: Topic;

  questions: Question[];
}
