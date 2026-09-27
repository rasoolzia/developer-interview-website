"use client";

import { SearchIcon, XCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SubmitEvent, useRef, useState } from "react";

import { ROUTES, SEARCH_PARAMS } from "@/shared/config";
import { useRouter } from "@/shared/config/i18n";
import { cn } from "@/shared/lib";
import { Button, Input } from "@/shared/ui/shadcn";

type Props = {
  defaultValue?: string;
  autoFocus?: boolean;
  className?: string;
  searchOnEmptyInput?: boolean;
  clearable?: boolean;
};

export function SearchInput({
  defaultValue = "",
  autoFocus,
  className,
  searchOnEmptyInput = false,
  clearable = false,
}: Props) {
  const t = useTranslations("search");

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(defaultValue);

  function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = query.trim();

    if (!value && !searchOnEmptyInput) {
      inputRef.current?.focus();
      return;
    }

    if (!value) {
      router.push(ROUTES.search);
      return;
    }

    router.push(
      `${ROUTES.search}?${SEARCH_PARAMS.query}=${encodeURIComponent(value)}`,
    );
  }

  function handleClear() {
    setQuery("");
    inputRef.current?.focus();
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("mx-auto flex h-10 max-w-3xl gap-3", className)}
    >
      <div className="relative flex flex-1 items-center">
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("placeholder")}
          autoFocus={autoFocus}
          className={cn("h-full", clearable && query && "pe-8")}
        />

        {clearable && query && (
          <button
            type="button"
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground absolute inset-e-2 transition-colors"
          >
            <XCircleIcon className="size-5" />
          </button>
        )}
      </div>

      <Button type="submit" className="h-full">
        <SearchIcon className="size-4" />
        {t("button")}
      </Button>
    </form>
  );
}
