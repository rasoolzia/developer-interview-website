import { cn } from "@/shared/lib";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
};

export function Container({
  children,
  className,
  as: Component = "div",
}: Props) {
  return (
    <Component className={cn("container mx-auto w-full px-4", className)}>
      {children}
    </Component>
  );
}
