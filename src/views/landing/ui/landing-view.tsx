import { CTASection } from "./sections/cta";
import { DomainsSection } from "./sections/domains";
import { HeroSection } from "./sections/here";
import { OpenSourceSection } from "./sections/open-source";
import { SearchSection } from "./sections/search";
import { StatsSection } from "./sections/stats";

export function LandingView() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <SearchSection />

      <StatsSection />

      <DomainsSection />

      <OpenSourceSection />

      <CTASection />
    </div>
  );
}
