"use client";

import {
  FlowerIcon,
  MoonStarsIcon,
  SunIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react";
import { THEMES, type ThemeId } from "@/lib/themes";
import { useTheme } from "./theme-provider";

type IconCmp = React.ComponentType<{
  size?: number;
  weight?: "regular" | "fill" | "bold";
}>;

const PALETTE: Record<
  ThemeId,
  { bg: string; fg: string; accent: string; icon: IconCmp }
> = {
  dark: { bg: "#0b0b0c", fg: "#f3f3f1", accent: "#f3f3f1", icon: MoonStarsIcon },
  light: { bg: "#ffffff", fg: "#18181b", accent: "#18181b", icon: SunIcon },
  terminal: {
    bg: "#050a05",
    fg: "#4dff7a",
    accent: "#4dff7a",
    icon: TerminalWindowIcon,
  },
  cyber: {
    bg: "conic-gradient(from 200deg at 50% 50%, #ffc926 0deg, #ffc926 60deg, #f96015 60deg, #f96015 120deg, #d52518 120deg, #d52518 180deg, #18542a 180deg, #18542a 240deg, #9ABC05 240deg, #9ABC05 300deg, #f3e8cc 300deg, #f3e8cc 360deg)",
    fg: "#18542a",
    accent: "#d52518",
    icon: FlowerIcon,
  },
};

export function ThemeStrip() {
  const { preference, setPreference } = useTheme();

  const visible = THEMES.filter(
    (t): t is { id: ThemeId; label: string; hint: string } => t.id !== "system",
  );

  return (
    <div className="grid h-full grid-cols-4 items-center gap-2">
      {visible.map((t) => {
        const p = PALETTE[t.id];
        const Icon = p.icon;
        const active = t.id === preference;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => setPreference(t.id)}
            aria-label={`switch to ${t.label}`}
            aria-pressed={active}
            title={t.hint}
            className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-md transition-transform duration-300 hover:scale-105"
            style={{ background: p.bg, color: p.fg }}
          >
            <Icon size={18} weight={active ? "fill" : "regular"} />
            {active && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-md"
                style={{ boxShadow: `inset 0 0 0 2px ${p.accent}` }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
