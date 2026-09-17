import { z } from "zod";

import { QuestionBaseSchema } from "./common.schema";

export const QuestionSchema = QuestionBaseSchema.extend({
  markdown: z.string(),
  tags: z.array(z.string()).optional(),
});
