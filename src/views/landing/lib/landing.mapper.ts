import type { ApiManifest, Language } from "@/shared/types";

import type { LandingStats } from "../model";

export function mapLandingStats(manifest: ApiManifest): LandingStats {
  const domains = Object.values(manifest.domains);

  const topics = domains.reduce(
    (total, domain) => total + Object.keys(domain.topics).length,
    0,
  );

  const questions: Partial<Record<Language, number>> = {};

  for (const language of manifest.languages) {
    questions[language] = domains.reduce(
      (total, domain) =>
        total +
        Object.values(domain.topics).reduce(
          (topicTotal, topic) =>
            topicTotal + (topic.languages[language]?.total ?? 0),
          0,
        ),
      0,
    );
  }

  return {
    questions,
    topics,
    domains: domains.length,
    languages: manifest.languages.length,
  };
}
