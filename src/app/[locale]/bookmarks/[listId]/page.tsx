import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { BookmarkListView } from "@/views/bookmark";

type Props = { params: Promise<{ listId: string }> };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");
  return { title: t("bookmarks") };
}

export default async function BookmarkListPage({ params }: Props) {
  const { listId } = await params;
  return <BookmarkListView listId={listId} />;
}
