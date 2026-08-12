import type { ApiManifest } from "@/shared/types";

import { cacheKeys, CacheManager } from "../cache";
import { apiClient } from "../client";

export class ManifestRepository {
  async getManifest(): Promise<ApiManifest> {
    const manifest = await apiClient.get<ApiManifest>("manifest.json");

    const cached = CacheManager.get<ApiManifest>(
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
