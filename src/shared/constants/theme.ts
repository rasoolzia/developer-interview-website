export const THEMES = {
  system: "light",
  light: "dark",
  dark: "system",
} as const;

export type Theme = keyof typeof THEMES;

export const DEFAULT_THEME: Theme = "system";
