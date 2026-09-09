"use client";

import { useSearchParams } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useContext,
  useTransition,
} from "react";

import { usePathname, useRouter } from "@/shared/config/i18n";

type ParamUpdates = Record<string, string | undefined>;

type QueryStateContextValue = {
  isPending: boolean;
  updateParams: (updates: ParamUpdates) => void;
};

const QueryStateContext = createContext<QueryStateContextValue | null>(null);

export function QueryStateProvider({ children }: { children: ReactNode }) {
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
    <QueryStateContext.Provider value={{ isPending, updateParams }}>
      {children}
    </QueryStateContext.Provider>
  );
}

export function useQueryState() {
  const ctx = useContext(QueryStateContext);

  if (!ctx) {
    throw new Error("useQueryState must be used within QueryStateProvider");
  }

  return ctx;
}
