"use client";

import { useTheme } from "@teispace/next-themes";
import { type LucideIcon, MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";

import { DEFAULT_THEME, Theme, THEMES } from "@/shared/constants";
import { useMounted } from "@/shared/hooks";

const ICONS: Record<Theme, LucideIcon> = {
  system: SunMoonIcon,
  light: SunIcon,
  dark: MoonIcon,
} as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const nextTheme = THEMES[(theme as Theme) || DEFAULT_THEME];
  const Icon = ICONS[(theme as Theme) || DEFAULT_THEME];

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(nextTheme)}>
      <Icon />
    </button>
  );
}
