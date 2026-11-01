import { z } from "zod";

import { QuestionBaseSchema } from "./common.schema";

export const SearchIndexSchema = z.array(QuestionBaseSchema);
