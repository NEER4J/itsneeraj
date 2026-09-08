"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  { id: "hello", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "about", label: "Experience" },
  { id: "now", label: "Now" },
  { id: "contact", label: "Contact" },
];

export function SideNav() {
  const [active, setActive] = useState("hello");

  useEffect(() => {
    const els = ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!els.length) return;

    let raf = 0;
    let current = "";

    const compute = () => {
      raf = 0;
      // The active section is the last one whose top has crossed a reference
      // line ~35% down the viewport. This stays correct for short sections
      // (which never fully span a thin band) at the top, middle, and bottom.
      const line = window.innerHeight * 0.35;
      let id = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) id = el.id;
      }
      // Snap to the final section once scrolled to the very bottom, since a
      // short last section may never reach the line.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) id = els[els.length - 1].id;
      if (id !== current) {
        current = id;
        setActive(id);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-y-0 left-8 z-40 hidden items-center lg:flex xl:left-12">
      <nav className="v2-fade pointer-events-auto flex flex-col gap-1" aria-label="Sections">
        {ITEMS.map((it) => {
          const on = active === it.id;
          return (
            <a
              key={it.id}
              href={`#${it.id}`}
              aria-current={on ? "true" : undefined}
              className="group flex items-center gap-2.5 py-1"
            >
              <span
                className={`h-px transition-all duration-300 ${
                  on
                    ? "w-6 bg-[var(--v2-fg)]"
                    : "w-3 bg-[var(--v2-faint)] group-hover:w-5 group-hover:bg-[var(--v2-fg-soft)]"
                }`}
              />
              <span
                className={`font-[family-name:var(--v2-mono)] text-[10px] uppercase tracking-[0.16em] transition-colors ${
                  on
                    ? "text-[var(--v2-fg)]"
                    : "text-[var(--v2-faint)] group-hover:text-[var(--v2-fg-soft)]"
                }`}
              >
                {it.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
