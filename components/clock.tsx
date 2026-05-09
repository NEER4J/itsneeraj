"use client";

import { useEffect, useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getTimeZoneAbbr(d: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZoneName: "short",
  }).formatToParts(d);
  const tz = parts.find((p) => p.type === "timeZoneName")?.value;
  return tz ?? "";
}

export function Clock({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!now) {
    return (
      <div
        className="font-mono tabular-nums text-fg-soft"
        suppressHydrationWarning
        aria-hidden
      >
        --:--
      </div>
    );
  }

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const day = DAYS[now.getDay()];
  const date = String(now.getDate()).padStart(2, "0");
  const month = now.toLocaleString("en-US", { month: "short" }).toLowerCase();
  const tz = getTimeZoneAbbr(now);

  if (compact) {
    return (
      <span className="font-mono tabular-nums text-[11px] text-fg-soft">
        {hh}:{mm}
      </span>
    );
  }

  return (
    <div className="flex h-full select-none items-center justify-between gap-3">
      <div className="flex items-baseline gap-0.5 font-mono tabular-nums leading-none">
        <span className="text-[26px] font-medium tracking-tight text-fg">
          {hh}
        </span>
        <span className="text-[20px] text-muted blink">:</span>
        <span className="text-[26px] font-medium tracking-tight text-fg">
          {mm}
        </span>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {day} · {date} {month}
        </span>
        {tz && (
          <span className="rounded bg-bg px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-soft">
            {tz}
          </span>
        )}
      </div>
    </div>
  );
}
