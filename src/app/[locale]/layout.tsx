import "./../globals.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Suspense } from "react";

import { getDirection, routing } from "@/shared/config/i18n";
import { vazirmatn } from "@/shared/styles/fonts";
import { Footer } from "@/widgets/footer";
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
    title: t("title"),
    description: t("description"),
  };
}

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
              <Footer />
            </IntlProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
