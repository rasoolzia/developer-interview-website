import { manifestRepository } from "@/shared/api/repositories";
import type { Manifest } from "@/shared/api/schemas";

export async function getManifest(): Promise<Manifest> {
  return manifestRepository.getManifest();
}
