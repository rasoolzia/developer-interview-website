export const THEMES = {
  system: "light",
  light: "dark",
  dark: "system",
} as const;

export const BRAND_COLORS = { light: "#f16a00", dark: "#ff8a35" } as const;

export type Theme = keyof typeof THEMES;

export const DEFAULT_THEME: Theme = "system";
