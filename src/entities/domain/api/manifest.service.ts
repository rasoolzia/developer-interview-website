import { cachedRequest, cacheKeys } from "@/shared/api/cache";
import { manifestRepository } from "@/shared/api/repositories";
import { mapManifestToDomains } from "@/shared/mappers";

import type { Domain } from "../model";

export async function getManifest(): Promise<Domain[]> {
  const manifest = await cachedRequest(cacheKeys.manifest(), () =>
    manifestRepository.getManifest(),
  );

  return mapManifestToDomains(manifest);
}
