"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowClockwiseIcon,
  ArrowUpRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CodeSimpleIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  PaperPlaneTiltIcon,
  SparkleIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { AsciiPet, type PetMood } from "../ascii-pet";
import { MarkdownMessage } from "./markdown-message";
import { META } from "@/lib/content";

type Msg = { role: "user" | "assistant"; content: string };

const DAILY_LIMIT = 25;
const WINDOW_MS = 24 * 60 * 60 * 1000;
const STORAGE_KEY = "chat:usage";

type Usage = { count: number; resetAt: number };

function readUsage(): Usage {
  if (typeof window === "undefined") return { count: 0, resetAt: 0 };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { count: 0, resetAt: 0 };
    const parsed = JSON.parse(raw) as Partial<Usage>;
    const count = typeof parsed.count === "number" && parsed.count >= 0 ? parsed.count : 0;
    const resetAt = typeof parsed.resetAt === "number" ? parsed.resetAt : 0;
    if (!resetAt || resetAt <= Date.now()) return { count: 0, resetAt: 0 };
    return { count, resetAt };
  } catch {
    return { count: 0, resetAt: 0 };
  }
}

function bumpUsage(current: Usage): Usage {
  return {
    count: current.count + 1,
    resetAt: current.resetAt || Date.now() + WINDOW_MS,
  };
}

function writeUsage(u: Usage): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  } catch {
    // localStorage may be disabled / full; ignore, server-side limit still applies.
  }
}

type IconType = React.ComponentType<{
  size?: number;
  weight?: "regular" | "bold" | "fill" | "duotone";
  className?: string;
}>;

const TOPICS: {
  id: string;
  icon: IconType;
  label: string;
  prompt: string;
}[] = [
  {
    id: "work",
    icon: BriefcaseIcon,
    label: "Work",
    prompt: "What is he building right now?",
  },
  {
    id: "stack",
    icon: CodeSimpleIcon,
    label: "Stack",
    prompt: "What's his AI stack?",
  },
  {
    id: "hire",
    icon: CalendarIcon,
    label: "Hire",
    prompt: "Is he open to full-time roles or freelance?",
  },
  {
    id: "random",
    icon: SparkleIcon,
    label: "Random",
    prompt: "Tell me how he works.",
  },
];

export function ChatPanel() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState<Usage>({ count: 0, resetAt: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const empty = messages.length === 0;
  const limitReached = usage.count >= DAILY_LIMIT;

  useEffect(() => {
    // Initial read deferred to mount so SSR HTML (count=0) matches first client render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUsage(readUsage());
  }, []);
  const lastAssistant = messages[messages.length - 1];
  const waitingForFirstToken =
    streaming && lastAssistant?.role === "assistant" && !lastAssistant.content;

  const mood: PetMood = streaming
    ? waitingForFirstToken
      ? "thinking"
      : "talking"
    : "idle";

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, streaming]);

  useLayoutEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(Math.max(32, ta.scrollHeight), 140) + "px";
  }, [input]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;
    const current = readUsage();
    if (current.count >= DAILY_LIMIT) {
      setUsage(current);
      return;
    }

    setError(null);
    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);
    const updated = bumpUsage(current);
    setUsage(updated);
    writeUsage(updated);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const detail = await res.text().catch(() => "");
        throw new Error(detail || `chat failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "something went wrong.";
      setError(msg);
      setMessages((m) => {
        const copy = [...m];
        if (copy[copy.length - 1]?.role === "assistant" && !copy[copy.length - 1].content) {
          copy.pop();
        }
        return copy;
      });
    } finally {
      setStreaming(false);
      textareaRef.current?.focus();
    }
  }

  function clearChat() {
    if (streaming) return;
    setMessages([]);
    setError(null);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <div className="relative flex h-full flex-col">
      {!empty && (
        <button
          type="button"
          onClick={clearChat}
          disabled={streaming}
          className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full border border-border bg-bg-elevated px-2 py-1 text-[10px] text-muted hover:border-fg-soft hover:text-fg disabled:opacity-40 transition-colors"
          aria-label="clear chat"
        >
          <ArrowClockwiseIcon size={10} weight="bold" />
          new
        </button>
      )}

      {/* Messages / empty state */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        {empty && !limitReached ? (
          <EmptyState mood={mood} />
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => {
                const isWaiting =
                  streaming &&
                  i === messages.length - 1 &&
                  m.role === "assistant" &&
                  !m.content;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={m.role === "user" ? "flex justify-end" : ""}
                  >
                    {m.role === "user" ? (
                      <div className="max-w-[88%] rounded-2xl rounded-br-md bg-accent px-3 py-2 text-[13px] leading-[1.55] text-accent-fg whitespace-pre-wrap">
                        {m.content}
                      </div>
                    ) : (
                      <div className="max-w-[92%] px-1 py-0.5 text-fg">
                        {isWaiting ? <TypingDots /> : <MarkdownMessage>{m.content}</MarkdownMessage>}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {limitReached && <LimitCard standalone={empty} resetAt={usage.resetAt} />}
            {error && !limitReached && (
              <div className="rounded-md border border-border bg-bg px-3 py-2 text-[11px] text-muted">
                {error}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer: chips + floating input */}
      <div className="shrink-0 px-3 pb-3 pt-2">
        {empty && (
          <div className="mb-2 flex flex-wrap justify-center gap-1.5">
            {TOPICS.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => send(t.prompt)}
                  disabled={limitReached || streaming}
                  className="group flex items-center gap-1.5 rounded-full border border-border bg-bg px-3 py-1.5 text-[11px] text-fg-soft hover:border-fg-soft hover:bg-bg-elevated hover:text-fg transition-all disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-bg disabled:hover:text-fg-soft"
                >
                  <Icon
                    size={12}
                    weight="regular"
                    className="text-muted group-hover:text-fg transition-colors"
                  />
                  <span className="font-medium">{t.label}</span>
                </button>
              );
            })}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <div className="flex items-center gap-2 rounded-full border border-border bg-bg-elevated py-1.5 pl-4 pr-1.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] transition-all focus-within:border-fg-soft focus-within:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.25)] md:items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder="Ask anything…"
              className="block h-8 max-h-32 min-w-0 flex-1 resize-none bg-transparent py-[6px] text-[16px] leading-5 outline-none placeholder:text-muted md:text-[13px]"
              disabled={streaming || limitReached}
              autoCapitalize="sentences"
              autoCorrect="on"
            />
            <button
              type="submit"
              disabled={streaming || limitReached || !input.trim()}
              aria-label="send"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-fg transition-all hover:scale-105 hover:opacity-90 active:scale-95 disabled:scale-100 disabled:opacity-30 md:h-8 md:w-8"
            >
              {streaming ? (
                <span className="text-[11px] font-medium">…</span>
              ) : (
                <PaperPlaneTiltIcon size={14} weight="fill" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1.5" aria-label="thinking">
      <span className="bounce-dot inline-block h-1.5 w-1.5 rounded-full bg-fg-soft" />
      <span className="bounce-dot inline-block h-1.5 w-1.5 rounded-full bg-fg-soft" />
      <span className="bounce-dot inline-block h-1.5 w-1.5 rounded-full bg-fg-soft" />
    </div>
  );
}

function formatResetIn(resetAt: number): string {
  const ms = resetAt - Date.now();
  if (ms <= 0) return "soon";
  const hours = Math.round(ms / (60 * 60 * 1000));
  if (hours >= 1) return `in ~${hours}h`;
  const minutes = Math.max(1, Math.round(ms / (60 * 1000)));
  return `in ~${minutes}m`;
}

function LimitCard({ standalone, resetAt }: { standalone: boolean; resetAt: number }) {
  const socials = [
    { href: "https://linkedin.com/in/neer4j", label: "linkedin", Icon: LinkedinLogoIcon },
    { href: "https://github.com/NEER4J", label: "github", Icon: GithubLogoIcon },
    { href: "https://x.com/NEER4J__", label: "x", Icon: XLogoIcon },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={
        standalone
          ? "mx-auto mt-6 max-w-sm overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]"
          : "overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]"
      }
    >
      <div className="flex items-center justify-between gap-2 border-b border-border bg-bg/60 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-muted">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          daily limit reached
        </span>
        {resetAt > 0 && <span className="normal-case tracking-normal">resets {formatResetIn(resetAt)}</span>}
      </div>
      <div className="px-4 pb-4 pt-3">
        <div className="text-[13px] font-medium text-fg">
          that&apos;s your {DAILY_LIMIT} messages for today
        </div>
        <div className="mt-1 text-[12px] leading-[1.55] text-fg-soft">
          if you&apos;d like to keep the conversation going, the fastest ways to reach Neeraj are right here.
        </div>

        <div className="mt-3.5 grid gap-1.5 rounded-xl border border-border bg-bg p-2.5">
          <a
            href={`mailto:${META.email}`}
            className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-bg-elevated transition-colors"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border bg-bg-elevated text-fg-soft group-hover:text-fg">
              <EnvelopeSimpleIcon size={13} weight="regular" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] uppercase tracking-wider text-muted">email</span>
              <span className="block truncate text-[12px] text-fg">{META.email}</span>
            </span>
            <ArrowUpRightIcon size={12} weight="bold" className="text-muted group-hover:text-fg transition-colors" />
          </a>
          <a
            href={META.call}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-bg-elevated transition-colors"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border bg-bg-elevated text-fg-soft group-hover:text-fg">
              <CalendarIcon size={13} weight="regular" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] uppercase tracking-wider text-muted">book a call</span>
              <span className="block truncate text-[12px] text-fg">30 min · cal.com</span>
            </span>
            <ArrowUpRightIcon size={12} weight="bold" className="text-muted group-hover:text-fg transition-colors" />
          </a>
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid h-7 w-7 place-items-center rounded-md border border-border bg-bg text-fg-soft hover:border-fg-soft hover:text-fg transition-colors"
            >
              <Icon size={12} weight="regular" />
            </a>
          ))}
          <span className="ml-1 text-[10px] text-muted">also on</span>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ mood }: { mood: PetMood }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex h-28 w-28 items-center justify-center  overflow-hidden"
      >
        <AsciiPet mood={mood} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mt-4 max-w-sm text-[13px] leading-[1.55] text-fg-soft"
      >
        I&apos;m a small assistant trained on Neeraj&apos;s bio. Ask about his
        projects, stack, hiring, or how he works.
      </motion.div>
    </div>
  );
}
