"use client";

import { useCallback, useRef, useState } from "react";

export function useMutationState() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const inFlight = useRef(false);

  const run = useCallback(async (action: () => Promise<void>) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setSaving(true);
    setError(false);
    try {
      await action();
    } catch {
      setError(true);
    } finally {
      inFlight.current = false;
      setSaving(false);
    }
  }, []);

  return { saving, error, run };
}
