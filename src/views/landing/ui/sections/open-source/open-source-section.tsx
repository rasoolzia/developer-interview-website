import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { SITE } from "@/shared/constants";
import { GithubIcon } from "@/shared/ui/icons";
import { buttonVariants } from "@/shared/ui/shadcn";

export function OpenSourceSection() {
  const t = useTranslations("landing.openSource");

  return (
    <section className="container mx-auto px-4 py-16 sm:py-24">
      <div className="bg-muted/50 rounded-2xl border px-6 py-12 text-center sm:px-12">
        <div className="bg-background mx-auto mb-6 flex size-12 items-center justify-center rounded-xl border shadow-sm">
          <GithubIcon className="size-6" />
        </div>

        <p className="text-primary text-sm font-semibold tracking-wide uppercase">
          {t("eyebrow")}
        </p>

        <h2 className="font-heading mx-auto mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("title")}
        </h2>

        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl leading-7 text-pretty">
          {t("description")}
        </p>

        <Link
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonVariants({ variant: "outline", size: "lg" })} mt-7`}
        >
          {t("action")}
          <ArrowRightIcon className="rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
