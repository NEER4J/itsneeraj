"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FitBox } from "./fit-box";
import { KeyCap, KeyRow } from "./key-cap";

const W = 480;
const H = 360;
const GROUND_Y = 300;
const DINO_X = 50;
const DINO_W = 28;
const DINO_H = 32;
const GRAVITY = 0.6;
const JUMP_V = -12;
const START_SPEED = 3.6;
const SPEED_INC = 0.0009;
const MAX_SPEED = 9;
// Approx ground-to-ground frames for a jump.
const JUMP_FRAMES = (2 * Math.abs(JUMP_V)) / GRAVITY;

type Obstacle = { x: number; w: number; h: number };
type Cloud = { x: number; y: number; r: number; speed: number };
type Mountain = { x: number; h: number; w: number };

export function DinoGame({ compact = false }: { compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    y: GROUND_Y - DINO_H,
    vy: 0,
    obstacles: [] as Obstacle[],
    speed: START_SPEED,
    distance: 0,
    nextSpawn: 80,
    legFrame: 0,
    legTimer: 0,
    clouds: [
      { x: 60, y: 80, r: 11, speed: 0.18 },
      { x: 220, y: 50, r: 14, speed: 0.14 },
      { x: 360, y: 100, r: 9, speed: 0.22 },
      { x: 460, y: 70, r: 12, speed: 0.16 },
      { x: 140, y: 130, r: 8, speed: 0.2 },
    ] as Cloud[],
    mountains: [
      { x: 0, h: 90, w: 140 },
      { x: 110, h: 60, w: 100 },
      { x: 220, h: 110, w: 150 },
      { x: 360, h: 70, w: 120 },
      { x: 480, h: 85, w: 130 },
    ] as Mountain[],
  });
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    try {
      const v = Number(localStorage.getItem("dino.best") ?? "0");
      if (Number.isFinite(v)) setBest(v);
    } catch {}
  }, []);

  const reset = useCallback(() => {
    stateRef.current = {
      ...stateRef.current,
      y: GROUND_Y - DINO_H,
      vy: 0,
      obstacles: [],
      speed: START_SPEED,
      distance: 0,
      nextSpawn: 80,
      legFrame: 0,
      legTimer: 0,
    };
    setScore(0);
    setOver(false);
    setRunning(true);
  }, []);

  const jump = useCallback(() => {
    const s = stateRef.current;
    if (s.y >= GROUND_Y - DINO_H - 0.5) {
      s.vy = JUMP_V;
    }
  }, []);

  // Game loop
  useEffect(() => {
    if (!running || over) return;
    let raf = 0;
    const loop = () => {
      const s = stateRef.current;
      // Physics
      s.vy += GRAVITY;
      s.y += s.vy;
      if (s.y > GROUND_Y - DINO_H) {
        s.y = GROUND_Y - DINO_H;
        s.vy = 0;
      }
      // World scrolling
      s.distance += s.speed;
      s.speed = Math.min(MAX_SPEED, s.speed + SPEED_INC);
      s.nextSpawn -= s.speed;
      for (const o of s.obstacles) o.x -= s.speed;
      s.obstacles = s.obstacles.filter((o) => o.x + o.w > -10);

      // Parallax, clouds drift slowly, mountains slower still
      for (const c of s.clouds) {
        c.x -= c.speed * (1 + s.speed * 0.06);
        if (c.x + c.r * 2 < -10) {
          c.x = W + 10;
          c.y = 24 + Math.random() * 50;
          c.r = 6 + Math.random() * 8;
        }
      }
      for (const m of s.mountains) {
        m.x -= s.speed * 0.18;
        if (m.x + m.w < -10) {
          m.x = W + Math.random() * 40;
          m.h = 40 + Math.random() * 50;
          m.w = 80 + Math.random() * 60;
        }
      }

      // Spawn obstacles. The gap between obstacles is *at least* the
      // horizontal distance covered during a jump, so the player always
      // has time to land and jump again, no impossible-to-clear spawns
      // even as speed ramps up.
      if (s.nextSpawn <= 0) {
        const w = 12 + Math.floor(Math.random() * 14);
        const h = 24 + Math.floor(Math.random() * 18);
        s.obstacles.push({ x: W + 10, w, h });
        const minGap = JUMP_FRAMES * s.speed * 1.6;
        const randomGap = 80 + Math.random() * 140;
        s.nextSpawn = minGap + randomGap;
      }
      // Leg animation
      s.legTimer += s.speed;
      if (s.legTimer > 6) {
        s.legTimer = 0;
        s.legFrame = (s.legFrame + 1) % 2;
      }
      // Collision
      for (const o of s.obstacles) {
        const ox = o.x;
        const oy = GROUND_Y - o.h;
        if (
          DINO_X + 5 < ox + o.w - 3 &&
          DINO_X + DINO_W - 5 > ox + 3 &&
          s.y + 5 < oy + o.h &&
          s.y + DINO_H > oy + 3
        ) {
          setOver(true);
          setRunning(false);
          const final = Math.floor(s.distance / 10);
          setBest((b) => {
            const nb = Math.max(b, final);
            try {
              localStorage.setItem("dino.best", String(nb));
            } catch {}
            return nb;
          });
          return;
        }
      }
      setScore(Math.floor(s.distance / 10));
      draw();
      raf = requestAnimationFrame(loop);
    };

    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      paintScene(ctx);
    }

    draw();
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, over]);

  function paintScene(ctx: CanvasRenderingContext2D) {
    // Fixed "arcade screen" palette so the canvas is always visually
    // distinct from the surrounding themed card.
    const fg = "#f3f3f1";
    const fgSoft = "#c8c8c4";
    const muted = "#5a5a64";
    const bg = "#08080c";
    const bgEl = "#1a1a24";
    const accent = "#ffb347";

    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    sky.addColorStop(0, bgEl);
    sky.addColorStop(0.7, bg);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, GROUND_Y);

    // Ground band
    const ground = ctx.createLinearGradient(0, GROUND_Y, 0, H);
    ground.addColorStop(0, bg);
    ground.addColorStop(1, bgEl);
    ctx.fillStyle = ground;
    ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);

    const s = stateRef.current;

    // Sun
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(W - 80, 80, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.arc(W - 80, 80, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Mountains (parallax)
    ctx.fillStyle = muted;
    ctx.globalAlpha = 0.32;
    for (const m of s.mountains) {
      ctx.beginPath();
      ctx.moveTo(m.x, GROUND_Y);
      ctx.lineTo(m.x + m.w / 2, GROUND_Y - m.h);
      ctx.lineTo(m.x + m.w, GROUND_Y);
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Clouds
    ctx.fillStyle = fgSoft;
    ctx.globalAlpha = 0.4;
    for (const c of s.clouds) {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.arc(c.x + c.r * 0.8, c.y + 1, c.r * 0.85, 0, Math.PI * 2);
      ctx.arc(c.x - c.r * 0.7, c.y + 1.5, c.r * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Ground line + dashed running stripes
    ctx.strokeStyle = muted;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(W, GROUND_Y);
    ctx.stroke();
    const stripeOff = -((s.distance * 1.2) % 24);
    ctx.globalAlpha = 0.65;
    for (let i = 0; i < W / 24 + 2; i++) {
      const x = stripeOff + i * 24;
      ctx.beginPath();
      ctx.moveTo(x, GROUND_Y + 8);
      ctx.lineTo(x + 12, GROUND_Y + 8);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Dino, chunky pixel silhouette (scaled-up version)
    ctx.fillStyle = fg;
    const dy = s.y;
    // body
    ctx.fillRect(DINO_X + 2, dy + 8, DINO_W - 4, DINO_H - 12);
    // head
    ctx.fillRect(DINO_X + 12, dy, 16, 12);
    // tail
    ctx.fillRect(DINO_X - 4, dy + 10, 6, 6);
    // legs (alternate)
    if (dy >= GROUND_Y - DINO_H - 0.5) {
      if (s.legFrame === 0) {
        ctx.fillRect(DINO_X + 4, dy + DINO_H - 5, 5, 5);
        ctx.fillRect(DINO_X + 16, dy + DINO_H - 7, 5, 7);
      } else {
        ctx.fillRect(DINO_X + 4, dy + DINO_H - 7, 5, 7);
        ctx.fillRect(DINO_X + 16, dy + DINO_H - 5, 5, 5);
      }
    } else {
      ctx.fillRect(DINO_X + 4, dy + DINO_H - 5, 5, 5);
      ctx.fillRect(DINO_X + 16, dy + DINO_H - 5, 5, 5);
    }
    // eye
    ctx.fillStyle = bgEl;
    ctx.fillRect(DINO_X + 22, dy + 4, 2, 2);

    // Cacti
    ctx.fillStyle = fg;
    for (const o of s.obstacles) {
      const oy = GROUND_Y - o.h;
      ctx.fillRect(o.x, oy, o.w, o.h);
      ctx.fillRect(o.x - 4, oy + 8, 4, o.h - 18);
      ctx.fillRect(o.x + o.w, oy + 6, 4, o.h - 18);
    }
  }

  // Initial idle frame
  useEffect(() => {
    if (running || over) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    paintScene(ctx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, over]);

  // Keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        if (over) {
          reset();
        } else if (!running) {
          setRunning(true);
        } else {
          jump();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, over, jump, reset]);

  return (
    <div className="flex h-full flex-col items-stretch select-none gap-2">
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
            else if (running) setRunning(false);
            else setRunning(true);
          }}
          className="rounded-full border border-border px-2.5 py-0.5 text-[10px] hover:border-fg-soft hover:text-fg text-fg-soft transition-colors"
        >
          {over ? "restart" : running ? "pause" : "play"}
        </button>
      </div>

      <FitBox ratio={W / H}>
        <DinoCanvas
          canvasRef={canvasRef}
          running={running}
          over={over}
          score={score}
          best={best}
          onReset={reset}
          onPlay={() => setRunning(true)}
          onJump={jump}
        />
      </FitBox>

      {/* Always-visible jump button, fills space below canvas and gives
          touch users an explicit control. */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            if (over) reset();
            else if (!running) setRunning(true);
            else jump();
          }}
          className={`rounded-full bg-accent font-medium text-accent-fg active:scale-95 transition-transform ${
            compact ? "px-5 py-1.5 text-[12px]" : "px-6 py-2 text-[13px]"
          }`}
        >
          {over ? "restart" : "jump"}
        </button>
      </div>
    </div>
  );
}

function DinoCanvas({
  canvasRef,
  running,
  over,
  score,
  best,
  onReset,
  onPlay,
  onJump,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  running: boolean;
  over: boolean;
  score: number;
  best: number;
  onReset: () => void;
  onPlay: () => void;
  onJump: () => void;
}) {
  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onClick={() => {
          if (over) onReset();
          else if (!running) onPlay();
          else onJump();
        }}
        className="h-full w-full rounded-lg cursor-pointer"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px -10px rgba(0,0,0,0.5)",
        }}
      />
      {!running && !over && score === 0 && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2.5 rounded-lg bg-bg/65 backdrop-blur-[2px] text-center px-3">
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            press
            <KeyCap wide>space</KeyCap>
            to start
          </div>
          <div className="grid grid-cols-[auto_auto] items-center gap-x-2.5 gap-y-1 text-[10px]">
            <KeyRow
              keys={
                <>
                  <KeyCap wide>space</KeyCap>
                  <span className="text-muted">/</span>
                  <KeyCap>↑</KeyCap>
                </>
              }
              label="jump"
            />
            <KeyRow
              keys={
                <span className="font-mono text-[10px] text-fg-soft">click</span>
              }
              label="also jumps"
            />
          </div>
        </div>
      )}
      {over && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-lg bg-bg/85 backdrop-blur text-center">
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
            splat
          </div>
          <div className="text-lg font-semibold tracking-tight">
            {score} <span className="text-muted">·</span> best {best}
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
