import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { ROUTES } from "@/shared/config";
import { Link } from "@/shared/config/i18n";
import { Container } from "@/shared/ui";
import { buttonVariants } from "@/shared/ui/shadcn";

export function CTASection() {
  const t = useTranslations("landing.cta");

  return (
    <Container className="py-16 sm:py-24" as="section">
      <div className="bg-primary text-primary-foreground rounded-2xl px-5 py-10 text-center sm:px-12 sm:py-12">
        <h2 className="font-heading mx-auto max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("title")}
        </h2>

        <p className="text-primary-foreground/80 mx-auto mt-4 max-w-xl leading-7 text-pretty">
          {t("description")}
        </p>

        <Link
          href={ROUTES.topics}
          className={`${buttonVariants({ variant: "secondary", size: "lg" })} mt-7`}
        >
          {t("action")}
          <ArrowRightIcon className="rtl:rotate-180" />
        </Link>
      </div>
    </Container>
  );
}
