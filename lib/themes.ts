export type ThemeId = "dark" | "light" | "terminal" | "cyber";
export type ThemePreference = ThemeId | "system";

export const THEMES: { id: ThemePreference; label: string; hint: string }[] = [
  { id: "system", label: "auto", hint: "follows your system theme." },
  { id: "dark", label: "dark", hint: "quiet & calm." },
  { id: "light", label: "light", hint: "paper-clean & bright." },
  { id: "terminal", label: "terminal", hint: "crt green. monospace." },
  { id: "cyber", label: "retro", hint: "70s sunshine palette." },
];

export const DEFAULT_PREFERENCE: ThemePreference = "system";
export const FALLBACK_THEME: ThemeId = "dark";
export const THEME_STORAGE_KEY = "neeraj.theme";
