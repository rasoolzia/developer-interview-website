import { SearchIcon } from "lucide-react";
import Link from "next/link";

import { LanguageSwitcher } from "@/features/language-switcher/ui/language-switcher";
import { ThemeSwitcher } from "@/features/theme-switcher/ui/theme-switcher";
import { SITE } from "@/shared/constants/site";
import { GithubIcon } from "@/shared/ui/icons/github-icon";
import { Logo } from "@/shared/ui/logo";

export function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />

        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          <Link href="/search" rel="noopener noreferrer">
            <SearchIcon className="size-5" />
          </Link>

          <Link href={SITE.github} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="size-6" />
          </Link>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
