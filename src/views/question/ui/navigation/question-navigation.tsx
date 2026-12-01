"use client";

import { ArrowLeftIcon, ArrowRightIcon, LoaderCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";

import type { Question } from "@/entities/question/model";
import { ROUTES } from "@/shared/config";
import { useRouter } from "@/shared/config/i18n";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/shadcn";

import type { QuestionNavigationHrefs } from "../../model/question-navigation.model";

type Direction = "previous" | "next";

type Props = {
  question: Question;
  previousSlug?: string;
  nextSlug?: string;
  navigationHrefs?: QuestionNavigationHrefs;
  onNavigate?: () => void;
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
  question,
  previousSlug,
  nextSlug,
  navigationHrefs,
  onNavigate,
  className,
}: Props) {
  const t = useTranslations("question");
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [navigatingTo, setNavigatingTo] = useState<Direction | null>(null);

  const neighbors: Record<Direction, string | undefined> = navigationHrefs
    ? {
        previous: navigationHrefs.previous,
        next: navigationHrefs.next,
      }
    : { previous: previousSlug, next: nextSlug };

  const navigateQuestion = (direction: Direction, target: string) => {
    setNavigatingTo(direction);
    onNavigate?.();

    startTransition(() => {
      const href = navigationHrefs
        ? target
        : ROUTES.question(question.domain, question.topic, target);

      router.push(href);
    });
  };

  return (
    <nav className={cn("flex gap-2", className)}>
      {NAV_ITEMS.map(
        ({ direction, icon: Icon, labelKey, iconClassName, iconPosition }) => {
          const target = neighbors[direction];
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
