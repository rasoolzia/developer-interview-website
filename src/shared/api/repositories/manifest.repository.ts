import { apiClient } from "../client";
import { ManifestSchema } from "../schemas";

export class ManifestRepository {
  async getManifest() {
    return apiClient.get("manifest.json", ManifestSchema);
  }
}

export const manifestRepository = new ManifestRepository();
