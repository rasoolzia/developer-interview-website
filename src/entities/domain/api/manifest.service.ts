import { fetchManifest } from "@/shared/api/repositories";
import { mapManifestToDomains } from "@/shared/mappers";

import type { Domain } from "../model";

export async function getManifest(): Promise<Domain[]> {
  const manifest = await fetchManifest();

  return mapManifestToDomains(manifest);
}
