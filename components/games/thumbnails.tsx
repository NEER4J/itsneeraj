"use client";

import { useEffect, useRef, useState } from "react";

/* ─── shared frame & fit helper ────────────────────────────── */

function ThumbFrame({
  children,
  bg = "var(--bg-elevated)",
  className = "",
}: {
  children: React.ReactNode;
  bg?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: bg, containerType: "size" }}
    >
      {children}
    </div>
  );
}

/**
 * Centered inner box that fits within parent (which must be a `containerType: size`),
 * sized to the given aspect ratio so its content never gets cropped or cut off.
 * `marginPct` is the symmetric padding around the inner box, in cqmin units.
 */
function FitInner({
  ratio,
  marginPct = 6,
  children,
}: {
  ratio: number;
  marginPct?: number;
  children: React.ReactNode;
}) {
  const avail = 100 - 2 * marginPct;
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div
        className="pointer-events-auto"
        style={{
          width: `min(${avail}cqw, calc(${avail}cqh * ${ratio}))`,
          height: `min(${avail}cqh, calc(${avail}cqw / ${ratio}))`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

type ThumbProps = { playing?: boolean };

/* ─── snake ─────────────────────────────────────────────────── */

const SNAKE_COLS = 12;
const SNAKE_ROWS = 10;

const SNAKE_INITIAL = [
  { x: 4, y: 5 },
  { x: 3, y: 5 },
  { x: 2, y: 5 },
  { x: 1, y: 5 },
];

export function SnakeThumb({ playing = false }: ThumbProps) {
  const [snake, setSnake] = useState(SNAKE_INITIAL);
  const [food, setFood] = useState({ x: 9, y: 5 });
  const dirRef = useRef<"r" | "l" | "u" | "d">("r");

  useEffect(() => {
    const tickMs = playing ? 180 : 520;
    const id = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        let { x, y } = head;
        const d = dirRef.current;
        if (d === "r") x++;
        if (d === "l") x--;
        if (d === "u") y--;
        if (d === "d") y++;
        if (x >= SNAKE_COLS - 1 && d === "r") dirRef.current = "d";
        else if (y >= SNAKE_ROWS - 1 && d === "d") dirRef.current = "l";
        else if (x <= 0 && d === "l") dirRef.current = "u";
        else if (y <= 0 && d === "u") dirRef.current = "r";
        x = Math.max(0, Math.min(SNAKE_COLS - 1, x));
        y = Math.max(0, Math.min(SNAKE_ROWS - 1, y));
        const newHead = { x, y };
        const ate = x === food.x && y === food.y;
        const body = ate ? prev : prev.slice(0, -1);
        if (ate) {
          setFood({
            x: 1 + Math.floor(Math.random() * (SNAKE_COLS - 2)),
            y: 1 + Math.floor(Math.random() * (SNAKE_ROWS - 2)),
          });
        }
        return [newHead, ...body];
      });
    }, tickMs);
    return () => clearInterval(id);
  }, [playing, food]);

  return (
    <ThumbFrame>
      {/* faint dotted backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "10% 12%",
        }}
      />
      <FitInner ratio={SNAKE_COLS / SNAKE_ROWS} marginPct={6}>
        <div
          className="grid h-full w-full"
          style={{
            gridTemplateColumns: `repeat(${SNAKE_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${SNAKE_ROWS}, 1fr)`,
            gap: "4%",
          }}
        >
          {Array.from({ length: SNAKE_ROWS }).map((_, y) =>
            Array.from({ length: SNAKE_COLS }).map((__, x) => {
              const idx = snake.findIndex((s) => s.x === x && s.y === y);
              const isHead = idx === 0;
              const onSnake = idx >= 0;
              const isFood = food.x === x && food.y === y;
              const fade = onSnake ? Math.max(0.4, 1 - idx * 0.06) : 1;
              return (
                <div
                  key={`${y}-${x}`}
                  className="rounded-[2px] transition-colors duration-200"
                  style={{
                    background: onSnake
                      ? isHead
                        ? "var(--fg)"
                        : "var(--fg-soft)"
                      : isFood
                      ? "var(--accent)"
                      : "transparent",
                    opacity: onSnake ? fade : 1,
                    boxShadow: isFood
                      ? "0 0 6px var(--accent)"
                      : isHead
                      ? "0 0 4px var(--fg)"
                      : undefined,
                  }}
                />
              );
            }),
          )}
        </div>
      </FitInner>
    </ThumbFrame>
  );
}

/* ─── tetris ────────────────────────────────────────────────── */

const TETRIS_COLS = 6;
const TETRIS_ROWS = 8;
const TET_COLORS = [
  "#22d3ee",
  "#facc15",
  "#a78bfa",
  "#34d399",
  "#f87171",
  "#3b82f6",
  "#fb923c",
];

type Block = { x: number; y: number; color: string };

export function TetrisThumb({ playing = false }: ThumbProps) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [falling, setFalling] = useState<Block | null>(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    function spawn() {
      const x = Math.floor(Math.random() * TETRIS_COLS);
      const color = TET_COLORS[Math.floor(Math.random() * TET_COLORS.length)];
      setFalling({ x, y: 0, color });
    }
    if (!falling) spawn();
    const tickMs = playing ? 170 : 480;
    const id = setInterval(() => {
      setFalling((f) => {
        if (!f) {
          spawn();
          return null;
        }
        const nextY = f.y + 1;
        const stackHeight = blocks.filter((b) => b.x === f.x).length;
        const maxY = TETRIS_ROWS - 1 - stackHeight;
        if (nextY > maxY) {
          setBlocks((prev) => {
            const next = [...prev, { ...f, y: maxY }];
            if (next.length >= TETRIS_COLS * TETRIS_ROWS - 6) {
              setFlash(true);
              setTimeout(() => setFlash(false), 200);
              return [];
            }
            return next;
          });
          spawn();
          return null;
        }
        return { ...f, y: nextY };
      });
    }, tickMs);
    return () => clearInterval(id);
  }, [playing, blocks, falling]);

  const cells: Block[] = [...blocks, ...(falling ? [falling] : [])];

  return (
    <ThumbFrame bg="#0b0b10">
      <FitInner ratio={TETRIS_COLS / TETRIS_ROWS} marginPct={6}>
        <div
          className="grid h-full w-full rounded-[3px]"
          style={{
            gridTemplateColumns: `repeat(${TETRIS_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${TETRIS_ROWS}, 1fr)`,
            gap: "4%",
          }}
        >
          {Array.from({ length: TETRIS_ROWS }).map((_, y) =>
            Array.from({ length: TETRIS_COLS }).map((__, x) => {
              const cell = cells.find((c) => c.x === x && c.y === y);
              return (
                <div
                  key={`${y}-${x}`}
                  className="rounded-[2px]"
                  style={{
                    background: flash
                      ? "rgba(255,255,255,0.9)"
                      : cell?.color ?? "rgba(255,255,255,0.04)",
                    boxShadow: cell
                      ? `inset 0 -2px 0 rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.18)`
                      : undefined,
                    transition: "background-color 80ms ease",
                  }}
                />
              );
            }),
          )}
        </div>
      </FitInner>
      {/* glassy reflection */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05), transparent)",
        }}
      />
    </ThumbFrame>
  );
}

/* ─── wordle ────────────────────────────────────────────────── */

const WORDLE_DEMO = [
  { letters: "REACT", states: ["correct", "absent", "present", "absent", "absent"] },
  { letters: "ROBOT", states: ["correct", "absent", "absent", "absent", "absent"] },
  { letters: "RIGHT", states: ["correct", "correct", "correct", "correct", "correct"] },
];

const WORDLE_ROWS = 5;
const WORDLE_COLS = 5;

export function WordleThumb({ playing = false }: ThumbProps) {
  const [step, setStep] = useState(0);
  const [reveal, setReveal] = useState(0);

  useEffect(() => {
    const tickMs = playing ? 240 : 680;
    const id = setInterval(() => {
      setReveal((r) => {
        if (r >= 5) {
          setStep((s) => (s + 1) % WORDLE_DEMO.length);
          return 0;
        }
        return r + 1;
      });
    }, tickMs);
    return () => clearInterval(id);
  }, [playing]);

  const visibleRows = Array.from({ length: WORDLE_ROWS }).map((_, ri) => {
    if (ri < step) return WORDLE_DEMO[ri] ?? null;
    if (ri === step) return WORDLE_DEMO[step];
    return null;
  });

  return (
    <ThumbFrame>
      <FitInner ratio={WORDLE_COLS / WORDLE_ROWS} marginPct={8}>
        <div
          className="grid h-full w-full"
          style={{
            gridTemplateRows: `repeat(${WORDLE_ROWS}, 1fr)`,
            gridTemplateColumns: `repeat(${WORDLE_COLS}, 1fr)`,
            gap: "5%",
          }}
        >
          {visibleRows.flatMap((row, ri) => {
            const isCurrent = ri === step;
            return Array.from({ length: 5 }).map((_, ci) => {
              const ch = row?.letters[ci] ?? "";
              const finalState = row?.states[ci] ?? "empty";
              const revealed = !row ? false : isCurrent ? ci < reveal : true;
              const state = revealed ? finalState : "empty";
              return (
                <div
                  key={`${ri}-${ci}`}
                  className="flex items-center justify-center rounded-[3px] font-bold uppercase"
                  style={{
                    fontSize: "min(4cqw, 12px)",
                    background:
                      state === "correct"
                        ? "#3aa55c"
                        : state === "present"
                        ? "#c9a02f"
                        : state === "absent"
                        ? "var(--muted)"
                        : "transparent",
                    border:
                      state === "empty"
                        ? "1px solid var(--border)"
                        : "1px solid transparent",
                    color: state === "empty" ? "var(--muted)" : "white",
                    opacity: !row ? 0.5 : 1,
                    transform: revealed ? "scale(1)" : "scale(0.94)",
                    transition: "all 220ms ease",
                  }}
                >
                  {revealed ? ch : ""}
                </div>
              );
            });
          })}
        </div>
      </FitInner>
    </ThumbFrame>
  );
}

/* ─── dino ──────────────────────────────────────────────────── */

type Cloud = { x: number; y: number; speed: number; r: number };

const DINO_VIEW_W = 200;
const DINO_VIEW_H = 120;
const DINO_GROUND_Y = 92;

export function DinoThumb({ playing = false }: ThumbProps) {
  const [t, setT] = useState(0);
  const [jumpY, setJumpY] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [clouds, setClouds] = useState<Cloud[]>([
    { x: 30, y: 28, speed: 0.3, r: 6 },
    { x: 110, y: 18, speed: 0.25, r: 8 },
    { x: 170, y: 34, speed: 0.35, r: 5 },
  ]);

  useEffect(() => {
    const tickMs = playing ? 50 : 110;
    const stepPx = playing ? 4 : 2;
    const id = setInterval(() => {
      setT((v) => (v + stepPx) % 200);
      setClouds((cs) =>
        cs.map((c) => {
          const nx = c.x - c.speed * (playing ? 1.4 : 0.8);
          return { ...c, x: nx < -10 ? DINO_VIEW_W : nx };
        }),
      );
    }, tickMs);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    const cactusX = 180 - t;
    if (cactusX < 60 && cactusX > 30 && !jumping) {
      setJumping(true);
      let v = -3.6;
      let y = 0;
      const id = setInterval(() => {
        v += 0.32;
        y += v;
        if (y >= 0) {
          y = 0;
          clearInterval(id);
          setJumping(false);
        }
        setJumpY(y);
      }, 24);
      return () => clearInterval(id);
    }
  }, [t, jumping]);

  const stripeOffset = -((t * 1.4) % 12);

  return (
    <ThumbFrame bg="linear-gradient(180deg, rgba(99,102,241,0.10) 0%, rgba(99,102,241,0.04) 55%, transparent 75%)">
      <svg
        viewBox={`0 0 ${DINO_VIEW_W} ${DINO_VIEW_H}`}
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-0 h-full w-full"
      >
        {/* sun */}
        <circle cx="160" cy="32" r="9" fill="var(--accent)" opacity="0.35" />
        <circle cx="160" cy="32" r="5" fill="var(--accent)" opacity="0.6" />

        {/* far mountains */}
        {[
          { x: 0, h: 28 },
          { x: 50, h: 22 },
          { x: 100, h: 32 },
          { x: 150, h: 24 },
          { x: 200, h: 30 },
        ].map((m, i) => {
          const baseY = DINO_GROUND_Y;
          const x = (((m.x - t * 0.25) % 220) + 220) % 220 - 20;
          return (
            <polygon
              key={i}
              points={`${x},${baseY} ${x + 30},${baseY - m.h} ${x + 60},${baseY}`}
              fill="var(--muted)"
              opacity="0.25"
            />
          );
        })}

        {/* clouds */}
        {clouds.map((c, i) => (
          <g key={i} fill="var(--fg-soft)" opacity="0.45">
            <circle cx={c.x} cy={c.y} r={c.r} />
            <circle cx={c.x + c.r * 0.8} cy={c.y + 1} r={c.r * 0.85} />
            <circle cx={c.x - c.r * 0.7} cy={c.y + 1.5} r={c.r * 0.7} />
          </g>
        ))}

        {/* ground line + dashed stripes */}
        <line
          x1="0"
          y1={DINO_GROUND_Y}
          x2={DINO_VIEW_W}
          y2={DINO_GROUND_Y}
          stroke="var(--muted)"
          strokeWidth="0.6"
        />
        <g stroke="var(--muted)" strokeWidth="0.5" opacity="0.6">
          {Array.from({ length: 22 }).map((_, i) => (
            <line
              key={i}
              x1={stripeOffset + i * 12}
              y1={DINO_GROUND_Y + 4}
              x2={stripeOffset + i * 12 + 6}
              y2={DINO_GROUND_Y + 4}
            />
          ))}
        </g>

        {/* dino */}
        <g
          transform={`translate(35 ${DINO_GROUND_Y - 10 + jumpY})`}
          fill="var(--fg)"
        >
          <rect x="6" y="0" width="12" height="9" />
          <rect x="2" y="6" width="14" height="6" />
          <rect x="-2" y="8" width="4" height="3" />
          <rect x="3" y="11" width="3" height="3" />
          <rect x="11" y="11" width="3" height="3" />
          <rect x="14" y="2" width="2" height="2" fill="var(--bg-elevated)" />
        </g>

        {/* cactus */}
        <g transform={`translate(${180 - t} ${DINO_GROUND_Y - 18})`} fill="var(--fg)">
          <rect x="0" y="0" width="6" height="18" />
          <rect x="-2" y="4" width="2" height="6" />
          <rect x="6" y="4" width="2" height="6" />
        </g>

        {/* second far cactus */}
        <g
          transform={`translate(${(((180 - t * 0.6 - 80) % 240) + 240) % 240 - 40} ${DINO_GROUND_Y - 14})`}
          fill="var(--fg)"
          opacity="0.7"
        >
          <rect x="0" y="0" width="4" height="14" />
          <rect x="-1.5" y="3" width="1.5" height="5" />
        </g>
      </svg>
    </ThumbFrame>
  );
}
