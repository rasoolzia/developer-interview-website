import { SearchXIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  query?: string;
};

export function SearchEmpty({ query }: Props) {
  const t = useTranslations("search");

  const title = query ? t("notFound.title") : t("empty.title");
  const description = query
    ? t("notFound.description", { query })
    : t("empty.description");

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-12 text-center sm:py-16">
      <div className="bg-primary/10 text-primary flex size-14 items-center justify-center rounded-full">
        <SearchXIcon className="size-6" />
      </div>

      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
    </div>
  );
}
