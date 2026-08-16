import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { routing } from "@/shared/config/i18n";
import { LocaleProvider } from "@/shared/ui/locale-provider";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleProvider>
        <Header />

        <main>{children}</main>

        <Footer />
      </LocaleProvider>
    </NextIntlClientProvider>
  );
}
