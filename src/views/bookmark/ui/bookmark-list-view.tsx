"use client";

import { PencilIcon, Trash2Icon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { bookmarkRepository } from "@/features/bookmark/storage";
import { ROUTES } from "@/shared/config";
import { Link, useRouter } from "@/shared/config/i18n";
import { useMutationState } from "@/shared/hooks";
import { parseLanguage } from "@/shared/lib";
import { BackLink, ConfirmationDialog } from "@/shared/ui";
import { Button, Input } from "@/shared/ui/shadcn";
import { QuestionList } from "@/widgets/question-list";

import { useBookmarkList } from "../model";
import { BookmarkLoading } from "./bookmark-loading";

export function BookmarkListView({ listId }: { listId: string }) {
  const t = useTranslations("management.bookmarks");
  const locale = useLocale();
  const router = useRouter();

  const {
    list,
    questions,
    loading,
    error,
    notFound,
    removeQuestionLocal,
    applyRename,
  } = useBookmarkList(listId, parseLanguage(locale));

  const { saving, error: mutationError, run: runMutation } = useMutationState();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [confirmAction, setConfirmAction] = useState<
    "delete" | "remove" | null
  >(null);
  const [pendingQuestionId, setPendingQuestionId] = useState<string | null>(
    null,
  );

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
    await runMutation(async () => {
      await bookmarkRepository.deleteList(list.id);
      setConfirmAction(null);
      router.push(ROUTES.bookmarks);
    });
  }

  async function removeQuestion(questionId: string) {
    await runMutation(async () => {
      await bookmarkRepository.removeQuestion(listId, questionId);
      setPendingQuestionId(null);
      setConfirmAction(null);
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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-x-1 gap-y-3">
        <div className="flex flex-col gap-2">
          {editing ? (
            <div className="mb-1 flex gap-2">
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
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold sm:text-3xl">{list.name}</h1>
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
                  onClick={() => setConfirmAction("delete")}
                >
                  <Trash2Icon />
                </Button>
              </div>
            </div>
          )}
          <p className="text-muted-foreground mt-1 text-sm">
            {t("questions", { count: questions.length })}
          </p>
        </div>

        <div className="flex flex-col">
          <BackLink href={ROUTES.bookmarks} className="mb-4">
            {t("title")}
          </BackLink>
          {questions.length > 0 && (
            <Button
              nativeButton={false}
              render={
                <Link href={ROUTES.bookmarkReview(listId, questions[0].id)}>
                  review
                </Link>
              }
            />
          )}
        </div>
      </div>

      {mutationError && (
        <p className="text-destructive text-sm">{t("error")}</p>
      )}

      {questions.length === 0 ? (
        <p className="text-muted-foreground py-10 text-center">
          {t("emptyList")}
        </p>
      ) : (
        <QuestionList
          questions={questions}
          getHref={(question) => ROUTES.bookmarkReview(listId, question.id)}
          getAction={(question) => (
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              aria-label={t("remove")}
              disabled={saving}
              onClick={() => {
                setPendingQuestionId(question.id);
                setConfirmAction("remove");
              }}
            >
              <Trash2Icon />
            </Button>
          )}
        />
      )}

      <ConfirmationDialog
        open={confirmAction !== null}
        title={confirmAction === "delete" ? t("deleteTitle") : t("removeTitle")}
        description={
          confirmAction === "delete"
            ? t("deleteDescription")
            : t("removeDescription")
        }
        cancelLabel={t("cancel")}
        confirmLabel={confirmAction === "delete" ? t("delete") : t("remove")}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmAction(null);
            setPendingQuestionId(null);
          }
        }}
        onConfirm={() => {
          if (confirmAction === "delete") return deleteList();
          if (pendingQuestionId) return removeQuestion(pendingQuestionId);
        }}
      />
    </div>
  );
}
