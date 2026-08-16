"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export function LocaleProvider({ children }: Props) {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;

    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);

  return children;
}
