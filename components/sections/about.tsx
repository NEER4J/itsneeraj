"use client";

import { META, STACK, STORY } from "@/lib/content";
import { Section } from "./section";

export function About() {
  return (
    <Section id="about" eyebrow="about">
      <h2 className="text-[clamp(28px,7.5vw,40px)] leading-[1.06] tracking-tight font-medium md:text-[52px] md:leading-[1.04]">
        Where I am, how I got here.
      </h2>

      <div className="mt-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          Currently
        </div>
        <dl className="space-y-3 text-[15px]">
          <Row label="role">{META.role}</Row>
          <Row label="working at">
            {META.company} <span className="text-muted">· {META.since}</span>
          </Row>
          <Row label="based in">{META.base}</Row>
          <Row label="email">
            <a
              href={`mailto:${META.email}`}
              className="hover:text-accent transition-colors break-all"
            >
              {META.email}
            </a>
          </Row>
        </dl>
      </div>

      <div className="mt-14">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          How I got here
        </div>
        <ol className="space-y-7">
          {STORY.map((s) => (
            <li
              key={s.when}
              className="grid grid-cols-[72px_1fr] gap-4 sm:gap-5 md:grid-cols-[80px_1fr]"
            >
              <div>
                <div className="font-mono text-[13px] tabular-nums md:text-[14px]">{s.when}</div>
                <div className="mt-0.5 text-[11px] text-muted leading-tight">
                  {s.where}
                </div>
              </div>
              <p className="text-[15px] leading-[1.65] text-fg-soft">{s.what}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          Stack I reach for
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
          <li>Get the smallest useful version in front of real users early, then refine from what they actually do.</li>
          <li>
            Treat AI features like product features — reliable, observable, and worth the
            wait.
          </li>
          <li>
            Stay close to the whole loop: design, architecture, build, and the quiet
            iteration after launch.
          </li>
          <li>
            Equally at home as the only engineer in the room or sharing the work with a
            team.
          </li>
        </ul>
      </div>
    </Section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[96px_1fr] gap-4 sm:gap-5 md:grid-cols-[110px_1fr]">
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted self-center">
        {label}
      </dt>
      <dd className="text-fg-soft">{children}</dd>
    </div>
  );
}
