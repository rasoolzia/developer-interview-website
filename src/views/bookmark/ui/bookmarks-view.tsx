"use client";

import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import type { BookmarkList } from "@/features/bookmark/model";
import { bookmarkRepository } from "@/features/bookmark/storage";
import { ROUTES } from "@/shared/config";
import { Link } from "@/shared/config/i18n";
import { useMutationState } from "@/shared/hooks";
import { Button, Input } from "@/shared/ui/shadcn";

import { useBookmarkLists } from "../model";
import { BookmarkLoading } from "./bookmark-loading";

export function BookmarksView() {
  const t = useTranslations("management.bookmarks");
  const { lists, loading, error, reload } = useBookmarkLists();
  const { saving, error: mutationError, run: runMutation } = useMutationState();

  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  async function createList(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;
    await runMutation(async () => {
      await bookmarkRepository.createList(name);
      setName("");
      await reload();
    });
  }

  async function renameList(listId: string) {
    if (!editingName.trim()) return;
    await runMutation(async () => {
      await bookmarkRepository.renameList(listId, editingName);
      setEditingId(null);
      await reload();
    });
  }

  async function deleteList(list: BookmarkList) {
    if (!confirm(t("confirmDelete"))) return;
    await runMutation(async () => {
      await bookmarkRepository.deleteList(list.id);
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
            <div
              key={list.id}
              className="bg-card flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4"
            >
              {editingId === list.id ? (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    void renameList(list.id);
                  }}
                  className="flex min-w-0 flex-1 gap-2"
                >
                  <Input
                    value={editingName}
                    onChange={(event) => setEditingName(event.target.value)}
                    autoFocus
                    aria-label={t("rename")}
                  />
                  <Button type="submit" size="sm" disabled={saving}>
                    {t("save")}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingId(null)}
                  >
                    {t("cancel")}
                  </Button>
                </form>
              ) : (
                <div className="min-w-0">
                  <Link
                    href={ROUTES.bookmarkList(list.id)}
                    className="hover:text-primary text-lg font-semibold"
                  >
                    {list.name}
                  </Link>
                  <p className="text-muted-foreground text-sm">
                    {t("questions", { count: list.questionCount })}
                  </p>
                </div>
              )}

              {editingId !== list.id && (
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    aria-label={t("rename")}
                    onClick={() => {
                      setEditingId(list.id);
                      setEditingName(list.name);
                    }}
                  >
                    <PencilIcon />
                  </Button>
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="destructive"
                    aria-label={t("delete")}
                    onClick={() => void deleteList(list)}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
