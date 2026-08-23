import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function Logo() {
  const t = await getTranslations("common");

  return (
    <Link
      href="/"
      className="text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
    >
      {t("site.shortName")}
    </Link>
  );
}
