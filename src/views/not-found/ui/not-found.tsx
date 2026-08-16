import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
  const t = await getTranslations("common");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p>{t("notFound.title")}</p>
      <p>{t("notFound.description")}</p>
      <Link href="/" className="underline">
        Go home
      </Link>
    </div>
  );
}
