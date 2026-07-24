"use client";

import { useRef, useState } from "react";
import type { ContribDay } from "./github";

type Cell = ContribDay | null;

const fmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function label(d: ContribDay) {
  const n = d.count === 1 ? "1 contribution" : `${d.count} contributions`;
  return `${fmt.format(new Date(d.date))} · ${n}`;
}

export function Activity({ days }: { days: ContribDay[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);

  if (!days.length) return null;

  // Pad the front so the first column starts on the correct weekday (Sun = 0),
  // then Tailwind's grid-flow-col + grid-rows-7 lays the days out as GitHub does.
  const firstDow = new Date(days[0].date).getDay();
  const cells: Cell[] = [...Array.from({ length: firstDow }, () => null), ...days];
  const total = days.reduce((s, d) => s + d.count, 0);

  function onEnter(e: React.MouseEvent<HTMLDivElement>, d: ContribDay) {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const cr = e.currentTarget.getBoundingClientRect();
    const pr = wrap.getBoundingClientRect();
    setTip({ x: cr.left - pr.left + cr.width / 2, y: cr.top - pr.top, text: label(d) });
  }

  return (
    <section className="v2-fade mt-20" style={{ animationDelay: "60ms" }}>
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="v2-label">activity</h2>
        <span className="text-[13px] text-[var(--v2-muted)]">
          {total.toLocaleString()} contributions in the last year
        </span>
      </div>

      <div ref={wrapRef} className="relative">
        <div className="no-scrollbar overflow-x-auto pb-1">
          <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
            {cells.map((c, i) =>
              c ? (
                <div
                  key={c.date}
                  onMouseEnter={(e) => onEnter(e, c)}
                  onMouseLeave={() => setTip(null)}
                  className="h-[11px] w-[11px] rounded-[2px] transition-colors"
                  style={{ background: `var(--gh${c.level})` }}
                />
              ) : (
                <div key={`pad-${i}`} className="h-[11px] w-[11px]" />
              ),
            )}
          </div>
        </div>

        {tip && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-[var(--v2-fg)] px-2.5 py-1 text-[12px] font-medium text-[var(--v2-bg)] shadow-sm"
            style={{ left: tip.x, top: tip.y - 8 }}
          >
            {tip.text}
          </div>
        )}
      </div>
    </section>
  );
}
