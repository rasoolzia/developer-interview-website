export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
  copyrightYear: new Date().getFullYear(),
} as const;
