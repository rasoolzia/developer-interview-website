import type { QuestionBase } from "@/shared/types";

export interface QuestionCardItem extends Omit<
  QuestionBase,
  "slug" | "domain"
> {
  href: string;
}
