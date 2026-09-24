import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { SITE } from "@/shared/constants";
import { GithubIcon } from "@/shared/ui/icons/github-icon";

import { getFooter } from "../api/footer.service";

export async function Footer() {
  const footer = await getFooter();
  const t = await getTranslations("common");

  return (
    <footer className="border-t">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <p className="text-muted-foreground text-sm">
          © {SITE.copyrightYear} {t("site.name")}. {t("site.copyright")}.
        </p>

        <div className="flex items-center gap-4">
          <span className="text-muted-foreground text-sm">
            v{footer.version}
          </span>

          <Link href={SITE.github} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="size-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
