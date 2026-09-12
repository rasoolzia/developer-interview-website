import type { QuestionBase } from "@/shared/types";

export interface Question extends QuestionBase {
  markdown: string;
  tags?: string[];
}
