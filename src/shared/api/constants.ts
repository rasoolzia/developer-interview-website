export const API = {
  BASE_URL:
    "https://raw.githubusercontent.com/rasoolzia/developer-interview-handbook/main/public/api",

  MANIFEST: "manifest.json",

  SEARCH_INDEX: "search-index.json",

  REVALIDATE: {
    MANIFEST: 60 * 60,
    TOPIC: 60 * 60,
    SEARCH: 60 * 60,
  },
} as const;
