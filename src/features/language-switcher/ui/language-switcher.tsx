"use client";

import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/shared/config/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();

  const router = useRouter();

  const pathname = usePathname();

  const changeLanguage = (value: string) => {
    router.replace(pathname, {
      locale: value,
    });
  };

  return (
    <select
      value={locale}
      onChange={(event) => changeLanguage(event.target.value)}
    >
      <option value="en">English</option>

      <option value="fa">فارسی</option>
    </select>
  );
}
