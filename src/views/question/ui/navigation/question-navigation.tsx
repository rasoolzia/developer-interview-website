"use client";

import { ArrowLeftIcon, ArrowRightIcon, LoaderCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState, useTransition } from "react";

import { useRouter } from "@/shared/config/i18n";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/shadcn";

import type { QuestionNavigationHrefs } from "../../model/question-navigation.model";

type Direction = "previous" | "next";

type Props = {
  navigationHrefs: QuestionNavigationHrefs;
  onNavigate?: () => void;
  enableKeyboardNavigation?: boolean;
  className?: string;
};

const NAV_ITEMS = [
  {
    direction: "previous" as const,
    icon: ArrowLeftIcon,
    labelKey: "previous",
    iconClassName:
      "size-4 shrink-0 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5",
    iconPosition: "start" as const,
  },
  {
    direction: "next" as const,
    icon: ArrowRightIcon,
    labelKey: "next",
    iconClassName:
      "size-4 shrink-0 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5",
    iconPosition: "end" as const,
  },
];

export function QuestionNavigation({
  navigationHrefs,
  onNavigate,
  enableKeyboardNavigation = false,
  className,
}: Props) {
  const t = useTranslations("question");
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [navigatingTo, setNavigatingTo] = useState<Direction | null>(null);

  const navigateQuestion = useCallback(
    (direction: Direction, href: string) => {
      setNavigatingTo(direction);
      onNavigate?.();

      startTransition(() => {
        router.push(href);
      });
    },
    [onNavigate, router, startTransition],
  );

  useEffect(() => {
    if (!enableKeyboardNavigation) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const direction =
        event.key === "ArrowLeft"
          ? "previous"
          : event.key === "ArrowRight"
            ? "next"
            : null;
      const href = direction ? navigationHrefs[direction] : undefined;

      if (!direction || !href) return;

      event.preventDefault();
      navigateQuestion(direction, href);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyboardNavigation, navigationHrefs, navigateQuestion]);

  return (
    <nav className={cn("flex gap-2", className)}>
      {NAV_ITEMS.map(
        ({ direction, icon: Icon, labelKey, iconClassName, iconPosition }) => {
          const target = navigationHrefs[direction];
          if (!target) return null;

          const isLoading = isPending && navigatingTo === direction;
          const indicator = isLoading ? (
            <LoaderCircleIcon className="size-4 animate-spin" />
          ) : (
            <Icon className={iconClassName} />
          );

          return (
            <Button
              key={direction}
              variant="outline"
              className="group flex-1 cursor-pointer"
              disabled={isPending}
              onClick={() => navigateQuestion(direction, target)}
            >
              {iconPosition === "start" && indicator}
              {t(labelKey)}
              {iconPosition === "end" && indicator}
            </Button>
          );
        },
      )}
    </nav>
  );
}
