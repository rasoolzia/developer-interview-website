import { ArrowLeftIcon } from "lucide-react";

import { Link } from "@/shared/config/i18n";
import { cn } from "@/shared/lib";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function BackLink({ href, children, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors",
        className,
      )}
    >
      <ArrowLeftIcon className="size-4 shrink-0 rtl:rotate-180" />
      {children}
    </Link>
  );
}
