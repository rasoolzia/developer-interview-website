import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("landing");

  return (
    <section>
      <h1>{t("title")}</h1>

      <p>{t("description")}</p>
    </section>
  );
}
