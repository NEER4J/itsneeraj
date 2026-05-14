"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FitBox } from "./fit-box";
import { KeyCap, KeyRow } from "./key-cap";

const COLS = 10;
const ROWS = 18;
const START_TICK = 850;
const SPEED_UP_PER_LEVEL = 65;

type Cell = number; // 0 = empty, 1..7 = piece kind
type Board = Cell[][];

type Piece = {
  shape: number[][];
  kind: number;
  x: number;
  y: number;
};

const SHAPES: number[][][] = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 0], [1, 1, 1]], // T
  [[0, 1, 1], [1, 1, 0]], // S
  [[1, 1, 0], [0, 1, 1]], // Z
  [[1, 0, 0], [1, 1, 1]], // J
  [[0, 0, 1], [1, 1, 1]], // L
];

// Standard tetris colors
const COLORS = [
  "transparent",
  "#22d3ee", // I cyan
  "#facc15", // O yellow
  "#a78bfa", // T purple
  "#34d399", // S green
  "#f87171", // Z red
  "#3b82f6", // J blue
  "#fb923c", // L orange
];

function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(0));
}

function rotate(shape: number[][]): number[][] {
  const r = shape.length;
  const c = shape[0].length;
  const out: number[][] = Array.from({ length: c }, () => Array(r).fill(0));
  for (let y = 0; y < r; y++) {
    for (let x = 0; x < c; x++) {
      out[x][r - 1 - y] = shape[y][x];
    }
  }
  return out;
}

function collides(board: Board, p: Piece): boolean {
  for (let y = 0; y < p.shape.length; y++) {
    for (let x = 0; x < p.shape[y].length; x++) {
      if (!p.shape[y][x]) continue;
      const bx = p.x + x;
      const by = p.y + y;
      if (bx < 0 || bx >= COLS || by >= ROWS) return true;
      if (by >= 0 && board[by][bx]) return true;
    }
  }
  return false;
}

function merge(board: Board, p: Piece): Board {
  const next = board.map((r) => [...r]);
  for (let y = 0; y < p.shape.length; y++) {
    for (let x = 0; x < p.shape[y].length; x++) {
      if (p.shape[y][x] && p.y + y >= 0) {
        next[p.y + y][p.x + x] = p.kind;
      }
    }
  }
  return next;
}

function clearLines(board: Board): { board: Board; cleared: number; rows: number[] } {
  const rows: number[] = [];
  board.forEach((row, i) => {
    if (row.every((c) => c)) rows.push(i);
  });
  const remaining = board.filter((row) => row.some((c) => !c));
  while (remaining.length < ROWS) remaining.unshift(Array(COLS).fill(0));
  return { board: remaining, cleared: rows.length, rows };
}

function spawnFromKind(kindIdx: number): Piece {
  const shape = SHAPES[kindIdx];
  return {
    shape,
    kind: kindIdx + 1,
    x: Math.floor(COLS / 2 - shape[0].length / 2),
    y: -1,
  };
}

function randKind() {
  return Math.floor(Math.random() * SHAPES.length);
}

function ghostOf(board: Board, p: Piece): Piece {
  let g = p;
  while (!collides(board, { ...g, y: g.y + 1 })) g = { ...g, y: g.y + 1 };
  return g;
}

const SCORE_FOR = [0, 100, 300, 500, 800];

export function TetrisGame({ compact = false }: { compact?: boolean }) {
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [piece, setPiece] = useState<Piece>(() => spawnFromKind(randKind()));
  const [nextKind, setNextKind] = useState<number>(() => randKind());
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [best, setBest] = useState(0);
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState(false);
  const [flash, setFlash] = useState<number[]>([]);

  const level = Math.floor(lines / 10);
  const tick = Math.max(140, START_TICK - level * SPEED_UP_PER_LEVEL);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nextCompactRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    try {
      const v = Number(localStorage.getItem("tetris.best") ?? "0");
      if (Number.isFinite(v)) setBest(v);
    } catch {}
  }, []);

  const reset = useCallback(() => {
    setBoard(emptyBoard());
    setPiece(spawnFromKind(randKind()));
    setNextKind(randKind());
    setScore(0);
    setLines(0);
    setOver(false);
    setRunning(true);
  }, []);

  const lockAndAdvance = useCallback(
    (curBoard: Board, curPiece: Piece) => {
      const merged = merge(curBoard, curPiece);
      const { board: cleared, cleared: cnt, rows } = clearLines(merged);
      const next = spawnFromKind(nextKind);
      const newNext = randKind();

      if (collides(cleared, next)) {
        setBoard(merged);
        setOver(true);
        setRunning(false);
        const totalScore = score + SCORE_FOR[cnt];
        setBest((b) => {
          const nb = Math.max(b, totalScore);
          try {
            localStorage.setItem("tetris.best", String(nb));
          } catch {}
          return nb;
        });
        return;
      }

      if (cnt > 0) {
        setFlash(rows);
        setTimeout(() => setFlash([]), 180);
      }
      setBoard(cleared);
      setPiece(next);
      setNextKind(newNext);
      if (cnt > 0) {
        setScore((s) => s + SCORE_FOR[cnt]);
        setLines((l) => l + cnt);
      }
    },
    [score, nextKind],
  );

  // Game tick
  useEffect(() => {
    if (!running || over) return;
    const id = setInterval(() => {
      setPiece((p) => {
        const moved = { ...p, y: p.y + 1 };
        if (collides(board, moved)) {
          lockAndAdvance(board, p);
          return p;
        }
        return moved;
      });
    }, tick);
    return () => clearInterval(id);
  }, [running, over, board, lockAndAdvance, tick]);

  // Controls
  const move = useCallback(
    (dx: number) => {
      setPiece((p) => {
        const next = { ...p, x: p.x + dx };
        return collides(board, next) ? p : next;
      });
    },
    [board],
  );

  const rotateP = useCallback(() => {
    setPiece((p) => {
      const next = { ...p, shape: rotate(p.shape) };
      for (const dx of [0, -1, 1, -2, 2]) {
        const tryP = { ...next, x: next.x + dx };
        if (!collides(board, tryP)) return tryP;
      }
      return p;
    });
  }, [board]);

  const softDrop = useCallback(() => {
    setPiece((p) => {
      const next = { ...p, y: p.y + 1 };
      if (collides(board, next)) {
        lockAndAdvance(board, p);
        return p;
      }
      setScore((s) => s + 1);
      return next;
    });
  }, [board, lockAndAdvance]);

  const hardDrop = useCallback(() => {
    setPiece((p) => {
      const g = ghostOf(board, p);
      const dropped = g.y - p.y;
      if (dropped > 0) setScore((s) => s + dropped * 2);
      lockAndAdvance(board, g);
      return g;
    });
  }, [board, lockAndAdvance]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (over && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        reset();
        return;
      }
      if (!running) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          setRunning(true);
        }
        return;
      }
      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          move(-1);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          move(1);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          softDrop();
          break;
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          rotateP();
          break;
        case " ":
          e.preventDefault();
          hardDrop();
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, over, move, rotateP, softDrop, hardDrop, reset]);

  // Render board
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Fixed "arcade screen" palette so the canvas reads as a screen
    // regardless of theme.
    const bg = "#08080c";
    const bgEl = "#15151c";
    const border = "#2a2a32";

    const W = canvas.width;
    const H = canvas.height;
    const cellW = W / COLS;
    const cellH = H / ROWS;

    // gradient backdrop
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, bgEl);
    grad.addColorStop(1, bg);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Subtle grid
    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    for (let i = 1; i < COLS; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellW, 0);
      ctx.lineTo(i * cellW, H);
      ctx.stroke();
    }
    for (let i = 1; i < ROWS; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellH);
      ctx.lineTo(W, i * cellH);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Settled blocks (with row flash)
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const k = board[y][x];
        if (!k) continue;
        if (flash.includes(y)) {
          ctx.fillStyle = "rgba(255,255,255,0.95)";
          ctx.fillRect(x * cellW, y * cellH, cellW, cellH);
        } else {
          drawBlock(ctx, x * cellW, y * cellH, cellW, cellH, COLORS[k], 1);
        }
      }
    }

    // Ghost piece
    if (!over) {
      const ghost = ghostOf(board, piece);
      for (let y = 0; y < ghost.shape.length; y++) {
        for (let x = 0; x < ghost.shape[y].length; x++) {
          if (!ghost.shape[y][x]) continue;
          const bx = (ghost.x + x) * cellW;
          const by = (ghost.y + y) * cellH;
          if (ghost.y + y < 0) continue;
          ctx.strokeStyle = COLORS[ghost.kind];
          ctx.globalAlpha = 0.45;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(bx + 1.5, by + 1.5, cellW - 3, cellH - 3);
          ctx.globalAlpha = 1;
        }
      }
    }

    // Active piece
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (!piece.shape[y][x]) continue;
        const bx = (piece.x + x) * cellW;
        const by = (piece.y + y) * cellH;
        if (piece.y + y < 0) continue;
        drawBlock(ctx, bx, by, cellW, cellH, COLORS[piece.kind], 1);
      }
    }
  }, [board, piece, over, flash]);

  // Render next preview (full + compact)
  useEffect(() => {
    function paintNext(canvas: HTMLCanvasElement | null) {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const shape = SHAPES[nextKind];
      const cellSize = Math.min(W / 4.2, H / 4.2);
      const gridW = shape[0].length * cellSize;
      const gridH = shape.length * cellSize;
      const offX = (W - gridW) / 2;
      const offY = (H - gridH) / 2;
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (!shape[y][x]) continue;
          drawBlock(
            ctx,
            offX + x * cellSize,
            offY + y * cellSize,
            cellSize,
            cellSize,
            COLORS[nextKind + 1],
            1,
          );
        }
      }
    }
    paintNext(nextCompactRef.current);
  }, [nextKind]);

  return (
    <div className="flex h-full flex-col items-stretch select-none gap-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 font-mono text-[11px]">
          <Stat label="score" value={score} />
          <Stat label="lines" value={lines} />
          <Stat label="lvl" value={level} />
          {!compact && <Stat label="best" value={best} />}
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

      <div className="flex flex-1 items-stretch justify-center min-h-0">
        <FitBox ratio={COLS / ROWS}>
          <div className="relative h-full w-full">
            <canvas
              ref={canvasRef}
              width={COLS * 22}
              height={ROWS * 22}
              className="h-full w-full rounded-lg"
              style={{
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px -10px rgba(0,0,0,0.5)",
              }}
            />
            {/* Floating next-piece chip, same placement on mobile + desktop. */}
            <div
              className={`absolute flex flex-col items-center gap-0.5 rounded-md border border-border bg-bg/85 backdrop-blur ${
                compact
                  ? "right-1.5 top-1.5 px-1.5 py-1"
                  : "right-2 top-2 px-2 py-1.5"
              }`}
            >
              <span
                className={`font-mono uppercase tracking-[0.18em] text-muted ${
                  compact ? "text-[7px]" : "text-[8px]"
                }`}
              >
                next
              </span>
              <canvas
                ref={nextCompactRef}
                width={48}
                height={36}
                style={
                  compact
                    ? { width: "32px", height: "24px" }
                    : { width: "44px", height: "33px" }
                }
              />
            </div>
            {!running && !over && score === 0 && lines === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-bg/85 backdrop-blur text-center px-3">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  press
                  <KeyCap wide>enter</KeyCap>
                  to start
                </div>
                <div className="grid grid-cols-[auto_auto] items-center gap-x-2.5 gap-y-1 text-[10px]">
                  <KeyRow
                    keys={
                      <>
                        <KeyCap>←</KeyCap>
                        <KeyCap>→</KeyCap>
                      </>
                    }
                    label="move"
                  />
                  <KeyRow keys={<KeyCap>↑</KeyCap>} label="rotate" />
                  <KeyRow keys={<KeyCap>↓</KeyCap>} label="soft drop" />
                  <KeyRow
                    keys={<KeyCap wide>space</KeyCap>}
                    label="hard drop"
                  />
                </div>
              </div>
            )}
            {over && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-lg bg-bg/90 backdrop-blur text-center">
                <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                  game over
                </div>
                <div className="text-2xl font-semibold tabular-nums tracking-tight">
                  {score}
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full bg-accent px-3 py-1 text-[11px] text-accent-fg"
                >
                  try again
                </button>
              </div>
            )}
          </div>
        </FitBox>
      </div>

      {/* Always-visible control row, fills horizontal space below the canvas
          and gives touch users explicit controls. */}
      <div
        className={`mx-auto grid w-full grid-cols-5 ${
          compact ? "max-w-[260px] gap-1" : "max-w-[300px] gap-1.5"
        }`}
      >
        <CtrlBtn onClick={() => move(-1)} compact={compact}>←</CtrlBtn>
        <CtrlBtn onClick={rotateP} compact={compact}>↻</CtrlBtn>
        <CtrlBtn onClick={softDrop} compact={compact}>↓</CtrlBtn>
        <CtrlBtn onClick={hardDrop} compact={compact}>⤓</CtrlBtn>
        <CtrlBtn onClick={() => move(1)} compact={compact}>→</CtrlBtn>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <span>
      <span className="text-muted">{label} </span>
      <span className="tabular-nums">{value}</span>
    </span>
  );
}

function CtrlBtn({
  children,
  onClick,
  compact = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`aspect-square rounded-lg border border-border bg-bg-elevated active:bg-accent active:text-accent-fg transition-colors ${
        compact ? "text-sm" : "text-base"
      }`}
    >
      {children}
    </button>
  );
}

/** Renders a single block with subtle 3D shading. */
function drawBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  alpha: number,
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  // Base fill
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  // Top/left highlight
  ctx.fillStyle = "rgba(255,255,255,0.20)";
  ctx.fillRect(x, y, w, Math.max(2, h * 0.18));
  ctx.fillRect(x, y, Math.max(2, w * 0.18), h);
  // Bottom/right shadow
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.fillRect(x, y + h - Math.max(2, h * 0.18), w, Math.max(2, h * 0.18));
  ctx.fillRect(x + w - Math.max(2, w * 0.18), y, Math.max(2, w * 0.18), h);
  // Outline
  ctx.strokeStyle = "rgba(0,0,0,0.45)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  ctx.restore();
}
