"use client";

import { useSearchParams } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useContext,
  useTransition,
} from "react";

import { usePathname, useRouter } from "@/shared/config/i18n/navigation";

type ParamUpdates = Record<string, string | undefined>;

type SearchNavigationContextValue = {
  isPending: boolean;
  updateParams: (updates: ParamUpdates) => void;
};

const SearchNavigationContext =
  createContext<SearchNavigationContextValue | null>(null);

export function SearchNavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function updateParams(updates: ParamUpdates) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <SearchNavigationContext.Provider value={{ isPending, updateParams }}>
      {children}
    </SearchNavigationContext.Provider>
  );
}

export function useSearchNavigation() {
  const ctx = useContext(SearchNavigationContext);

  if (!ctx) {
    throw new Error(
      "useSearchNavigation must be used within SearchNavigationProvider",
    );
  }

  return ctx;
}
