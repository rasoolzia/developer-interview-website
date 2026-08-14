import "./globals.css";

import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { ThemeProvider } from "./providers/theme-provider";

export const metadata: Metadata = {
  title: "Developer Interview Handbook",
  description: "Open source developer interview questions handbook",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
