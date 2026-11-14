"use client";

import { Check, Languages } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

import {
  type Locale,
  LOCALE_CODES,
  LOCALES,
  usePathname,
  useRouter,
} from "@/shared/config/i18n";
import { Button } from "@/shared/ui/shadcn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/shadcn/dropdown-menu";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeLocale = (value: Locale) => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    router.replace({ pathname, query: params }, { locale: value });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="h-9 px-2"
            aria-label="Language switcher"
          >
            <Languages className="size-5" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="space-y-1">
        {LOCALE_CODES.map((code) => {
          const localeConfig = LOCALES[code];

          return (
            <DropdownMenuItem
              key={code}
              onClick={() => changeLocale(code)}
              className={locale === code ? "bg-accent" : ""}
            >
              {localeConfig.nativeLabel} {locale === code && <Check />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
