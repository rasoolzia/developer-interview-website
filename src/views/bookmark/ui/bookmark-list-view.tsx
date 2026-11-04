"use client";

import { ArrowLeftIcon, PencilIcon, Trash2Icon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { bookmarkRepository } from "@/features/bookmark/storage";
import { ROUTES } from "@/shared/config";
import { Link, useRouter } from "@/shared/config/i18n";
import { useMutationState } from "@/shared/hooks";
import { Button, Input } from "@/shared/ui/shadcn";
import { QuestionList } from "@/widgets/question-list";

import { useBookmarkList } from "../model";
import { BookmarkLoading } from "./bookmark-loading";

export function BookmarkListView({ listId }: { listId: string }) {
  const t = useTranslations("management.bookmarks");
  const router = useRouter();

  const {
    list,
    questions,
    loading,
    error,
    notFound,
    removeQuestionLocal,
    applyRename,
  } = useBookmarkList(listId);

  const { saving, error: mutationError, run: runMutation } = useMutationState();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  function startEditing() {
    if (!list) return;
    setName(list.name);
    setEditing(true);
  }

  function cancelEditing() {
    if (!list) return;
    setName(list.name);
    setEditing(false);
  }

  async function rename() {
    if (!list || !name.trim()) return;
    await runMutation(async () => {
      await bookmarkRepository.renameList(list.id, name);
      applyRename(name);
      setEditing(false);
    });
  }

  async function deleteList() {
    if (!list) return;
    if (!confirm(t("confirmDelete"))) return;
    await runMutation(async () => {
      await bookmarkRepository.deleteList(list.id);
      router.push(ROUTES.bookmarks);
    });
  }

  async function removeQuestion(questionId: string) {
    if (!confirm(t("confirmRemove"))) return;
    await runMutation(async () => {
      await bookmarkRepository.removeQuestion(listId, questionId);
      removeQuestionLocal(questionId);
    });
  }

  if (loading) return <BookmarkLoading detail />;

  if (error) {
    return <p className="text-destructive py-10 text-center">{t("error")}</p>;
  }

  if (notFound || !list) {
    return (
      <p className="text-muted-foreground py-10 text-center">{t("notFound")}</p>
    );
  }

  return (
    <div className="space-y-6 py-6 sm:py-8">
      <Link
        href={ROUTES.bookmarks}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeftIcon className="size-4 rtl:rotate-180" />
        {t("title")}
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          {editing ? (
            <div className="flex gap-2">
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoFocus
              />
              <Button onClick={() => void rename()} disabled={saving}>
                {t("save")}
              </Button>
              <Button variant="outline" onClick={cancelEditing}>
                {t("cancel")}
              </Button>
            </div>
          ) : (
            <h1 className="text-2xl font-bold sm:text-3xl">{list.name}</h1>
          )}
          <p className="text-muted-foreground mt-1 text-sm">
            {t("questions", { count: questions.length })}
          </p>
        </div>

        {!editing && (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={t("rename")}
              onClick={startEditing}
            >
              <PencilIcon />
            </Button>
            <Button
              variant="destructive"
              size="icon-sm"
              aria-label={t("delete")}
              onClick={() => void deleteList()}
            >
              <Trash2Icon />
            </Button>
          </div>
        )}
      </div>

      {mutationError && (
        <p className="text-destructive text-sm">{t("error")}</p>
      )}

      {questions.length === 0 ? (
        <p className="text-muted-foreground py-10 text-center">
          {t("emptyList")}
        </p>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="relative">
              <QuestionList questions={[question]} />
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute inset-e-3 top-3"
                aria-label={t("delete")}
                disabled={saving}
                onClick={() => void removeQuestion(question.id)}
              >
                <XIcon />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
