"use client";

import { useCallback, useRef, useState } from "react";

export function useMutationState() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const inFlight = useRef(false);

  const run = useCallback(async (action: () => Promise<void>) => {
    if (inFlight.current) return;

    inFlight.current = true;
    setSaving(true);
    setError(null);

    try {
      await action();
    } catch (err) {
      setError(err ?? new Error("Unknown mutation error"));
    } finally {
      inFlight.current = false;
      setSaving(false);
    }
  }, []);

  return {
    saving,
    error,
    hasError: error !== null,
    run,
  };
}
