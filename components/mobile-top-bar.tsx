"use client";

import {
  FlowerIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MoonStarsIcon,
  SunIcon,
  TerminalWindowIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { META } from "@/lib/content";
import { THEMES, type ThemeId } from "@/lib/themes";
import { useTheme } from "./theme-provider";

type IconCmp = React.ComponentType<{
  size?: number;
  weight?: "regular" | "fill" | "bold";
}>;

const THEME_ICON: Record<ThemeId, IconCmp> = {
  dark: MoonStarsIcon,
  light: SunIcon,
  terminal: TerminalWindowIcon,
  cyber: FlowerIcon,
};

const SOCIAL_ICON: Record<
  string,
  React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill" }>
> = {
  linkedin: LinkedinLogoIcon,
  github: GithubLogoIcon,
  "x / twitter": XLogoIcon,
  instagram: InstagramLogoIcon,
};

export function MobileTopBar() {
  const { theme, setPreference } = useTheme();
  const explicit = THEMES.filter(
    (t): t is { id: ThemeId; label: string; hint: string } => t.id !== "system",
  );
  const cycleTheme = () => {
    const idx = explicit.findIndex((t) => t.id === theme);
    setPreference(explicit[(idx + 1) % explicit.length].id);
  };
  const ThemeIcon = THEME_ICON[theme];

  return (
    <div
      className="flex items-center justify-between gap-2 border-b border-border bg-bg px-4 py-2.5"
      style={{ paddingTop: "max(0.625rem, env(safe-area-inset-top))" }}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        © Code by Neeraj
      </div>
      <div className="flex items-center gap-1">
        {META.links.map((l) => {
          const Icon = SOCIAL_ICON[l.label];
          if (!Icon) return null;
          return (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label}
              className="grid h-9 w-9 place-items-center rounded-full text-fg-soft transition-colors active:bg-bg-elevated"
            >
              <Icon size={16} weight="regular" />
            </a>
          );
        })}
        <button
          type="button"
          onClick={cycleTheme}
          aria-label={`switch theme (current: ${theme})`}
          className="grid h-9 w-9 place-items-center rounded-full text-fg-soft transition-colors active:bg-bg-elevated"
        >
          <ThemeIcon size={16} weight="regular" />
        </button>
      </div>
    </div>
  );
}
