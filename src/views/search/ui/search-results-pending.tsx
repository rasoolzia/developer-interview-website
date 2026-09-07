"use client";

import { Loader2Icon } from "lucide-react";

import { useQueryState } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";

export function SearchResultsPending({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending } = useQueryState();

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
