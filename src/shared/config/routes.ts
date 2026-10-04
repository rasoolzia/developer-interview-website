export const ROUTES = {
  home: "/",

  search: "/search",

  topics: "/topics",

  domains: "/domains",

  domain: (slug: string) => `/${slug}`,

  topic: (domain: string, topic: string) => `/${domain}/${topic}`,

  question: (language: string, domain: string, topic: string, slug: string) =>
    `/${language}/${domain}/${topic}/${slug}`,
} as const;
