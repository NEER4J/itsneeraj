"use client";

import { motion } from "framer-motion";
import { AUDIENCES } from "@/lib/content";
import { useAudience } from "./audience-provider";

export function AudienceTabs() {
  const { audience, setAudience } = useAudience();

  return (
    <div className="no-scrollbar -mx-1 flex flex-nowrap items-center gap-x-4 overflow-x-auto pb-1 pt-1 sm:flex-wrap sm:gap-x-5 sm:gap-y-1">
      {AUDIENCES.map((a) => {
        const active = a.id === audience;
        return (
          <button
            key={a.id}
            type="button"
            onClick={() => setAudience(a.id)}
            className="group relative shrink-0 py-2 text-[13px] tracking-tight transition-colors"
            aria-pressed={active}
          >
            <span className={active ? "text-fg" : "text-muted group-hover:text-fg-soft"}>
              {a.label}
            </span>
            {active && (
              <motion.span
                layoutId="aud-underline"
                className="absolute bottom-1 left-0 right-0 h-px bg-fg"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
