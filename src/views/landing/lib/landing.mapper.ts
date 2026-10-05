import { Locale } from "@/shared/config/i18n";
import type { ApiManifest } from "@/shared/types";

import type { LandingStats } from "../model";

export function mapLandingStats(manifest: ApiManifest): LandingStats {
  const domains = Object.values(manifest.domains);

  const topics = domains.reduce(
    (total, domain) => total + Object.keys(domain.topics).length,
    0,
  );

  const questions = Object.fromEntries(
    manifest.languages.map((language) => [
      language,
      domains.reduce(
        (total, domain) =>
          total +
          Object.values(domain.topics).reduce(
            (topicTotal, topic) =>
              topicTotal + (topic.languages[language]?.total ?? 0),
            0,
          ),
        0,
      ),
    ]),
  ) as Record<Locale, number>;

  return {
    questions,
    topics,
    domains: domains.length,
    languages: manifest.languages.length,
  };
}
