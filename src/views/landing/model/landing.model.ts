export interface LandingStats {
  questions: number;

  topics: number;

  domains: number;

  languages: number;
}

export interface LandingDomain {
  slug: string;

  label: string;

  topics: number;
}

export interface LandingViewModel {
  stats: LandingStats;

  domains: LandingDomain[];
}
