import { cachedRequest, cacheKeys } from "@/shared/api/cache";
import { manifestRepository } from "@/shared/api/repositories";

import { mapLanding } from "../lib";
import type { LandingViewModel } from "../model";

export async function getLanding(): Promise<LandingViewModel> {
  const manifest = await cachedRequest(cacheKeys.manifest(), () =>
    manifestRepository.getManifest(),
  );

  return mapLanding(manifest);
}
