import { z } from "zod";

import { QuestionBaseSchema } from "./common.schema";

export const SearchItemSchema = QuestionBaseSchema;

export const SearchIndexSchema = z.array(SearchItemSchema);
