"use client";

import { useTheme } from "@teispace/next-themes";
import { type LucideIcon, MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";

import { DEFAULT_THEME, type Theme, THEMES } from "@/shared/constants";
import { useMounted } from "@/shared/hooks";
import { cn } from "@/shared/lib";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/shadcn";

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
          <Button
            onClick={() => setTheme(THEMES[currentTheme])}
            disabled={!mounted}
            aria-label="Toggle theme"
            variant="ghost"
            className="h-10 px-2"
          >
            <Icon className={cn("size-5", !mounted && "opacity-0")} />
          </Button>
        }
      />
      {mounted && <TooltipContent>{theme} mode</TooltipContent>}
    </Tooltip>
  );
}
