"use client";

import { Check, Languages } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/shared/config/i18n/navigation";
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

    router.replace(
      {
        pathname,
        query: params,
      },
      {
        locale: value,
      },
    );
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
        <DropdownMenuItem
          onClick={() => changeLanguage("en")}
          className={locale === "en" ? "bg-accent" : ""}
        >
          English {locale === "en" && <Check />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage("fa")}
          className={locale === "fa" ? "bg-accent" : ""}
        >
          فارسی {locale === "fa" && <Check />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
