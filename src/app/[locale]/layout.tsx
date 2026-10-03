import "./../globals.css";

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Suspense } from "react";

import { getDirection, routing } from "@/shared/config/i18n";
import { BRAND_COLORS } from "@/shared/constants";
import { vazirmatn } from "@/shared/styles/fonts";
import { Footer, FooterLoading } from "@/widgets/footer";
import { Header } from "@/widgets/header";

import { ThemeProvider } from "../providers/theme-provider";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "common.Metadata",
  });

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    applicationName: t("title"),
    generator: "Next.js",
    authors: [{ name: "MohammadRasool Ziaaddini" }],
    creator: "MohammadRasool Ziaaddini",
    metadataBase: new URL("https://interview.mrzd.ir"),
    alternates: {
      languages: {
        en: "/en",
        fa: "/fa",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      siteName: t("title"),
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      locale: locale === "fa" ? "fa_IR" : "en_US",
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BRAND_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: BRAND_COLORS.dark },
  ],
  colorScheme: "light dark",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function IntlProvider({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const direction = getDirection(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      className={vazirmatn.variable}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <Suspense fallback={null}>
            <IntlProvider>
              <Header />
              <main className="grow">{children}</main>
              <Suspense fallback={<FooterLoading />}>
                <Footer />
              </Suspense>
            </IntlProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
