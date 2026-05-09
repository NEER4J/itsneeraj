"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { SnakeGame } from "./snake";
import { TetrisGame } from "./tetris";
import { WordleGame } from "./wordle";
import { DinoGame } from "./dino";
import {
  SnakeThumb,
  TetrisThumb,
  WordleThumb,
  DinoThumb,
} from "./thumbnails";

type GameId = "snake" | "tetris" | "wordle" | "dino";

const GAMES: {
  id: GameId;
  name: string;
  tint: string;
  Thumb: React.ComponentType<{ playing?: boolean }>;
  Game: React.ComponentType<{ compact?: boolean }>;
}[] = [
  {
    id: "snake",
    name: "snake",
    tint: "rgba(74, 222, 128, 0.20)",
    Thumb: SnakeThumb,
    Game: SnakeGame,
  },
  {
    id: "tetris",
    name: "tetris",
    tint: "rgba(167, 139, 250, 0.22)",
    Thumb: TetrisThumb,
    Game: TetrisGame,
  },
  {
    id: "wordle",
    name: "wordle",
    tint: "rgba(250, 204, 21, 0.20)",
    Thumb: WordleThumb,
    Game: WordleGame,
  },
  {
    id: "dino",
    name: "dino",
    tint: "rgba(96, 165, 250, 0.22)",
    Thumb: DinoThumb,
    Game: DinoGame,
  },
];

export function GamesPicker({
  compact = false,
  onActiveChange,
}: {
  compact?: boolean;
  onActiveChange?: (active: boolean) => void;
}) {
  const [active, setActive] = useState<GameId | null>(null);

  useEffect(() => {
    onActiveChange?.(active !== null);
  }, [active, onActiveChange]);

  if (active) {
    const game = GAMES.find((g) => g.id === active)!;
    const ActiveGame = game.Game;
    return (
      <div className="flex h-full flex-col bg-bg-elevated">
        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <button
            type="button"
            onClick={() => setActive(null)}
            className="group flex items-center gap-1.5 rounded-full bg-bg px-3 py-1 text-[11px] font-medium text-fg-soft transition-colors hover:bg-accent hover:text-accent-fg"
          >
            <ArrowLeftIcon
              size={12}
              weight="bold"
              className="transition-transform group-hover:-translate-x-0.5"
            />
            games
          </button>
          <div className="flex items-center gap-1.5 rounded-full bg-bg px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-soft">
              {game.name}
            </span>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3">
          <ActiveGame compact={compact} />
        </div>
      </div>
    );
  }

  // compact = desktop right panel: small square cards.
  // !compact = mobile fullscreen: 2x2 grid that fills the available height.
  return (
    <div
      className={`flex flex-col bg-bg-elevated ${
        compact ? "p-2.5" : "h-full p-3 gap-3"
      }`}
    >
      {!compact && (
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            arcade
          </span>
          <span className="font-mono text-[10px] text-muted">pick one</span>
        </div>
      )}
      <div
        className={`grid grid-cols-2 gap-2 ${
          compact ? "" : "min-h-0 flex-1 grid-rows-2 gap-3"
        }`}
      >
        <AnimatePresence>
          {GAMES.map((g, i) => (
            <PickerCard
              key={g.id}
              index={i}
              Thumb={g.Thumb}
              name={g.name}
              tint={g.tint}
              onClick={() => setActive(g.id)}
              fill={!compact}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PickerCard({
  index,
  Thumb,
  name,
  tint,
  onClick,
  fill = false,
}: {
  index: number;
  Thumb: React.ComponentType<{ playing?: boolean }>;
  name: string;
  tint: string;
  onClick: () => void;
  fill?: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={onClick}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative overflow-hidden rounded-lg border border-border bg-bg text-left transition-shadow ${
        fill ? "h-full min-h-0 w-full" : "aspect-square"
      }`}
      style={{
        boxShadow: hover
          ? `0 6px 22px -8px ${tint}, inset 0 0 0 1px var(--accent)`
          : undefined,
      }}
    >
      {/* thumbnail fills the card */}
      <div className="absolute inset-0">
        <Thumb playing={hover} />
      </div>

      {/* tint wash for depth */}
      <span
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(120% 80% at 50% 0%, ${tint}, transparent 70%)`,
          opacity: hover ? 1 : 0.5,
        }}
      />

      {/* title chip at bottom */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end bg-gradient-to-t from-bg via-bg/70 to-transparent ${
          fill ? "px-3 pb-3 pt-10" : "px-2 pb-1.5 pt-6"
        }`}
      >
        <span
          className={`font-mono uppercase tracking-[0.18em] text-fg leading-none ${
            fill ? "text-[12px]" : "text-[10px]"
          }`}
        >
          {name}
        </span>
      </div>
    </motion.button>
  );
}
