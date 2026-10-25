"use client";

import { SlidersHorizontalIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import type { QuestionDetails } from "@/entities/question/model";
import { getDrawerSide } from "@/shared/config/i18n";
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/shadcn";

import { QuestionSidebarContent } from "./question-sidebar-content";

type Props = QuestionDetails & {
  className?: string;
};

export function QuestionSidebarSheet({
  question,
  navigation,
  className,
}: Props) {
  const t = useTranslations("question");
  const locale = useLocale();
  const side = getDrawerSide(locale);

  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button variant="outline" size="sm">
              <SlidersHorizontalIcon className="size-4" />
              {t("info")}
            </Button>
          }
        />

        <SheetContent side={side} className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{t("info")}</SheetTitle>
          </SheetHeader>

          <div className="overflow-y-auto px-4 pb-6">
            <QuestionSidebarContent
              question={question}
              navigation={navigation}
              onNavigate={() => setOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
