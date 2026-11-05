export const ROUTES = {
  home: "/",

  search: "/search",

  bookmarks: "/bookmarks",

  bookmarkList: (listId: string) => `/bookmarks/${listId}`,

  reports: "/reports",

  topics: "/topics",

  domains: "/domains",

  domain: (slug: string) => `/${slug}`,

  topic: (domain: string, topic: string) => `/${domain}/${topic}`,

  question: (domain: string, topic: string, slug: string) =>
    `/${domain}/${topic}/${slug}`,
} as const;
