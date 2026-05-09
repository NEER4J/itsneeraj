"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  DEFAULT_PREFERENCE,
  FALLBACK_THEME,
  THEMES,
  THEME_STORAGE_KEY,
  type ThemeId,
  type ThemePreference,
} from "@/lib/themes";

type Ctx = {
  preference: ThemePreference;
  theme: ThemeId;
  setPreference: (id: ThemePreference) => void;
  cycle: () => void;
};

const ThemeCtx = createContext<Ctx>({
  preference: DEFAULT_PREFERENCE,
  theme: FALLBACK_THEME,
  setPreference: () => {},
  cycle: () => {},
});

function systemTheme(): ThemeId {
  if (typeof window === "undefined" || !window.matchMedia) return FALLBACK_THEME;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function resolve(pref: ThemePreference): ThemeId {
  return pref === "system" ? systemTheme() : pref;
}

function applyTheme(pref: ThemePreference, resolved: ThemeId) {
  const d = document.documentElement;
  d.setAttribute("data-theme", resolved);
  d.setAttribute("data-theme-pref", pref);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(DEFAULT_PREFERENCE);
  const [theme, setThemeState] = useState<ThemeId>(FALLBACK_THEME);

  // Sync from the pre-hydration <html> attributes set by ThemeScript.
  useEffect(() => {
    const d = document.documentElement;
    const prefAttr = d.getAttribute("data-theme-pref") as ThemePreference | null;
    const themeAttr = d.getAttribute("data-theme") as ThemeId | null;
    if (prefAttr) setPreferenceState(prefAttr);
    if (themeAttr) setThemeState(themeAttr);
  }, []);

  // When preference is "system", track OS-level changes live.
  useEffect(() => {
    if (preference !== "system" || typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      const next = mq.matches ? "light" : "dark";
      setThemeState(next);
      applyTheme("system", next);
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [preference]);

  const setPreference = useCallback((id: ThemePreference) => {
    const resolved = resolve(id);
    applyTheme(id, resolved);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {}
    setPreferenceState(id);
    setThemeState(resolved);
  }, []);

  const cycle = useCallback(() => {
    setPreferenceState((curr) => {
      const idx = THEMES.findIndex((t) => t.id === curr);
      const next = THEMES[(idx + 1) % THEMES.length].id;
      const resolved = resolve(next);
      applyTheme(next, resolved);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {}
      setThemeState(resolved);
      return next;
    });
  }, []);

  return (
    <ThemeCtx.Provider value={{ preference, theme, setPreference, cycle }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeCtx);
}
