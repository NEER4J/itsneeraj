"use client";

import { useEffect, useState } from "react";

export type PetMood = "idle" | "talking" | "thinking" | "sleeping";

/*
 * 6-line ASCII cat. Every frame has the same line count and column
 * positions so only the eyes / mouth / accessory line change.
 *
 *   line 1: accessory  (z, ?, °, ~ ...)
 *   line 2: ears       /\   /\
 *   line 3: head top   /  \_/  \
 *   line 4: eyes      ( o     o )
 *   line 5: mouth     (    w    )
 *   line 6: chin       \_______/
 */
const E = "           "; // 11 spaces (empty accessory line)
const EARS = "  /\\   /\\  ";
const HEAD = " /  \\_/  \\ ";
const CHIN = " \\_______/ ";

const f = (acc: string, eyes: string, mouth: string) =>
  `${acc}\n${EARS}\n${HEAD}\n${eyes}\n${mouth}\n${CHIN}`;

const FRAMES: Record<PetMood, string[]> = {
  idle: [
    f(E, "( o     o )", "(    w    )"), // rest
    f(E, "( o     o )", "(    w    )"), // rest (hold)
    f(E, "( -     - )", "(    w    )"), // blink
    f(E, "( o     o )", "(    w    )"), // rest
    f(E, "( o     O )", "(    w    )"), // glance right
    f(E, "( o     o )", "(    w    )"), // rest
    f(E, "( O     o )", "(    w    )"), // glance left
    f(E, "( o     o )", "(    w    )"), // rest
    f(E, "( ^     ^ )", "(    u    )"), // smile
    f(E, "( o     o )", "(    w    )"), // rest
    f("   ~       ", "( o     o )", "(    w    )"), // ear twitch
    f(E, "( o     o )", "(    w    )"), // rest
    f(E, "( -     - )", "(    w    )"), // blink
    f(E, "( o     o )", "(    w    )"), // rest
  ],
  talking: [
    f(E, "( o     o )", "(    o    )"),
    f(E, "( o     o )", "(    w    )"),
    f(E, "( o     o )", "(    O    )"),
    f(E, "( -     - )", "(    -    )"),
    f(E, "( o     o )", "(    o    )"),
    f(E, "( ^     ^ )", "(    u    )"),
    f(E, "( o     o )", "(    O    )"),
    f(E, "( o     o )", "(    w    )"),
  ],
  thinking: [
    f("       .   ", "( -     o )", "(    -    )"),
    f("      .o   ", "( o     - )", "(    -    )"),
    f("     .oO   ", "( -     o )", "(    -    )"),
    f("     oO°   ", "( o     - )", "(    -    )"),
    f("     ?O°   ", "( -     o )", "(    -    )"),
    f("      O°   ", "( o     - )", "(    -    )"),
  ],
  sleeping: [
    f("       z   ", "( -     - )", "(    -    )"),
    f("      zZ   ", "( -     - )", "(    -    )"),
    f("     zZ°   ", "( -     - )", "(    -    )"),
    f("      Z    ", "( -     - )", "(    -    )"),
  ],
};

const TICK: Record<PetMood, number> = {
  idle: 650,
  talking: 150,
  thinking: 280,
  sleeping: 1500,
};

const ANIM_CLASS: Record<PetMood, string> = {
  idle: "pet-breathe",
  talking: "pet-bob",
  thinking: "pet-hover",
  sleeping: "pet-snore",
};

export function AsciiPet({ mood = "idle" as PetMood }: { mood?: PetMood }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    setI(0);
    const id = setInterval(() => {
      setI((v) => (v + 1) % FRAMES[mood].length);
    }, TICK[mood]);
    return () => clearInterval(id);
  }, [mood]);

  return (
    <pre
      aria-hidden
      className={`font-mono text-[11px] leading-[1.15] text-fg select-none whitespace-pre tabular-nums ${ANIM_CLASS[mood]}`}
    >
      {FRAMES[mood][i]}
    </pre>
  );
}
