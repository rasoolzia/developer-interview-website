import { getTranslations } from "next-intl/server";

import { Link } from "@/shared/config/i18n";

import { ROUTES } from "../config";

export async function Logo() {
  const t = await getTranslations("common");

  return (
    <Link
      href={ROUTES.home}
      className="text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
    >
      {t("site.shortName")}
    </Link>
  );
}
