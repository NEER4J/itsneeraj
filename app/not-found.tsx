import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
  description: "This site is mostly one page. Pick a section.",
  robots: { index: false, follow: true },
};

const JUMP_LINKS: { label: string; href: string }[] = [
  { label: "Hello", href: "/#hello" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[620px] flex-col justify-center px-6 py-20">
      <p className="v2-label">404</p>
      <h1 className="mt-4 text-[22px] leading-[1.4] tracking-[-0.015em] text-[var(--v2-fg)]">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-3 text-[16px] leading-[1.6] text-[var(--v2-fg-soft)]">
        The site is mostly one page — pick a section below.
      </p>

      <ul className="mt-8 flex flex-col">
        {JUMP_LINKS.map((l) => (
          <li key={l.label} className="border-t border-[var(--v2-line)] first:border-t-0">
            <Link
              href={l.href}
              className="group flex items-center justify-between py-3.5 text-[15px] text-[var(--v2-fg)]"
            >
              <span className="v2-link decoration-[var(--v2-line-strong)]">{l.label}</span>
              <span
                aria-hidden
                className="text-[12px] text-[var(--v2-muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
