import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button, Input } from "@/shared/ui/shadcn";

type Props = {
  initialName: string;
  saving: boolean;
  onSave: (name: string) => void;
  onCancel: () => void;
  className?: string;
};

export function BookmarkListEditForm({
  initialName,
  saving,
  onSave,
  onCancel,
  className = "flex flex-wrap gap-2 p-4",
}: Props) {
  const t = useTranslations("management.bookmarks");
  const [name, setName] = useState(initialName);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName && !saving) {
      onSave(trimmedName);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Input
        value={name}
        onChange={(event) => setName(event.target.value)}
        autoFocus
        aria-label={t("rename")}
        className="min-w-0 flex-1"
      />

      <Button type="submit" size="sm" disabled={saving || !name.trim()}>
        {t("save")}
      </Button>

      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={onCancel}
        disabled={saving}
      >
        {t("cancel")}
      </Button>
    </form>
  );
}
