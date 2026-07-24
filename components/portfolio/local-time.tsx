"use client";

import { useEffect, useState } from "react";

// Live clock pinned to Neeraj's timezone, so it reads the same for every
// visitor regardless of where they are.
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 1000 * 30);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      IST{time ? ` ${time}` : ""}
    </span>
  );
}
