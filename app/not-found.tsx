import type { Metadata } from "next";
import Link from "next/link";
import { AsciiPet } from "@/components/ascii-pet";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you tried to reach doesn't exist on this site.",
  robots: { index: false, follow: true },
};

const JUMP_LINKS: { label: string; href: string; hint: string }[] = [
  { label: "Hello", href: "/", hint: "the start" },
  { label: "Work", href: "/#sec-work", hint: "selected projects" },
  { label: "About", href: "/#sec-about", hint: "where I am, how I got here" },
  { label: "Contact", href: "/#sec-contact", hint: "say hi" },
];

export default function NotFound() {
  return (
    <main className="flex h-full items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          <span className="mr-2 text-fg/30">/</span>
          404 · not found
        </div>

        <div className="mt-8 flex h-24 w-24 items-center justify-center">
          <AsciiPet mood="sleeping" />
        </div>

        <h1 className="mt-6 text-[clamp(28px,7vw,40px)] font-medium leading-[1.06] tracking-tight">
          Nothing lives here.
        </h1>

        <p className="mt-4 text-[15px] leading-[1.65] text-fg-soft">
          This site is mostly one page, and that page is the one you were
          probably looking for. Pick a section and I&apos;ll take you there.
        </p>

        <ul className="mt-8 divide-y divide-border border-y border-border">
          {JUMP_LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="group flex items-baseline justify-between gap-4 py-3 text-[15px] tracking-tight transition-colors hover:text-accent"
              >
                <span className="font-medium">{l.label}</span>
                <span className="text-[12px] text-muted group-hover:text-accent">
                  {l.hint} <span aria-hidden>↗</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            Take me home
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
