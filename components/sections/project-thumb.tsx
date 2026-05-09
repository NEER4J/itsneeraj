import type { PatternId, ProjectThumb } from "@/lib/content";

/** CSS background-image string for a given pattern, on top of the base color. */
export function patternStyle(color: string, pattern: PatternId): React.CSSProperties {
  const stripe = "rgba(255,255,255,0.09)";
  const dot = "rgba(255,255,255,0.18)";
  switch (pattern) {
    case "dots":
      return {
        background: color,
        backgroundImage: `radial-gradient(${dot} 1.2px, transparent 1.4px)`,
        backgroundSize: "14px 14px",
      };
    case "lines":
      return {
        background: color,
        backgroundImage: `repeating-linear-gradient(45deg, transparent 0 7px, ${stripe} 7px 8px)`,
      };
    case "grid":
      return {
        background: color,
        backgroundImage: `linear-gradient(${stripe} 1px, transparent 1px), linear-gradient(90deg, ${stripe} 1px, transparent 1px)`,
        backgroundSize: "16px 16px, 16px 16px",
      };
    case "stripes":
      return {
        background: color,
        backgroundImage: `repeating-linear-gradient(0deg, transparent 0 9px, ${stripe} 9px 10px)`,
      };
    case "checks":
      return {
        background: color,
        backgroundImage: `linear-gradient(45deg, ${stripe} 25%, transparent 25%, transparent 75%, ${stripe} 75%), linear-gradient(45deg, ${stripe} 25%, transparent 25%, transparent 75%, ${stripe} 75%)`,
        backgroundSize: "14px 14px",
        backgroundPosition: "0 0, 7px 7px",
      };
  }
}

export function ProjectThumb({
  thumb,
  name,
}: {
  thumb: ProjectThumb;
  name: string;
}) {
  if (thumb.image) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-border bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb.image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full select-none"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-border"
      style={patternStyle(thumb.color, thumb.pattern)}
    >
      <div className="flex aspect-[16/9] flex-col justify-end p-3 text-white sm:aspect-[4/3]">
        <div className="text-[18px] font-semibold tracking-tight leading-tight">
          {name}
        </div>
      </div>
    </div>
  );
}
