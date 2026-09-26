import { Suspense } from "react";

import { CTASection } from "./sections/cta";
import { DomainsSection } from "./sections/domains";
import { DomainsSectionSkeleton } from "./sections/domains/domains-section-skeleton";
import { HeroSection } from "./sections/hero";
import { OpenSourceSection } from "./sections/open-source";
import { SearchSection } from "./sections/search";
import { StatsSection } from "./sections/stats";
import { StatsSectionSkeleton } from "./sections/stats/stats-section-skeleton";

export function LandingView() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <SearchSection />

      <Suspense fallback={<StatsSectionSkeleton />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<DomainsSectionSkeleton />}>
        <DomainsSection />
      </Suspense>

      <OpenSourceSection />

      <CTASection />
    </div>
  );
}
