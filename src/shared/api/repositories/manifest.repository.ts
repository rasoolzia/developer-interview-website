import "server-only";

import type { ApiManifest } from "@/shared/types";

import { apiClient } from "../client";
import { API } from "../constants";
import { ManifestSchema } from "../schemas";

export async function fetchManifest(): Promise<ApiManifest> {
  "use cache";

  return apiClient.get<ApiManifest>(API.MANIFEST, ManifestSchema);
}
