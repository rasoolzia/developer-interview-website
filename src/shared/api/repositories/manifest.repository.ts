import "server-only";

import { apiClient } from "../client";
import { ManifestSchema } from "../schemas";

export async function fetchManifest() {
  "use cache";

  return apiClient.get("manifest.json", ManifestSchema);
}
