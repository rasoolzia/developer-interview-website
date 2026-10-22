"use client";

import { ArrowLeftIcon, ArrowRightIcon, LoaderCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";

import type { Question } from "@/entities/question/model";
import { ROUTES } from "@/shared/config";
import { useRouter } from "@/shared/config/i18n";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/shadcn";

type Direction = "previous" | "next";

type Props = {
  question: Question;
  previousSlug?: string;
  nextSlug?: string;
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
  onNavigate,
  className,
}: Props) {
  const t = useTranslations("question");
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [navigatingTo, setNavigatingTo] = useState<Direction | null>(null);

  const slugs: Record<Direction, string | undefined> = {
    previous: previousSlug,
    next: nextSlug,
  };

  const navigateQuestion = (direction: Direction, questionSlug: string) => {
    setNavigatingTo(direction);
    onNavigate?.();

    startTransition(() => {
      router.push(
        ROUTES.question(question.domain, question.topic, questionSlug),
      );
    });
  };

  useEffect(() => {
    if (previousSlug) {
      router.prefetch(
        ROUTES.question(question.domain, question.topic, previousSlug),
      );
    }

    if (nextSlug) {
      router.prefetch(
        ROUTES.question(question.domain, question.topic, nextSlug),
      );
    }
  }, [router, previousSlug, nextSlug, question.domain, question.topic]);

  return (
    <nav className={cn("flex gap-2", className)}>
      {NAV_ITEMS.map(
        ({ direction, icon: Icon, labelKey, iconClassName, iconPosition }) => {
          const slug = slugs[direction];
          if (!slug) return null;

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
              onClick={() => navigateQuestion(direction, slug)}
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
