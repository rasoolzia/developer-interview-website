import type { QuestionBase } from "@/shared/types";

export interface Question extends QuestionBase {
  markdown: string;
  tags?: string[];
}

export type QuestionNavigation = {
  previousSlug?: string;
  nextSlug?: string;
  previousQuestionId?: string;
  nextQuestionId?: string;
  progress: QuestionProgress;
};

export type QuestionDetailsHeader = {
  backHref: string;
  backPage: string;
};

export type QuestionProgress = {
  current: number;
  total: number;
};

export type QuestionDetails = {
  question: Question;
  navigation: QuestionNavigation;
  header?: QuestionDetailsHeader;
};
