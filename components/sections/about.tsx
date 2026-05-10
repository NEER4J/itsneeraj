"use client";

import { META, STACK, STORY } from "@/lib/content";
import { Section } from "./section";

export function About() {
  return (
    <Section id="about" eyebrow="about">
      <h2 className="text-[clamp(28px,7.5vw,40px)] leading-[1.06] tracking-tight font-medium xl:text-[52px] xl:leading-[1.04]">
        About
      </h2>

      <div className="mt-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          Currently
        </div>
        <ul className="space-y-2.5 text-[15px] text-fg-soft leading-[1.65]">
          <li>Senior full-stack at Virtual Xcellence, since Jan 2025</li>
          <li>Building Docsiv, leading engineering on Govgrant.ca and SpeedIQ</li>
          <li>Based in India, work remote</li>
          <li>
            <a
              href={`mailto:${META.email}`}
              className="hover:text-accent transition-colors break-all"
            >
              {META.email}
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-14">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          Background
        </div>
        <ol className="space-y-7">
          {STORY.map((s) => (
            <li
              key={s.when}
              className="grid grid-cols-[72px_1fr] gap-4 sm:gap-5 md:grid-cols-[80px_1fr]"
            >
              <div className="font-mono text-[13px] tabular-nums md:text-[14px]">
                {s.when}
              </div>
              <p className="text-[15px] leading-[1.65] text-fg-soft">{s.what}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          Stack
        </div>
        <dl className="space-y-2.5 text-[14px]">
          {Object.entries(STACK).map(([k, v]) => (
            <div
              key={k}
              className="grid grid-cols-[96px_1fr] gap-4 sm:gap-5 md:grid-cols-[110px_1fr]"
            >
              <dt className="text-muted lowercase tracking-tight">{k}</dt>
              <dd className="text-fg-soft">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-14">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          How I work
        </div>
        <ul className="space-y-3 text-[15px] text-fg-soft leading-[1.65]">
          <li>Ship the smallest version that solves the actual problem. Iterate from real usage.</li>
          <li>Treat AI as a product surface, not a demo.</li>
          <li>Stay across design, architecture, build, and what happens after launch.</li>
          <li>Comfortable as the only engineer or part of a team.</li>
        </ul>
      </div>
    </Section>
  );
}
