import type { ApiManifest } from "@/shared/types";

import type { LandingViewModel } from "../model";

export function mapLanding(manifest: ApiManifest): LandingViewModel {
  const domains = Object.entries(manifest.domains);

  const topics = domains.reduce(
    (count, [, domain]) => count + Object.keys(domain.topics).length,
    0,
  );

  const questions = domains.reduce(
    (count, [, domain]) =>
      count +
      Object.values(domain.topics).reduce(
        (topicCount, topic) =>
          topicCount +
          Object.values(topic.languages).reduce(
            (sum, language) => sum + language.total,
            0,
          ),
        0,
      ),
    0,
  );

  return {
    stats: {
      questions,
      topics,
      domains: domains.length,
      languages: manifest.languages.length,
    },

    domains: domains.map(([slug, domain]) => ({
      slug,

      label: domain.label,

      topics: Object.keys(domain.topics).length,
    })),
  };
}
