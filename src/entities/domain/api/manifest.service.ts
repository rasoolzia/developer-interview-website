import { apiClient } from "@/shared/api/client";
import { Manifest } from "@/shared/types/api.types";

const MANIFEST_PATH = "/manifest.json";

export async function getManifest(): Promise<Manifest> {
  return apiClient.get<Manifest>(MANIFEST_PATH);
}
