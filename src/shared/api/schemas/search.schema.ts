import { z } from "zod";

import { QuestionBaseSchema } from "./common.schema";

export const SearchItemSchema = QuestionBaseSchema.extend({
  domain: z.string(),
  topic: z.string(),
});

export const SearchIndexSchema = z.array(SearchItemSchema);
