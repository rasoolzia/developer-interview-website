import { useTranslations } from "next-intl";

type Props = {
  query?: string;
};

export function SearchEmpty({ query }: Props) {
  const t = useTranslations("search");

  if (!query) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{t("empty.title")}</h2>

        <p className="text-muted-foreground mt-2">{t("empty.description")}</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold">{t("notFound.title")}</h2>

      <p className="text-muted-foreground mt-2">
        {t("notFound.description", {
          query,
        })}
      </p>
    </div>
  );
}
