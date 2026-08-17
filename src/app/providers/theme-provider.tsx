"use client";

import type { ThemeProviderProps } from "@teispace/next-themes";
import { ThemeProvider as NextThemesProvider } from "@teispace/next-themes";

import { DEFAULT_THEME } from "@/shared/constants";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={DEFAULT_THEME}
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
