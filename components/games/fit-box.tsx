"use client";

/**
 * Constrains a child element to maintain `ratio` (width / height) while
 * filling the available flexbox space. Uses CSS container queries so it
 * recomputes on parent resize without any JS observer.
 *
 * Designed to be a child of a `flex flex-col` parent so `flex-1 min-h-0`
 * gives it a definite size for `cqw`/`cqh` to resolve against.
 */
export function FitBox({
  ratio = 1,
  children,
  className = "",
}: {
  ratio?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full flex-1 items-center justify-center overflow-hidden min-h-0 min-w-0 ${className}`}
      style={{ containerType: "size" }}
    >
      <div
        style={{
          width: `min(100cqw, calc(100cqh * ${ratio}))`,
          height: `min(100cqh, calc(100cqw / ${ratio}))`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
