"use client";

import { META } from "@/lib/content";
import { Section } from "./section";

export function Contact() {
  return (
    <Section id="contact" eyebrow="contact">
      <h2 className="text-[clamp(28px,7.5vw,40px)] leading-[1.06] tracking-tight font-medium xl:text-[52px] xl:leading-[1.04]">
        Contact
      </h2>
      <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-fg-soft">
        Open to full-time roles, contract, and freelance — senior full-stack and AI engineering. Or a chat about something you&apos;re building.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
            Preferred
          </div>
          <a
            href={META.call}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="text-[22px] tracking-tight font-medium group-hover:text-accent transition-colors md:text-[24px]">
              Book 30 minutes
              <span className="ml-2 text-[14px] text-muted group-hover:text-accent">↗</span>
            </div>
            <div className="mt-1 font-mono text-[11px] text-muted break-all">
              cal.com/neeraj-sharma/30min
            </div>
          </a>

          <div className="mt-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
              Email
            </div>
            <a
              href={`mailto:${META.email}`}
              className="block text-[18px] tracking-tight font-medium hover:text-accent transition-colors break-all md:text-[20px]"
            >
              {META.email}
            </a>
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
            Elsewhere
          </div>
          <ul className="space-y-2.5 text-[15px]">
            {META.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-2 hover:text-accent transition-colors"
                >
                  {l.label}
                  <span className="text-[11px] text-muted group-hover:text-accent">↗</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
              Colophon
            </div>
            <p className="text-[13px] text-muted leading-[1.7] max-w-xs">
              Built with Next.js 16, Tailwind v4, Framer Motion. Set in Geist.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
