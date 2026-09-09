"use client";

import { Check, Languages } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

import { LOCALES, usePathname, useRouter } from "@/shared/config/i18n";
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

  const changeLanguage = (value: string) => {
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
            className="h-8 w-9"
            aria-label="Language switcher"
          >
            <Languages className="size-5" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        {Object.values(LOCALES).map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => changeLanguage(l.code)}
            className={locale === l.code ? "bg-accent" : ""}
          >
            {l.nativeLabel} {locale === l.code && <Check />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
