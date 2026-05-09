"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { AudienceId } from "@/lib/content";

const STORAGE_KEY = "neeraj.audience";
const DEFAULT_AUDIENCE: AudienceId = "anyone";

type Ctx = {
  audience: AudienceId;
  setAudience: (id: AudienceId) => void;
};

const AudienceCtx = createContext<Ctx>({
  audience: DEFAULT_AUDIENCE,
  setAudience: () => {},
});

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [audience, setAudienceState] = useState<AudienceId>(DEFAULT_AUDIENCE);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as AudienceId | null;
      if (stored) setAudienceState(stored);
    } catch {}
  }, []);

  const setAudience = useCallback((id: AudienceId) => {
    setAudienceState(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {}
    if (id !== DEFAULT_AUDIENCE) {
      // Fire-and-forget collection. No PII, just the bucket they picked.
      fetch("/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audience: id, ts: Date.now() }),
      }).catch(() => {});
    }
  }, []);

  return <AudienceCtx.Provider value={{ audience, setAudience }}>{children}</AudienceCtx.Provider>;
}

export function useAudience() {
  return useContext(AudienceCtx);
}
