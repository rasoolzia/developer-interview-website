export const cacheKeys = {
  manifest: () => "manifest",

  topic: (domain: string, topic: string, language: string) =>
    `${domain}/${topic}/${language}`,

  searchIndex: () => "search-index",
};
