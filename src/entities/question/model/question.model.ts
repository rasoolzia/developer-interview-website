import type { Question } from "@/shared/types";

export type { Question };

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
  domain: string;
  topic: string;
  navigation: QuestionNavigation;
  header?: QuestionDetailsHeader;
};
