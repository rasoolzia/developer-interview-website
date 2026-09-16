import type { Domain } from "@/entities/domain/model";
import type { ApiManifest } from "@/shared/types";

export function mapManifestToDomains(manifest: ApiManifest): Domain[] {
  return Object.entries(manifest.domains).map(([slug, domain]) => ({
    slug,
    label: domain.label,
    topics: Object.entries(domain.topics).map(([topicSlug, topic]) => ({
      slug: topicSlug,
      label: topic.label,
      languages: topic.languages,
    })),
  }));
}
