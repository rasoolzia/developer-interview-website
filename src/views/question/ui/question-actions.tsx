"use client";

import { BookmarkIcon, CheckIcon, FlagIcon, LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/shared/ui/shadcn";

type Props = {
  id: string;
};

export function QuestionActions({ id }: Props) {
  console.log("id :", id);
  const t = useTranslations("question");
  const [copied, setCopied] = useState(false);

  async function handleCopyLink() {
    await navigator.clipboard.writeText(window.location.href);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <section className="rounded-xl border p-5">
      <h2 className="mb-4 text-sm font-semibold">{t("actions")}</h2>

      <div className="space-y-1">
        <Button type="button" variant="ghost" className="w-full justify-start">
          <BookmarkIcon className="size-4" />
          {t("save")}
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="w-full justify-start"
          onClick={handleCopyLink}
        >
          {copied ? (
            <CheckIcon className="size-4" />
          ) : (
            <LinkIcon className="size-4" />
          )}

          {copied ? t("linkCopied") : t("copyLink")}
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="text-muted-foreground hover:text-foreground w-full justify-start"
        >
          <FlagIcon className="size-4" />
          {t("report")}
        </Button>
      </div>
    </section>
  );
}
