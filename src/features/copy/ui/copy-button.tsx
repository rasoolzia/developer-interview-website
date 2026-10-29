"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";

import { Button } from "@/shared/ui/shadcn";

type ValueProp = string | (() => string);
type ChildrenProp = ReactNode | ((state: { copied: boolean }) => ReactNode);

type Props = Omit<
  ComponentProps<typeof Button>,
  "type" | "onClick" | "children" | "value"
> & {
  value: ValueProp;
  children?: ChildrenProp;
};

export function CopyButton({ children, value, ...props }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const resolved = typeof value === "function" ? value() : value;
    await navigator.clipboard.writeText(resolved);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  const content =
    typeof children === "function" ? children({ copied }) : children;

  return (
    <Button
      {...props}
      type="button"
      variant="ghost"
      onClick={handleCopy}
      aria-label={props["aria-label"] ?? "Copy"}
    >
      {copied ? (
        <CheckIcon className="size-3.5" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
      {content}
    </Button>
  );
}
