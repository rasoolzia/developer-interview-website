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

export interface TopicMeta {
  domain: string;
  topic: string;
  language: Language;
  label: string;
}

export interface TopicStats {
  total: number;
  byDifficulty: Record<string, number>;
}

export interface TopicContent {
  title: string;
  categories: string[];
  difficulties: string[];
}

export interface TopicDetails {
  version: number;
  meta: TopicMeta;
  content: TopicContent;
  stats: TopicStats;
  questions: Question[];
}
