import type { Topic } from "@/entities/topic/model";

export interface Domain {
  slug: string;
  label: string;
  topics: Topic[];
}
