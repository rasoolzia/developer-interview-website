import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { LanguageSwitcher } from "@/features/language-switcher";
import { ThemeSwitcher } from "@/features/theme-switcher";
import { ROUTES } from "@/shared/config";
import { SITE } from "@/shared/constants";
import { GithubIcon } from "@/shared/ui/icons";
import { Logo } from "@/shared/ui/logo";

export function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Logo />

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <Suspense fallback={null}>
            <LanguageSwitcher />
          </Suspense>

          <Link href={ROUTES.search} aria-label="Search">
            <SearchIcon className="size-5" />
          </Link>

          <Link
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GithubIcon className="size-6" />
          </Link>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
