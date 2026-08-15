"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { PropsWithChildren } from "react";

import { DEFAULT_THEME } from "@/shared/constants";

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={DEFAULT_THEME}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
