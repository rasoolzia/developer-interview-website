import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { ROUTES } from "@/shared/config";
import { SITE } from "@/shared/constants";
import { Container } from "@/shared/ui";
import { GithubIcon } from "@/shared/ui/icons";
import { buttonVariants } from "@/shared/ui/shadcn";

export function HeroSection() {
  const t = useTranslations("landing.hero");

  return (
    <Container className="py-16 sm:py-28" as="section">
      <div className="mx-auto max-w-4xl space-y-7 text-center">
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">
          {t("eyebrow")}
        </p>

        <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {t("title")}
        </h1>

        <p className="text-muted-foreground mx-auto max-w-2xl text-base leading-7 text-pretty sm:text-lg">
          {t("description")}
        </p>

        <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
          <Link href={ROUTES.search} className={buttonVariants({ size: "lg" })}>
            {t("primaryAction")}
            <ArrowRightIcon className="rtl:rotate-180" />
          </Link>

          <Link
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            <GithubIcon />
            {t("secondaryAction")}
          </Link>
        </div>
      </div>
    </Container>
  );
}
