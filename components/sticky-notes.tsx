"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRightIcon,
  PlusIcon,
  XIcon,
} from "@phosphor-icons/react";
import { PROJECTS } from "@/lib/content";

type UserNote = {
  id: string;
  x: number;
  y: number;
  content: string;
  rotation: number;
};

type Stored = {
  docsivPos?: { x: number; y: number };
  userNotes?: UserNote[];
};

const STORAGE_KEY = "neeraj.sticky-notes.v4";

function defaultDocsivPos() {
  return { x: 99.3555, y: 463.461 };
}

function clampToViewport(pos: { x: number; y: number }, w = 220, h = 160) {
  if (typeof window === "undefined") return pos;
  return {
    x: Math.max(8, Math.min(window.innerWidth - w - 8, pos.x)),
    y: Math.max(8, Math.min(window.innerHeight - h - 8, pos.y)),
  };
}

function defaultUserPos(idx: number) {
  if (typeof window === "undefined") return { x: 200 + idx * 24, y: 220 + idx * 24 };
  const x = Math.max(40, window.innerWidth * 0.5 + idx * 24);
  const y = Math.max(40, window.innerHeight * 0.55 + idx * 24);
  return { x, y };
}

export function StickyNotes() {
  const [hydrated, setHydrated] = useState(false);
  const [docsivPos, setDocsivPos] = useState<{ x: number; y: number }>(() =>
    defaultDocsivPos(),
  );
  const [userNotes, setUserNotes] = useState<UserNote[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as Stored;
        if (data.docsivPos) setDocsivPos(data.docsivPos);
        if (data.userNotes) setUserNotes(data.userNotes);
      } else {
        setDocsivPos(defaultDocsivPos());
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ docsivPos, userNotes } satisfies Stored),
      );
    } catch {
      // ignore
    }
  }, [hydrated, docsivPos, userNotes]);

  const addNote = useCallback(() => {
    setUserNotes((prev) => {
      const next: UserNote = {
        id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        content: "",
        rotation: (Math.random() - 0.5) * 4,
        ...defaultUserPos(prev.length),
      };
      return [...prev, next];
    });
  }, []);

  const updateNote = useCallback(
    (id: string, patch: Partial<UserNote>) => {
      setUserNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...patch } : n)),
      );
    },
    [],
  );

  const deleteNote = useCallback((id: string) => {
    setUserNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  if (!hydrated) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden md:block">
      <DocsivNote
        pos={docsivPos}
        onMove={setDocsivPos}
        onAddNote={addNote}
      />
      {userNotes.map((n) => (
        <UserStickyNote
          key={n.id}
          note={n}
          onMove={(p) => updateNote(n.id, p)}
          onContentChange={(content) => updateNote(n.id, { content })}
          onDelete={() => deleteNote(n.id)}
        />
      ))}
    </div>
  );
}

function useDrag<E extends HTMLElement>(
  pos: { x: number; y: number },
  onMove: (p: { x: number; y: number }) => void,
) {
  const dragRef = useRef<{
    pointer: { x: number; y: number };
    pos: { x: number; y: number };
    pointerId: number;
  } | null>(null);
  const movedRef = useRef(false);
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== e.pointerId) return;
      const dx = e.clientX - drag.pointer.x;
      const dy = e.clientY - drag.pointer.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) movedRef.current = true;
      onMoveRef.current({ x: drag.pos.x + dx, y: drag.pos.y + dy });
    };
    const handleEnd = (e: PointerEvent) => {
      if (dragRef.current && dragRef.current.pointerId === e.pointerId) {
        dragRef.current = null;
      }
    };
    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleEnd);
    document.addEventListener("pointercancel", handleEnd);
    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleEnd);
      document.removeEventListener("pointercancel", handleEnd);
    };
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<E>) => {
      const eventTarget = e.target as HTMLElement;
      if (eventTarget.closest("textarea, input, [data-no-drag]")) return;
      dragRef.current = {
        pointer: { x: e.clientX, y: e.clientY },
        pos: { ...pos },
        pointerId: e.pointerId,
      };
      movedRef.current = false;
    },
    [pos],
  );

  return {
    movedRef,
    handlers: { onPointerDown },
  };
}

function DocsivNote({
  pos,
  onMove,
  onAddNote,
}: {
  pos: { x: number; y: number };
  onMove: (p: { x: number; y: number }) => void;
  onAddNote: () => void;
}) {
  const docsiv = PROJECTS.find((p) => p.slug === "docsiv");
  const { movedRef, handlers } = useDrag<HTMLDivElement>(pos, onMove);
  if (!docsiv) return null;

  return (
    <div
      {...handlers}
      style={{
        left: pos.x,
        top: pos.y,
        transform: "rotate(-1.6deg)",
      }}
      className="pointer-events-auto absolute w-[260px] cursor-grab touch-none select-none rounded-[2px] bg-note-bg p-4 text-note-fg shadow-[0_14px_30px_rgba(0,0,0,0.22)] active:cursor-grabbing"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-2 left-1/2 h-3 w-16 -translate-x-1/2 rotate-[-3deg] bg-fg/10"
      />
      <div className="flex items-start justify-between gap-2">
        <div className="font-mono text-[9px] uppercase tracking-[0.22em] opacity-70">
          currently building
        </div>
        <button
          type="button"
          data-no-drag
          onClick={(e) => {
            e.stopPropagation();
            if (movedRef.current) return;
            onAddNote();
          }}
          aria-label="Add a sticky note"
          className="grid h-5 w-5 place-items-center rounded-full bg-note-fg/15 text-note-fg transition-colors hover:bg-note-fg hover:text-note-bg"
        >
          <PlusIcon size={11} weight="bold" />
        </button>
      </div>
      <a
        href={docsiv.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (movedRef.current) e.preventDefault();
        }}
        className="mt-3 block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www.docsiv.com/docsiv-logo.svg"
          alt="Docsiv"
          className="h-7 w-auto select-none"
          draggable={false}
        />
        <p className="mt-3 text-[12px] leading-snug opacity-85">
          AI documents. Branded client portals.
        </p>
        <div className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide opacity-75">
          docsiv.com
          <ArrowUpRightIcon size={11} weight="bold" />
        </div>
      </a>
    </div>
  );
}

function UserStickyNote({
  note,
  onMove,
  onContentChange,
  onDelete,
}: {
  note: UserNote;
  onMove: (p: { x: number; y: number }) => void;
  onContentChange: (content: string) => void;
  onDelete: () => void;
}) {
  const { movedRef, handlers } = useDrag<HTMLDivElement>(
    { x: note.x, y: note.y },
    onMove,
  );
  return (
    <div
      {...handlers}
      style={{
        left: note.x,
        top: note.y,
        transform: `rotate(${note.rotation}deg)`,
      }}
      className="pointer-events-auto absolute w-[220px] cursor-grab touch-none rounded-[2px] bg-note-bg p-3 text-note-fg shadow-[0_14px_30px_rgba(0,0,0,0.22)] active:cursor-grabbing"
    >
      <span
        aria-hidden
        className="absolute -top-2 left-1/2 h-3 w-14 -translate-x-1/2 rotate-[-3deg] bg-fg/10"
      />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] opacity-60">
          note
        </span>
        <button
          type="button"
          data-no-drag
          onClick={(e) => {
            e.stopPropagation();
            if (movedRef.current) return;
            onDelete();
          }}
          aria-label="Delete note"
          className="grid h-5 w-5 place-items-center rounded-full text-note-fg/60 transition-colors hover:bg-note-fg/15 hover:text-note-fg"
        >
          <XIcon size={11} weight="bold" />
        </button>
      </div>
      <textarea
        value={note.content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="write something…"
        className="mt-1 block h-28 w-full resize-none border-0 bg-transparent text-[13px] leading-snug text-note-fg placeholder:text-note-fg/40 focus:outline-none"
      />
    </div>
  );
}
