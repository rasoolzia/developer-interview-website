import { Suspense } from "react";

import { DomainsLoading } from "@/views/domain";

import { CTASection } from "./sections/cta";
import { DomainsSection } from "./sections/domains";
import { HeroSection } from "./sections/hero";
import { OpenSourceSection } from "./sections/open-source";
import { SearchSection } from "./sections/search";
import { StatsSection, StatsSectionSkeleton } from "./sections/stats";

export function LandingView() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <SearchSection />

      <Suspense fallback={<StatsSectionSkeleton />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<DomainsLoading />}>
        <DomainsSection />
      </Suspense>

      <OpenSourceSection />

      <CTASection />
    </div>
  );
}
