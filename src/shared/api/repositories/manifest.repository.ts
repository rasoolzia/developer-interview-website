import "server-only";

import { apiClient } from "../client";
import { API } from "../constants";
import { ManifestSchema } from "../schemas";

export async function fetchManifest() {
  "use cache";

  return apiClient.get(API.MANIFEST, ManifestSchema);
}
