"use client";

import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SubmitEvent, useState } from "react";

import { ROUTES, SEARCH_PARAMS } from "@/shared/config";
import { useRouter } from "@/shared/config/i18n/navigation";
import { cn } from "@/shared/lib";
import { Button, Input } from "@/shared/ui/shadcn";

type Props = {
  defaultValue?: string;

  autoFocus?: boolean;

  className?: string;
};

export function SearchInput({
  defaultValue = "",
  autoFocus,
  className,
}: Props) {
  const t = useTranslations("search");

  const router = useRouter();

  const [query, setQuery] = useState(defaultValue);

  function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = query.trim();

    if (!value) return;

    router.push(
      `${ROUTES.search}?${SEARCH_PARAMS.query}=${encodeURIComponent(value)}`,
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("mx-auto flex max-w-3xl gap-3", className)}
    >
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("placeholder")}
        autoFocus={autoFocus}
      />

      <Button type="submit">
        <SearchIcon className="size-4" />
        {t("button")}
      </Button>
    </form>
  );
}
