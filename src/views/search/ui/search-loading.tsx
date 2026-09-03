import { Skeleton } from "@/shared/ui/shadcn";

export function SearchLoading() {
  return Array.from({ length: 4 }).map((_, index) => (
    <Skeleton key={index} className="h-28 rounded-xl" />
  ));
}
