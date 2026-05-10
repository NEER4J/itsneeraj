import type { Metadata } from "next";
import Link from "next/link";
import { AsciiPet } from "@/components/ascii-pet";

export const metadata: Metadata = {
  title: "404",
  description: "This site is mostly one page. Pick a section.",
  robots: { index: false, follow: true },
};

const JUMP_LINKS: { label: string; href: string }[] = [
  { label: "Hello", href: "/" },
  { label: "Work", href: "/#sec-work" },
  { label: "About", href: "/#sec-about" },
  { label: "Contact", href: "/#sec-contact" },
];

export default function NotFound() {
  return (
    <main className="flex h-full items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="flex h-24 w-24 items-center justify-center">
          <AsciiPet mood="sleeping" />
        </div>

        <h1 className="mt-6 text-[clamp(28px,7vw,40px)] font-medium leading-[1.06] tracking-tight">
          404
        </h1>

        <p className="mt-4 text-[15px] leading-[1.65] text-fg-soft">
          This site is mostly one page. Pick a section.
        </p>

        <ul className="mt-8 divide-y divide-border border-y border-border">
          {JUMP_LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="group flex items-baseline justify-between gap-4 py-3 text-[15px] tracking-tight transition-colors hover:text-accent"
              >
                <span className="font-medium">{l.label}</span>
                <span aria-hidden className="text-[12px] text-muted group-hover:text-accent">
                  ↗
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
