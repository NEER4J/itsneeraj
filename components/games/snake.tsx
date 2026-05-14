"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FitBox } from "./fit-box";
import { KeyCap, KeyRow } from "./key-cap";

type Pt = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";

const COLS = 20;
const ROWS = 20;
const TICK_MS = 140;

function rand(max: number) {
  return Math.floor(Math.random() * max);
}

function newFood(snake: Pt[]): Pt {
  while (true) {
    const f = { x: rand(COLS), y: rand(ROWS) };
    if (!snake.some((s) => s.x === f.x && s.y === f.y)) return f;
  }
}

const OPPOSITE: Record<Dir, Dir> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

const KEY_TO_DIR: Record<string, Dir> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
  W: "up",
  S: "down",
  A: "left",
  D: "right",
};

export function SnakeGame({ compact = false }: { compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Pt[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [food, setFood] = useState<Pt>({ x: 14, y: 10 });
  const [, setDir] = useState<Dir>("right");
  const dirRef = useRef<Dir>("right");
  const queuedDirRef = useRef<Dir | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState(false);
  const foodPulseRef = useRef(0);

  useEffect(() => {
    try {
      const v = Number(localStorage.getItem("snake.best") ?? "0");
      if (Number.isFinite(v)) setBest(v);
    } catch {}
  }, []);

  const reset = useCallback(() => {
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ]);
    setFood({ x: 14, y: 10 });
    setDir("right");
    dirRef.current = "right";
    queuedDirRef.current = null;
    setScore(0);
    setOver(false);
    setRunning(true);
  }, []);

  // Keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === " ") {
        e.preventDefault();
        if (over) reset();
        else setRunning((r) => !r);
        return;
      }
      const next = KEY_TO_DIR[e.key];
      if (!next) return;
      e.preventDefault();
      if (next === OPPOSITE[dirRef.current]) return;
      queuedDirRef.current = next;
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [over, reset]);

  // Game loop
  useEffect(() => {
    if (!running || over) return;
    const id = setInterval(() => {
      setSnake((prev) => {
        const queued = queuedDirRef.current;
        const d = queued ?? dirRef.current;
        dirRef.current = d;
        queuedDirRef.current = null;
        setDir(d);

        const head = prev[0];
        const raw = {
          x: head.x + (d === "left" ? -1 : d === "right" ? 1 : 0),
          y: head.y + (d === "up" ? -1 : d === "down" ? 1 : 0),
        };
        // Walls wrap around, only self-collision ends the game.
        const next = {
          x: ((raw.x % COLS) + COLS) % COLS,
          y: ((raw.y % ROWS) + ROWS) % ROWS,
        };

        if (prev.some((s) => s.x === next.x && s.y === next.y)) {
          setOver(true);
          setRunning(false);
          setBest((b) => {
            const newBest = Math.max(b, score);
            try {
              localStorage.setItem("snake.best", String(newBest));
            } catch {}
            return newBest;
          });
          return prev;
        }

        const ate = next.x === food.x && next.y === food.y;
        const body = ate ? prev : prev.slice(0, -1);
        const newSnake = [next, ...body];
        if (ate) {
          setScore((s) => s + 1);
          setFood(newFood(newSnake));
        }
        return newSnake;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [running, over, food, score]);

  // Render, animated via rAF for the food pulse
  useEffect(() => {
    let raf = 0;
    const draw = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Fixed "arcade screen" palette so the canvas is always visually
          // distinct from the surrounding themed card.
          const fg = "#f3f3f1";
          const fgSoft = "#c8c8c4";
          const accent = "#ff5252";
          const border = "#2a2a32";
          const bg = "#08080c";
          const bgEl = "#15151c";

          const W = canvas.width;
          const H = canvas.height;
          const cell = W / COLS;

          // gradient backdrop
          const grad = ctx.createLinearGradient(0, 0, 0, H);
          grad.addColorStop(0, bgEl);
          grad.addColorStop(1, bg);
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, W, H);

          // dotted grid (subtle)
          ctx.fillStyle = border;
          ctx.globalAlpha = 0.45;
          for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
              ctx.beginPath();
              ctx.arc(x * cell + cell / 2, y * cell + cell / 2, 0.8, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.globalAlpha = 1;

          // food with pulsing halo
          foodPulseRef.current = (foodPulseRef.current + 0.06) % (Math.PI * 2);
          const pulse = 0.5 + 0.5 * Math.sin(foodPulseRef.current);
          const cx = food.x * cell + cell / 2;
          const cy = food.y * cell + cell / 2;
          const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, cell * 1.1);
          halo.addColorStop(0, accent + "aa");
          halo.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(cx, cy, cell * (0.7 + 0.18 * pulse), 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(cx, cy, cell * 0.32, 0, Math.PI * 2);
          ctx.fill();

          // snake, rounded segments with gradient
          snake.forEach((s, i) => {
            const r = cell * 0.32;
            const x = s.x * cell + cell / 2;
            const y = s.y * cell + cell / 2;
            const t = Math.max(0.35, 1 - i * 0.025);
            ctx.fillStyle = i === 0 ? fg : fgSoft;
            ctx.globalAlpha = t;
            roundRect(
              ctx,
              s.x * cell + 1.5,
              s.y * cell + 1.5,
              cell - 3,
              cell - 3,
              r,
            );
            ctx.fill();
            // eye on head
            if (i === 0) {
              const d = dirRef.current;
              const ex = x + (d === "right" ? cell * 0.18 : d === "left" ? -cell * 0.18 : 0);
              const ey = y + (d === "down" ? cell * 0.18 : d === "up" ? -cell * 0.18 : 0);
              ctx.fillStyle = bgEl;
              ctx.globalAlpha = 1;
              ctx.beginPath();
              ctx.arc(ex, ey, cell * 0.09, 0, Math.PI * 2);
              ctx.fill();
            }
          });
          ctx.globalAlpha = 1;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [snake, food]);

  function nudge(d: Dir) {
    if (d === OPPOSITE[dirRef.current]) return;
    queuedDirRef.current = d;
    if (!running && !over) setRunning(true);
  }

  const Hud = (
    <div className="flex items-center justify-between">
      <div className="flex gap-3 font-mono text-[11px]">
        <span>
          <span className="text-muted">score </span>
          <span className="tabular-nums">{score}</span>
        </span>
        <span>
          <span className="text-muted">best </span>
          <span className="tabular-nums">{best}</span>
        </span>
      </div>
      <button
        type="button"
        onClick={() => {
          if (over) reset();
          else setRunning((r) => !r);
        }}
        className="rounded-full border border-border px-2.5 py-0.5 text-[10px] hover:border-fg-soft hover:text-fg text-fg-soft transition-colors"
      >
        {over ? "restart" : running ? "pause" : "play"}
      </button>
    </div>
  );

  return (
    <div className="flex h-full flex-col items-stretch select-none gap-2">
      {Hud}

      <FitBox ratio={1}>
        <SnakeBoard
          canvasRef={canvasRef}
          running={running}
          over={over}
          score={score}
          onReset={reset}
          small={compact}
        />
      </FitBox>

      {/* Always-visible D-pad, fills empty space below square canvas
          and gives touch users explicit controls. */}
      <div
        className={`mx-auto grid w-full grid-cols-3 ${
          compact ? "max-w-[200px] gap-1" : "max-w-[280px] gap-1.5"
        }`}
      >
        <span />
        <DpadBtn label="↑" onClick={() => nudge("up")} compact={compact} />
        <span />
        <DpadBtn label="←" onClick={() => nudge("left")} compact={compact} />
        <DpadBtn label="↓" onClick={() => nudge("down")} compact={compact} />
        <DpadBtn label="→" onClick={() => nudge("right")} compact={compact} />
      </div>
    </div>
  );
}

function SnakeBoard({
  canvasRef,
  running,
  over,
  score,
  onReset,
  small,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  running: boolean;
  over: boolean;
  score: number;
  onReset: () => void;
  small?: boolean;
}) {
  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="h-full w-full rounded-xl"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px -10px rgba(0,0,0,0.5)",
        }}
      />
      {!running && !over && score === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-bg/80 backdrop-blur-[3px] text-center px-3">
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            press
            <KeyCap wide>space</KeyCap>
            to start
          </div>
          <div className="grid grid-cols-[auto_auto] items-center gap-x-2.5 gap-y-1 text-[10px]">
            <KeyRow
              keys={
                <>
                  <KeyCap>←</KeyCap>
                  <KeyCap>↑</KeyCap>
                  <KeyCap>↓</KeyCap>
                  <KeyCap>→</KeyCap>
                </>
              }
              label="move"
            />
            {!small && (
              <KeyRow keys={<KeyCap wide>space</KeyCap>} label="pause" />
            )}
          </div>
        </div>
      )}
      {over && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-bg/85 backdrop-blur text-center">
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
            game over
          </div>
          <div className="text-2xl font-semibold tabular-nums tracking-tight">
            {score}
          </div>
          <button
            type="button"
            onClick={onReset}
            className="rounded-full bg-accent px-3 py-1 text-[11px] text-accent-fg"
          >
            try again
          </button>
        </div>
      )}
    </div>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function DpadBtn({
  label,
  onClick,
  compact = false,
}: {
  label: string;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`aspect-square rounded-xl border border-border bg-bg-elevated font-mono active:bg-accent active:text-accent-fg transition-colors ${
        compact ? "text-base" : "text-xl"
      }`}
    >
      {label}
    </button>
  );
}
