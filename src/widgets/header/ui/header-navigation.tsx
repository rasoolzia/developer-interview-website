"use client";

import { BookmarkIcon, FlagIcon, MenuIcon, SearchIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Suspense, useState } from "react";

import { LanguageSwitcher } from "@/features/language-switcher";
import { ThemeSwitcher } from "@/features/theme-switcher";
import { ROUTES } from "@/shared/config";
import { getDrawerSide, Link } from "@/shared/config/i18n";
import { SITE } from "@/shared/constants";
import { GithubIcon } from "@/shared/ui/icons";
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/shadcn";

type IconLinkProps = {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
};

function IconLink({ href, label, external, children }: IconLinkProps) {
  const linkProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link
            {...linkProps}
            aria-label={label}
            className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring inline-flex size-9 items-center justify-center rounded-lg transition-colors focus-visible:ring-3 focus-visible:outline-none"
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function MobileLink({
  href,
  label,
  onNavigate,
  children,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="hover:bg-muted flex h-10 items-center gap-3 rounded-lg px-3 text-sm transition-colors"
      onClick={onNavigate}
    >
      {children}
      {label}
    </Link>
  );
}

export function HeaderNavigation() {
  const t = useTranslations("common.navigation");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="hidden items-center gap-1 sm:flex"
        aria-label={t("label")}
      >
        <IconLink href={ROUTES.search} label={t("search")}>
          <SearchIcon className="size-5" />
        </IconLink>
        <IconLink href={ROUTES.bookmarks} label={t("bookmarks")}>
          <BookmarkIcon className="size-5" />
        </IconLink>
        <IconLink href={ROUTES.reports} label={t("reports")}>
          <FlagIcon className="size-5" />
        </IconLink>
        <IconLink href={SITE.github} label={t("github")} external>
          <GithubIcon className="size-5" />
        </IconLink>
        <Suspense fallback={null}>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </Suspense>
      </nav>

      <div className="flex items-center gap-1 sm:hidden">
        <IconLink href={ROUTES.search} label={t("search")}>
          <SearchIcon className="size-5" />
        </IconLink>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" aria-label={t("menu")} />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side={getDrawerSide(locale)}>
            <SheetHeader>
              <SheetTitle>{t("menu")}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4" aria-label={t("label")}>
              <MobileLink
                href={ROUTES.search}
                label={t("search")}
                onNavigate={() => setOpen(false)}
              >
                <SearchIcon className="size-5" />
              </MobileLink>
              <MobileLink
                href={ROUTES.bookmarks}
                label={t("bookmarks")}
                onNavigate={() => setOpen(false)}
              >
                <BookmarkIcon className="size-5" />
              </MobileLink>
              <MobileLink
                href={ROUTES.reports}
                label={t("reports")}
                onNavigate={() => setOpen(false)}
              >
                <FlagIcon className="size-5" />
              </MobileLink>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-muted flex h-10 items-center gap-3 rounded-lg px-3 text-sm transition-colors"
                onClick={() => setOpen(false)}
              >
                <GithubIcon className="size-5" />
                {t("github")}
              </a>
            </nav>
            <Suspense fallback={<div className="mt-auto h-16 border-t" />}>
              <div className="mt-auto flex items-center gap-2 border-t p-4">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
            </Suspense>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
