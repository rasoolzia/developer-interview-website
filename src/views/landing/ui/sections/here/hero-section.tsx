import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("landing.hero");

  return (
    <section className="container mx-auto py-24">
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <h1 className="text-5xl font-bold">{t("title")}</h1>

        <p className="text-muted-foreground text-lg">{t("description")}</p>
      </div>
    </section>
  );
}
