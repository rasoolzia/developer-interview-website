"use client";

import { SEARCH_PARAMS } from "@/shared/config";
import { useQueryState } from "@/shared/hooks";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/shadcn";

type Props = {
  page: number;
  totalPages: number;
};

function getPageRange(current: number, total: number): (number | "ellipsis")[] {
  const delta = 1;
  const range: (number | "ellipsis")[] = [1];

  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  if (left > 2) range.push("ellipsis");

  for (let i = left; i <= right; i++) range.push(i);

  if (right < total - 1) range.push("ellipsis");

  if (total > 1) range.push(total);

  return range;
}

export function SearchPagination({ page, totalPages }: Props) {
  const { updateParams } = useQueryState();

  if (totalPages <= 1) return null;

  function goToPage(target: number) {
    updateParams({
      [SEARCH_PARAMS.page]: target === 1 ? undefined : String(target),
    });
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={page === 1}
            className={
              page === 1 ? "pointer-events-none opacity-50" : undefined
            }
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) goToPage(page - 1);
            }}
          />
        </PaginationItem>

        {getPageRange(page, totalPages).map((p, i) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(p);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            aria-disabled={page === totalPages}
            className={
              page === totalPages ? "pointer-events-none opacity-50" : undefined
            }
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) goToPage(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
