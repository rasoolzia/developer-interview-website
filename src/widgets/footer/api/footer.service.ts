import { fetchManifest } from "@/shared/api/repositories";

import type { FooterModel } from "../model";

export async function getFooter(): Promise<FooterModel> {
  const manifest = await fetchManifest();

  return {
    version: manifest.generatorVersion,
    generatedAt: manifest.generatedAt,
  };
}
