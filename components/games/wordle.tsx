"use client";

import { useCallback, useEffect, useState } from "react";
import { KeyCap } from "./key-cap";

// Curated 5-letter answer pool. Common words, no proper nouns, no plurals.
const ANSWERS = [
  "react", "build", "ship", "cloud", "stack", "scope", "logic", "frame",
  "vibe", "merge", "patch", "query", "cache", "model", "agent", "robot",
  "input", "yield", "speed", "round", "voice", "trick", "story", "draft",
  "glass", "spark", "ocean", "river", "north", "south", "magic", "honey",
  "lemon", "pearl", "amber", "cocoa", "fluid", "prism", "linen", "willow",
  "mango", "olive", "raven", "tiger", "panda", "koala", "horse", "field",
  "snake", "dream", "plant", "stone", "metal", "paper", "bread", "knife",
  "stair", "mouse", "click", "pixel", "label", "value", "label", "phase",
  "scale", "block", "pulse", "graph", "table", "trial", "flask", "ridge",
  "hover", "smile", "heart", "moral", "north", "tower", "music", "dance",
];

const VALID = new Set([
  ...ANSWERS,
  // Allow some extra valid guesses that aren't answers
  "hello", "world", "house", "place", "where", "there", "every", "great",
  "again", "right", "thing", "think", "would", "could", "those", "these",
  "small", "large", "white", "black", "green", "today", "night", "light",
  "first", "thank", "wrong", "happy", "lucky", "money", "color", "human",
  "after", "about", "still", "below", "above", "drink", "eight", "seven",
  "alone", "amend", "arena", "begin", "below", "blame", "ready",
]);

const WORD_LEN = 5;
const MAX_TRIES = 6;

type Letter = { ch: string; state: "correct" | "present" | "absent" | "empty" };

function pickAnswer(): string {
  return ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
}

function evalGuess(guess: string, answer: string): Letter[] {
  const result: Letter[] = guess.split("").map((ch) => ({ ch, state: "absent" }));
  const ansArr = answer.split("");
  // Pass 1: correct positions
  for (let i = 0; i < WORD_LEN; i++) {
    if (guess[i] === ansArr[i]) {
      result[i].state = "correct";
      ansArr[i] = "_";
    }
  }
  // Pass 2: present elsewhere
  for (let i = 0; i < WORD_LEN; i++) {
    if (result[i].state === "correct") continue;
    const idx = ansArr.indexOf(guess[i]);
    if (idx >= 0) {
      result[i].state = "present";
      ansArr[idx] = "_";
    }
  }
  return result;
}

const ROW1 = "qwertyuiop".split("");
const ROW2 = "asdfghjkl".split("");
const ROW3 = "zxcvbnm".split("");

export function WordleGame({ compact = false }: { compact?: boolean }) {
  const [answer, setAnswer] = useState(pickAnswer);
  const [guesses, setGuesses] = useState<Letter[][]>([]);
  const [current, setCurrent] = useState("");
  const [over, setOver] = useState(false);
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);
  const [keyState, setKeyState] = useState<Record<string, Letter["state"]>>({});

  const reset = useCallback(() => {
    setAnswer(pickAnswer());
    setGuesses([]);
    setCurrent("");
    setOver(false);
    setWon(false);
    setKeyState({});
  }, []);

  const submit = useCallback(() => {
    if (current.length !== WORD_LEN) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }
    const lower = current.toLowerCase();
    if (!VALID.has(lower) && !ANSWERS.includes(lower)) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }
    const result = evalGuess(lower, answer);
    setGuesses((g) => [...g, result]);
    setKeyState((ks) => {
      const next = { ...ks };
      result.forEach((l) => {
        const prev = next[l.ch];
        if (prev === "correct") return;
        if (prev === "present" && l.state === "absent") return;
        next[l.ch] = l.state;
      });
      return next;
    });
    setCurrent("");
    if (lower === answer) {
      setWon(true);
      setOver(true);
    } else if (guesses.length + 1 >= MAX_TRIES) {
      setOver(true);
    }
  }, [current, answer, guesses.length]);

  const onKey = useCallback(
    (k: string) => {
      if (over) return;
      if (k === "ENTER") {
        submit();
        return;
      }
      if (k === "BACK") {
        setCurrent((c) => c.slice(0, -1));
        return;
      }
      if (/^[a-z]$/i.test(k) && current.length < WORD_LEN) {
        setCurrent((c) => (c + k).toLowerCase());
      }
    },
    [over, current, submit],
  );

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (over && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        reset();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        onKey("ENTER");
      } else if (e.key === "Backspace") {
        e.preventDefault();
        onKey("BACK");
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        onKey(e.key.toLowerCase());
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onKey, over, reset]);

  const rows: Letter[][] = [];
  for (let r = 0; r < MAX_TRIES; r++) {
    if (r < guesses.length) {
      rows.push(guesses[r]);
    } else if (r === guesses.length) {
      const filled = current.padEnd(WORD_LEN, " ");
      rows.push(
        filled.split("").map((ch) => ({
          ch: ch === " " ? "" : ch,
          state: "empty" as const,
        })),
      );
    } else {
      rows.push(
        Array.from({ length: WORD_LEN }, () => ({
          ch: "",
          state: "empty" as const,
        })),
      );
    }
  }

  return (
    <div className="flex h-full flex-col items-stretch select-none gap-2">
      <div className="flex items-center justify-between gap-2">
        {guesses.length === 0 && !over ? (
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            type
            <KeyCap>a</KeyCap>
            <span>to</span>
            <KeyCap>z</KeyCap>
            <span className="px-0.5">·</span>
            <KeyCap wide>enter</KeyCap>
            <span>to check</span>
          </div>
        ) : (
          <div className="font-mono text-[11px] text-muted">
            {guesses.length}/{MAX_TRIES}
          </div>
        )}
        {(over || guesses.length > 0) && (
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-border px-2.5 py-0.5 text-[10px] hover:border-fg-soft hover:text-fg text-fg-soft transition-colors"
          >
            new word
          </button>
        )}
      </div>

      {/* Grid — fluid, fills available height, sized to fit 5×6 tiles
          while keeping cells square. */}
      <div
        className={`mx-auto flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-1 ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
        style={{ containerType: "size" }}
      >
        <div
          className="grid"
          style={{
            // 5 cols, 6 rows of square cells; size so the grid fits the
            // container, leaving the keyboard space below.
            width: `min(80cqw, calc(80cqh * 5 / 6))`,
            height: `min(80cqh, calc(80cqw * 6 / 5))`,
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "repeat(6, 1fr)",
            gap: "4%",
          }}
        >
          {rows.flatMap((row, ri) =>
            row.map((l, ci) => (
              <div
                key={`${ri}-${ci}`}
                className="flex items-center justify-center rounded-md font-semibold uppercase border"
                style={{
                  fontSize: "min(4cqw, 22px)",
                  borderColor:
                    l.state === "empty"
                      ? l.ch
                        ? "var(--fg)"
                        : "var(--border)"
                      : "transparent",
                  background:
                    l.state === "correct"
                      ? "#3aa55c"
                      : l.state === "present"
                      ? "#c9a02f"
                      : l.state === "absent"
                      ? "var(--muted)"
                      : "transparent",
                  color: l.state === "empty" ? "var(--fg)" : "white",
                  transition: "background-color 220ms ease, border-color 220ms ease",
                }}
              >
                {l.ch}
              </div>
            )),
          )}
        </div>
      </div>

      {over && (
        <div className="text-center text-[12px]">
          {won ? (
            <span className="text-fg">nice. got it in {guesses.length}.</span>
          ) : (
            <span className="text-fg-soft">
              the word was <span className="font-semibold uppercase text-fg">{answer}</span>.
            </span>
          )}
        </div>
      )}

      {/* On-screen keyboard */}
      <div className="flex flex-col items-center gap-1">
        {[ROW1, ROW2, [...["ENTER"], ...ROW3, "BACK"]].map((row, ri) => (
          <div key={ri} className="flex w-full justify-center gap-[3px]">
            {row.map((k) => {
              const isWide = k === "ENTER" || k === "BACK";
              const state = keyState[k];
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => onKey(k)}
                  className={`rounded font-medium uppercase tracking-wide transition-colors ${
                    isWide
                      ? compact
                        ? "px-1.5 py-1 text-[9px]"
                        : "px-2 py-1.5 text-[10px]"
                      : compact
                      ? "h-6 w-[6.5%] min-w-[16px] text-[10px]"
                      : "h-7 w-5 sm:w-6 text-[10px]"
                  }`}
                  style={{
                    background:
                      state === "correct"
                        ? "#3aa55c"
                        : state === "present"
                        ? "#c9a02f"
                        : state === "absent"
                        ? "var(--muted)"
                        : "var(--bg-elevated)",
                    color: state ? "white" : "var(--fg-soft)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {k === "BACK" ? "⌫" : k}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
