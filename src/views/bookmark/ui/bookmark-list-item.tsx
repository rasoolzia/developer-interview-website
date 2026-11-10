import { ChevronRightIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { BookmarkList } from "@/features/bookmark/model";
import { ROUTES } from "@/shared/config";
import { Link } from "@/shared/config/i18n";
import { Button } from "@/shared/ui/shadcn";

import { BookmarkListEditForm } from "./bookmark-list-edit-form";

type EditingState = {
  id: string | null;
  name: string;
  onCancel: () => void;
};

type Props = {
  list: BookmarkList & { questionCount: number };
  editing: EditingState;
  saving: boolean;
  onStartEditing: () => void;
  onRename: (name: string) => void;
  onDelete: () => void;
};

export function BookmarkListItem({
  list,
  editing,
  saving,
  onStartEditing,
  onRename,
  onDelete,
}: Props) {
  const t = useTranslations("management.bookmarks");

  if (editing.id === list.id) {
    return (
      <div className="bg-card hover:border-primary/40 overflow-hidden rounded-xl border transition-colors">
        <BookmarkListEditForm
          initialName={editing.name}
          saving={saving}
          onSave={onRename}
          onCancel={editing.onCancel}
        />
      </div>
    );
  }

  return (
    <div className="group bg-card hover:border-primary/40 relative flex items-center gap-3 overflow-hidden rounded-xl border p-4 transition-colors">
      <Link
        href={ROUTES.bookmarkList(list.id)}
        className="absolute inset-0"
        aria-label={list.name}
      />

      <div className="pointer-events-none min-w-0 flex-1">
        <span className="group-hover:text-primary block truncate text-base font-semibold transition-colors sm:text-lg">
          {list.name}
        </span>

        <span className="text-muted-foreground mt-1 block text-sm">
          {t("questions", { count: list.questionCount })}
        </span>
      </div>

      <ChevronRightIcon className="text-muted-foreground group-hover:text-primary pointer-events-none size-5 shrink-0 transition-colors rtl:rotate-180" />

      <div className="relative z-10 flex shrink-0 items-center gap-1 border-s ps-3">
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label={t("rename")}
          onClick={onStartEditing}
        >
          <PencilIcon />
        </Button>

        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className="text-destructive hover:text-destructive"
          aria-label={t("delete")}
          onClick={onDelete}
        >
          <Trash2Icon />
        </Button>
      </div>
    </div>
  );
}
