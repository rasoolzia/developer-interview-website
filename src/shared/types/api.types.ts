export type Language = "en" | "fa";

export type Difficulty = "easy" | "medium" | "hard";

export interface ManifestLanguage {
  path: string;
  total: number;
  hash: string;
}

export interface ManifestTopic {
  label: string;

  languages: Record<Language, ManifestLanguage>;
}

export interface ManifestDomain {
  label: string;

  topics: Record<string, ManifestTopic>;
}

export interface Manifest {
  generatorVersion: string;

  schemaVersion: string;

  generatedAt: string;

  languages: Language[];

  domains: Record<string, ManifestDomain>;
}

export interface GeneratedQuestion {
  id: string;

  slug: string;

  title: string;

  difficulty: Difficulty;

  categories: string[];

  domain: string;

  topic: string;

  language: Language;

  tags?: string[];

  answer: {
    markdown: string;

    readingTime: number;
  };
}

export interface GeneratedTopic {
  version: number;

  hash: string;

  meta: {
    domain: string;

    topic: string;

    language: Language;

    label: string;
  };

  content: {
    title: string;

    categories: string[];

    difficulties: string[];
  };

  stats: {
    total: number;

    byDifficulty: {
      easy: number;

      medium: number;

      hard: number;
    };
  };

  questions: GeneratedQuestion[];
}

export interface SearchItem {
  id: string;

  slug: string;

  title: string;

  domain: string;

  topic: string;

  label: string;

  language: Language;

  path: string;

  difficulty: Difficulty;

  categories: string[];

  readingTime: number;

  tags?: string[];
}
