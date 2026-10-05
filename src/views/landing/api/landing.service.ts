import { fetchManifest } from "@/shared/api/repositories";

import { mapLandingStats } from "../lib";
import type { LandingStats } from "../model";

export async function getLandingStats(): Promise<LandingStats> {
  const manifest = await fetchManifest();

  return mapLandingStats(manifest);
}
