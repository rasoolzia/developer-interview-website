"use client";

import { useTheme } from "@teispace/next-themes";
import { type LucideIcon, MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";

import { DEFAULT_THEME, Theme, THEMES } from "@/shared/constants";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/shadcn";

const ICONS: Record<Theme, LucideIcon> = {
  system: SunMoonIcon,
  light: SunIcon,
  dark: MoonIcon,
} as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const nextTheme = THEMES[(theme as Theme) || DEFAULT_THEME];
  const Icon = ICONS[(theme as Theme) || DEFAULT_THEME];

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button onClick={() => setTheme(nextTheme)}>
            <Icon />
          </button>
        }
      />
      <TooltipContent>{theme} mode</TooltipContent>
    </Tooltip>
  );
}
