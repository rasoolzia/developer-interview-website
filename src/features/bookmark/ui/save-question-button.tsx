"use client";

import { BookmarkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { startTransition, useEffect, useState } from "react";

import type { Question } from "@/entities/question/model";
import { cn } from "@/shared/lib/utils";
import { Button, Dialog, DialogTrigger } from "@/shared/ui/shadcn";

import { bookmarkRepository } from "../storage";
import { SaveQuestionDialog } from "./save-question-dialog";

type Props = {
  questionId: Question["id"];
};

export function SaveQuestionButton({ questionId }: Props) {
  const t = useTranslations("question");

  const [open, setOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    bookmarkRepository
      .isQuestionSaved(questionId)
      .then((saved) => {
        if (!cancelled) startTransition(() => setIsSaved(saved));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [questionId]);

  function handleSaved(saved: boolean) {
    setIsSaved(saved);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            className={cn("w-full justify-start", isSaved && "text-primary")}
          />
        }
      >
        <BookmarkIcon className={cn("size-4", isSaved && "fill-current")} />
        {isSaved ? t("saved") : t("save")}
      </DialogTrigger>

      {open && (
        <SaveQuestionDialog questionId={questionId} onSaved={handleSaved} />
      )}
    </Dialog>
  );
}
