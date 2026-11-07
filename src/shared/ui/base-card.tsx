import { ArrowRightIcon } from "lucide-react";

import { Link } from "@/shared/config/i18n";
import { cn } from "@/shared/lib";

type BaseCardProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  showArrow?: boolean;
  action?: React.ReactNode;
};

export function BaseCard({
  children,
  href,
  className,
  showArrow = true,
  action,
}: BaseCardProps) {
  const baseClassName = cn(
    "group hover:border-primary/50 hover:bg-accent/30 relative block rounded-xl border p-5 transition-all hover:shadow-md [content-visibility:auto] [contain-intrinsic-size:auto_140px]",
    className,
  );

  if (!href) {
    return (
      <div className={cn(baseClassName, action && "relative")}>
        {children}
        {action && (
          <div className="absolute inset-e-5 top-5 z-10">{action}</div>
        )}
      </div>
    );
  }

  const link = (
    <Link href={href} className={baseClassName}>
      {children}
      {!action && showArrow && (
        <ArrowRightIcon className="text-muted-foreground group-hover:text-primary absolute inset-e-5 top-5 size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
      )}
    </Link>
  );

  if (!action) return link;

  return (
    <div className="relative">
      {link}
      <div className="absolute inset-e-5 top-5 z-10">{action}</div>
    </div>
  );
}
