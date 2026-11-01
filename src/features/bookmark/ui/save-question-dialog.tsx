"use client";

import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { startTransition, useEffect, useState } from "react";

import {
  Button,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  ScrollArea,
} from "@/shared/ui/shadcn";

import type { BookmarkList } from "../model";
import { bookmarkRepository, DuplicateListNameError } from "../storage";

type Props = {
  questionId: string;
  onSaved: (saved: boolean) => void;
};

export function SaveQuestionDialog({ questionId, onSaved }: Props) {
  const t = useTranslations("question.bookmark");

  const [lists, setLists] = useState<BookmarkList[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [newName, setNewName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      startTransition(() => setIsLoading(true));
      try {
        const allLists = await bookmarkRepository.getLists();
        const checks = await Promise.all(
          allLists.map(async (l) => {
            const items = await bookmarkRepository.getItems(l.id);
            return items.some((i) => i.questionId === questionId) ? l.id : null;
          }),
        );
        if (!cancelled) {
          startTransition(() => {
            setLists(allLists);
            setSelected(new Set(checks.filter(Boolean) as string[]));
            setError(null);
            setIsLoading(false);
          });
        }
      } catch {
        if (!cancelled)
          startTransition(() => {
            setError(t("errorLoad"));
            setIsLoading(false);
          });
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [questionId, t]);

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
      const allItems = await Promise.all(
        lists.map(async (l) => {
          const items = await bookmarkRepository.getItems(l.id);
          return {
            listId: l.id,
            has: items.some((i) => i.questionId === questionId),
          };
        }),
      );
      await Promise.all(
        allItems.flatMap(({ listId, has }) => {
          if (selected.has(listId) && !has)
            return [bookmarkRepository.addQuestion(listId, questionId)];
          if (!selected.has(listId) && has)
            return [bookmarkRepository.removeQuestion(listId, questionId)];
          return [];
        }),
      );
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
          <div className="space-y-1 pe-2">
            {lists.map((list) => (
              <label
                key={list.id}
                className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5"
              >
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={selected.has(list.id)}
                  onChange={() => toggleList(list.id)}
                />
                <span className="text-sm">{list.name}</span>
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
