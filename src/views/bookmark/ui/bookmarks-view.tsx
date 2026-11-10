"use client";

import { PlusIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import type { BookmarkList } from "@/features/bookmark/model";
import { bookmarkRepository } from "@/features/bookmark/storage";
import { Locale } from "@/shared/config/i18n";
import { useMutationState } from "@/shared/hooks";
import { ConfirmationDialog } from "@/shared/ui";
import { Button, Input } from "@/shared/ui/shadcn";

import { useBookmarkLists } from "../model";
import { BookmarkListItem } from "./bookmark-list-item";
import { BookmarkLoading } from "./bookmark-loading";

export function BookmarksView() {
  const t = useTranslations("management.bookmarks");
  const locale = useLocale();
  const { lists, loading, error, reload } = useBookmarkLists(locale as Locale);
  const { saving, error: mutationError, run: runMutation } = useMutationState();

  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [pendingDelete, setPendingDelete] = useState<BookmarkList | null>(null);

  async function createList(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;
    await runMutation(async () => {
      await bookmarkRepository.createList(name);
      setName("");
      await reload();
    });
  }

  async function renameList(listId: string, newName: string) {
    await runMutation(async () => {
      await bookmarkRepository.renameList(listId, newName);
      setEditingId(null);
      await reload();
    });
  }

  async function deleteList() {
    if (!pendingDelete) return;
    await runMutation(async () => {
      await bookmarkRepository.deleteList(pendingDelete.id);
      setPendingDelete(null);
      await reload();
    });
  }

  if (loading) return <BookmarkLoading />;

  return (
    <div className="space-y-6 py-6 sm:py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold sm:text-3xl">{t("title")}</h1>
        <form onSubmit={createList} className="flex w-full gap-2 sm:w-auto">
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t("newListPlaceholder")}
            aria-label={t("newListPlaceholder")}
          />
          <Button type="submit" disabled={saving || !name.trim()}>
            <PlusIcon />
            {t("create")}
          </Button>
        </form>
      </div>

      {(error || mutationError) && (
        <p className="text-destructive text-sm">{t("error")}</p>
      )}

      {lists.length === 0 ? (
        <p className="text-muted-foreground py-10 text-center">{t("empty")}</p>
      ) : (
        <div className="space-y-3">
          {lists.map((list) => (
            <BookmarkListItem
              key={list.id}
              list={list}
              editing={{
                id: editingId,
                name: editingName,
                onCancel: () => setEditingId(null),
              }}
              saving={saving}
              onStartEditing={() => {
                setEditingId(list.id);
                setEditingName(list.name);
              }}
              onRename={(newName) => void renameList(list.id, newName)}
              onDelete={() => setPendingDelete(list)}
            />
          ))}
        </div>
      )}

      <ConfirmationDialog
        open={pendingDelete !== null}
        title={t("deleteTitle")}
        description={t("deleteDescription")}
        cancelLabel={t("cancel")}
        confirmLabel={t("delete")}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
        onConfirm={deleteList}
      />
    </div>
  );
}
