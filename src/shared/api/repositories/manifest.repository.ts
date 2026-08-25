import type { ApiManifest } from "@/shared/types";

import { apiClient } from "../client";

export class ManifestRepository {
  async getManifest(): Promise<ApiManifest> {
    return apiClient.get<ApiManifest>("manifest.json");
  }
}

export const manifestRepository = new ManifestRepository();
