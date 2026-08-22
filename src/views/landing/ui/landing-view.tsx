import { getLanding } from "../api";
import { CTASection } from "./sections/cta";
import { DomainsSection } from "./sections/domains";
import { HeroSection } from "./sections/hero";
import { OpenSourceSection } from "./sections/open-source";
import { SearchSection } from "./sections/search";
import { StatsSection } from "./sections/stats";

export async function LandingView() {
  const landing = await getLanding();

  return (
    <div className="flex flex-col">
      <HeroSection />

      <SearchSection />

      <StatsSection stats={landing.stats} />

      <DomainsSection domains={landing.domains} />

      <OpenSourceSection />

      <CTASection />
    </div>
  );
}
