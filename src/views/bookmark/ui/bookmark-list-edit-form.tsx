import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button, Input } from "@/shared/ui/shadcn";

type Props = {
  initialName: string;
  saving: boolean;
  onSave: (name: string) => void;
  onCancel: () => void;
};

export function BookmarkListEditForm({
  initialName,
  saving,
  onSave,
  onCancel,
}: Props) {
  const t = useTranslations("management.bookmarks");
  const [name, setName] = useState(initialName);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (name.trim()) onSave(name);
      }}
      className="flex flex-wrap gap-2 p-4"
    >
      <Input
        value={name}
        onChange={(event) => setName(event.target.value)}
        autoFocus
        aria-label={t("rename")}
        className="min-w-0 flex-1"
      />
      <Button type="submit" size="sm" disabled={saving}>
        {t("save")}
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={onCancel}>
        {t("cancel")}
      </Button>
    </form>
  );
}
