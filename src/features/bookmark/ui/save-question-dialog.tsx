"use client";

import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { startTransition, useEffect, useState } from "react";

import { cn, parseLanguage } from "@/shared/lib";
import {
  Button,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  ScrollArea,
} from "@/shared/ui/shadcn";

import { getBookmarkListSummaries } from "../api";
import type { BookmarkList } from "../model";
import { bookmarkRepository, DuplicateListNameError } from "../storage";

type Props = {
  questionId: string;
  onSaved: (saved: boolean) => void;
};

export function SaveQuestionDialog({ questionId, onSaved }: Props) {
  const t = useTranslations("question.bookmark");
  const locale = useLocale();

  const [lists, setLists] = useState<BookmarkList[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [newName, setNewName] = useState("");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      startTransition(() => setIsLoading(true));

      try {
        const summaries = await getBookmarkListSummaries(
          questionId,
          parseLanguage(locale),
        );

        if (!cancelled) {
          startTransition(() => {
            setLists(summaries.map(({ list }) => list));

            setCounts(
              Object.fromEntries(
                summaries.map(({ list, questionCount }) => [
                  list.id,
                  questionCount,
                ]),
              ),
            );

            setSelected(
              new Set(
                summaries
                  .filter(({ containsQuestion }) => containsQuestion)
                  .map(({ list }) => list.id),
              ),
            );

            setError(null);
            setIsLoading(false);
          });
        }
      } catch {
        if (!cancelled) {
          startTransition(() => {
            setError(t("errorLoad"));
            setIsLoading(false);
          });
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [locale, questionId, t]);

  function toggleList(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleCreateList() {
    const name = newName.trim();
    if (!name || isCreating) return;
    setIsCreating(true);
    setError(null);
    try {
      const list = await bookmarkRepository.createList(name);
      setLists((prev) => [list, ...prev]);
      setCounts((prev) => ({ ...prev, [list.id]: 0 }));
      setSelected((prev) => new Set([...prev, list.id]));
      setNewName("");
    } catch (err) {
      setError(
        err instanceof DuplicateListNameError
          ? t("errorDuplicateName")
          : t("errorSave"),
      );
    } finally {
      setIsCreating(false);
    }
  }

  async function handleSave() {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const allItems = await bookmarkRepository.getAllItems();

      const listsContainingQuestion = new Set(
        allItems
          .filter((item) => item.questionId === questionId)
          .map((item) => item.listId),
      );

      const changes = lists.flatMap((list) => {
        const has = listsContainingQuestion.has(list.id);

        if (selected.has(list.id) && !has) {
          return [bookmarkRepository.addQuestion(list.id, questionId)];
        }

        if (!selected.has(list.id) && has) {
          return [bookmarkRepository.removeQuestion(list.id, questionId)];
        }

        return [];
      });

      await Promise.all(changes);

      const saved = await bookmarkRepository.isQuestionSaved(questionId);
      onSaved(saved);
    } catch {
      setError(t("errorSave"));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <DialogContent closeLabel={t("close")} className="flex flex-col">
      <DialogHeader>
        <DialogTitle>{t("dialogTitle")}</DialogTitle>
      </DialogHeader>

      {error && <p className="text-destructive text-sm">{error}</p>}

      {isLoading ? (
        <div className="text-muted-foreground flex items-center justify-center">
          <LoaderCircleIcon className="size-4 animate-spin" />
        </div>
      ) : lists.length === 0 && !error ? (
        <p className="text-muted-foreground text-sm">{t("noLists")}</p>
      ) : (
        <ScrollArea className="max-h-60">
          <div className={cn("space-y-1", lists.length > 5 && "pe-4")}>
            {lists.map((list) => (
              <label
                key={list.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors",
                  selected.has(list.id)
                    ? "border-primary/50 bg-primary/5"
                    : "border-border hover:bg-muted/60",
                )}
              >
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={selected.has(list.id)}
                  onChange={() => toggleList(list.id)}
                />

                <span className="min-w-0 flex-1 truncate text-sm font-medium">
                  {list.name}
                </span>

                <span className="bg-muted/50 text-muted-foreground shrink-0 rounded-md border px-2 py-0.5 text-xs tabular-nums">
                  {counts[list.id] ?? 0}
                </span>
              </label>
            ))}
          </div>
        </ScrollArea>
      )}

      <div className="flex gap-2">
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder={t("newListPlaceholder")}
          disabled={isCreating}
          onKeyDown={(e) => {
            if (e.key === "Enter") void handleCreateList();
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => void handleCreateList()}
          disabled={!newName.trim() || isCreating}
        >
          <PlusIcon className="size-4" />
        </Button>
      </div>

      <DialogFooter closeLabel={t("close")} showCloseButton>
        <Button
          type="button"
          onClick={() => void handleSave()}
          disabled={isSaving || isLoading}
        >
          {t("save")}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
