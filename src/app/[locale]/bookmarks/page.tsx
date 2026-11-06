import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { BookmarksView } from "@/views/bookmark";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");
  return { title: t("bookmarks") };
}

export default function BookmarksPage() {
  return <BookmarksView />;
}
