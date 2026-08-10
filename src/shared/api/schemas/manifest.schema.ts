import { z } from "zod";

import { LanguageSchema } from "./common.schema";

export const ManifestSchema = z.object({
  generatorVersion: z.string(),

  schemaVersion: z.string(),

  generatedAt: z.string(),

  languages: z.array(LanguageSchema),

  domains: z.record(
    z.string(),

    z.object({
      label: z.string(),

      topics: z.record(
        z.string(),

        z.object({
          label: z.string(),

          languages: z.record(
            z.string(),

            z.object({
              path: z.string(),
              total: z.number(),
              hash: z.string(),
            }),
          ),
        }),
      ),
    }),
  ),
});

export type Manifest = z.infer<typeof ManifestSchema>;
