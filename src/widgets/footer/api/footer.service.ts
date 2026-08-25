import { cachedRequest, cacheKeys } from "@/shared/api/cache";
import { manifestRepository } from "@/shared/api/repositories";

import type { FooterModel } from "../model";

export async function getFooter(): Promise<FooterModel> {
  const manifest = await cachedRequest(cacheKeys.manifest(), () =>
    manifestRepository.getManifest(),
  );

  return {
    version: manifest.generatorVersion,
    generatedAt: manifest.generatedAt,
  };
}
