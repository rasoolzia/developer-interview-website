import type { Domain } from "@/entities/domain/model";
import type { Manifest } from "@/shared/api/schemas";

export function mapManifestToDomains(manifest: Manifest): Domain[] {
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
