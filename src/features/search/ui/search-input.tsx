"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { SubmitEvent, useState } from "react";

import { ROUTES } from "@/shared/config";
import { Button, Input } from "@/shared/ui/shadcn";

export function SearchInput() {
  const t = useTranslations("search");

  const router = useRouter();

  const [query, setQuery] = useState("");

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const value = query.trim();

    if (!value) return;

    router.push(`${ROUTES.search}?query=${encodeURIComponent(value)}`);
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto flex max-w-3xl gap-3">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("placeholder")}
      />

      <Button type="submit">
        <SearchIcon className="size-4" />
        {t("button")}
      </Button>
    </form>
  );
}
