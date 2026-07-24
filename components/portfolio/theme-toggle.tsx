"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "neeraj.v2.theme";
type Mode = "light" | "dark";

type ViewTransitionDocument = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

function systemMode(): Mode {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(mode: Mode) {
  document.documentElement.setAttribute("data-v2-theme", mode);
}

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("light");
  const [ready, setReady] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Sync from whatever the pre-paint script already applied (external state:
  // the DOM attribute + localStorage), so the icon reflects the live theme.
  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-v2-theme") as Mode | null;
    let stored: Mode | null = null;
    try {
      stored = localStorage.getItem(KEY) as Mode | null;
    } catch {}
    const resolved = attr ?? stored ?? systemMode();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from external DOM/storage on mount
    setMode(resolved);
    setReady(true);
  }, []);

  function commit(next: Mode) {
    apply(next);
    setMode(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  }

  function toggle() {
    const next: Mode = mode === "dark" ? "light" : "dark";
    const doc = document as ViewTransitionDocument;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // No View Transitions support (or reduced motion): flip instantly.
    if (!doc.startViewTransition || reduce) {
      commit(next);
      return;
    }

    // Origin of the reveal = center of the toggle button.
    const rect = btnRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 40;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // Lightweight circular reveal: animate clip-path on the new-theme snapshot.
    // clip-path is compositor-friendly (unlike an animated blurred mask), so
    // the switch stays smooth even on a content-heavy page.
    const transition = doc.startViewTransition(() => commit(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 420,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={toggle}
      aria-label={mode === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-11 w-11 place-items-center text-[var(--v2-fg-soft)] transition-colors hover:text-[var(--v2-fg)]"
      style={{ opacity: ready ? 1 : 0 }}
    >
      {mode === "dark" ? (
        // sun
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        // moon
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
