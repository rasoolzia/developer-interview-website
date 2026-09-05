"use client";

import { Loader2Icon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import { useSearchNavigation } from "./search-navigation";

export function SearchResultsPending({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending } = useSearchNavigation();

  return (
    <div className="relative">
      {isPending && (
        <div className="bg-background/60 absolute inset-0 z-10 flex justify-center pt-24 backdrop-blur-[1px]">
          <Loader2Icon className="text-muted-foreground size-6 animate-spin" />
        </div>
      )}

      <div
        className={cn(
          "transition-opacity",
          isPending && "pointer-events-none opacity-50",
        )}
      >
        {children}
      </div>
    </div>
  );
}
