import type { Language } from "../types";

export const API = {
  BASE_URL:
    "https://raw.githubusercontent.com/rasoolzia/developer-interview-handbook/main/public/api",

  MANIFEST: "manifest.json",

  SEARCH_INDEX: "search-index.json",

  TOPIC: (domain: string, topic: string, language: Language) =>
    `${domain}/${topic}/${language}.json`,

  REVALIDATE: {
    MANIFEST: 60 * 60,
    TOPIC: 60 * 60,
    SEARCH: 60 * 60,
  },
} as const;
