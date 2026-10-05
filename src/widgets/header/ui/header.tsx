import { SearchIcon } from "lucide-react";
import { Suspense } from "react";

import { LanguageSwitcher } from "@/features/language-switcher";
import { ThemeSwitcher } from "@/features/theme-switcher";
import { ROUTES } from "@/shared/config";
import { Link } from "@/shared/config/i18n";
import { SITE } from "@/shared/constants";
import { Container, Logo } from "@/shared/ui";
import { GithubIcon } from "@/shared/ui/icons";

export function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <Suspense fallback={null}>
            <LanguageSwitcher />
          </Suspense>

          <Link href={ROUTES.search} aria-label="Search">
            <SearchIcon className="size-5" />
          </Link>

          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GithubIcon className="size-6" />
          </a>

          <ThemeSwitcher />
        </div>
      </Container>
    </header>
  );
}
