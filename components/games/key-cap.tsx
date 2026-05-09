"use client";

import type React from "react";

/**
 * A small visual "key" — looks like a keyboard cap with a faint inner shadow
 * to feel pressable. Use `wide` for multi-character labels (space, enter…).
 */
export function KeyCap({
  children,
  wide = false,
  className = "",
}: {
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-[5px] border border-border bg-bg-elevated/95 font-mono text-[10px] font-medium uppercase tracking-wide text-fg ${
        wide ? "h-[20px] px-1.5 min-w-[28px]" : "h-[20px] w-[20px]"
      } ${className}`}
      style={{
        boxShadow:
          "inset 0 -1.5px 0 rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 0 rgba(0,0,0,0.18)",
      }}
    >
      {children}
    </span>
  );
}

/**
 * One row of: [keys] — label
 * Keys can be a list of KeyCap children, label is a short description.
 */
export function KeyRow({
  keys,
  label,
}: {
  keys: React.ReactNode;
  label: React.ReactNode;
}) {
  return (
    <>
      <span className="flex items-center gap-1">{keys}</span>
      <span className="self-center text-fg-soft">{label}</span>
    </>
  );
}
