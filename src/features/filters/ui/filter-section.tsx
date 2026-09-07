"use client";

import { cn, normalize } from "@/shared/lib";
import { ScrollArea } from "@/shared/ui/shadcn";

type Option = { value: string; label: string };

type Props = {
  title: string;
  options: Option[];
  value?: string;
  onChange: (value: string | undefined) => void;
  scrollable?: boolean;
};

export function FilterSection({
  title,
  options,
  value,
  onChange,
  scrollable,
}: Props) {
  if (options.length === 0) return null;

  const list = (
    <div className={cn("flex flex-col gap-1 px-2", scrollable && "pb-2")}>
      {options.map((option) => {
        const isActive = normalize(option.value) === normalize(value ?? "");

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(isActive ? undefined : option.value)}
            className={cn(
              "rounded-md px-2 py-1.5 text-start text-sm transition",
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <div>
      <h3 className="text-muted-foreground mb-2 text-sm font-medium">
        {title}
      </h3>

      {scrollable ? (
        <ScrollArea className="h-48 pe-2">{list}</ScrollArea>
      ) : (
        list
      )}
    </div>
  );
}
