import type { QuestionBase } from "@/shared/types";

export interface Question extends QuestionBase {
  markdown: string;
  tags?: string[];
}

export type QuestionNavigation = {
  previousSlug?: string;
  nextSlug?: string;
  progress: QuestionProgress;
};

export type QuestionProgress = {
  current: number;
  total: number;
};

export type QuestionDetails = {
  question: Question;
  navigation: QuestionNavigation;
};
