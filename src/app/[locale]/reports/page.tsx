import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ReportsView } from "@/views/report";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");
  return { title: t("reports") };
}

export default function ReportsPage() {
  return <ReportsView />;
}
