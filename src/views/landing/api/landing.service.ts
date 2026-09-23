import { fetchManifest } from "@/shared/api/repositories";

import { mapLanding } from "../lib";
import type { LandingViewModel } from "../model";

export async function getLanding(): Promise<LandingViewModel> {
  const manifest = await fetchManifest();

  return mapLanding(manifest);
}
