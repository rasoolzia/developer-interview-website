import type { Manifest } from "@/shared/types";

import { cacheKeys, CacheManager } from "../cache";
import { apiClient } from "../client";

export class ManifestRepository {
  async getManifest(): Promise<Manifest> {
    const manifest = await apiClient.get<Manifest>("manifest.json");

    const cached = CacheManager.get<Manifest>(
      cacheKeys.manifest(),
      manifest.generatedAt,
    );

    if (cached) {
      return cached;
    }

    CacheManager.set(cacheKeys.manifest(), manifest.generatedAt, manifest);

    return manifest;
  }
}

export const manifestRepository = new ManifestRepository();
