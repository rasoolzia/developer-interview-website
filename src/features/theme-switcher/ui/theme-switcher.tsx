"use client";

import { useTheme } from "@teispace/next-themes";
import { type LucideIcon, MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";

import { DEFAULT_THEME, type Theme, THEMES } from "@/shared/constants";
import { useMounted } from "@/shared/hooks";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/shadcn";

const ICONS: Record<Theme, LucideIcon> = {
  system: SunMoonIcon,
  light: SunIcon,
  dark: MoonIcon,
} as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const currentTheme = (theme as Theme) || DEFAULT_THEME;
  const Icon = mounted ? ICONS[currentTheme] : SunMoonIcon;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            onClick={() => mounted && setTheme(THEMES[currentTheme])}
            aria-label="Toggle theme"
          >
            <Icon className={mounted ? undefined : "opacity-0"} />
          </button>
        }
      />
      {mounted && <TooltipContent>{theme} mode</TooltipContent>}
    </Tooltip>
  );
}
