import Image from "next/image";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { LocalTime } from "@/components/portfolio/local-time";
import { WorkSlider } from "@/components/portfolio/work-slider";
import { Activity } from "@/components/portfolio/activity";
import { Pet } from "@/components/portfolio/pet";
import { Loader } from "@/components/portfolio/loader";
import { getContributions } from "@/components/portfolio/github";
import {
  INTRO,
  LINKS,
  EXPERIENCE,
  SERVICES,
  STACK,
  NOW,
  NOW_UPDATED,
  CONTACT,
  CALL,
  FOOTER_NOTE,
} from "@/components/portfolio/data";

const linkCls = "v2-link text-[var(--v2-fg)] decoration-[var(--v2-line-strong)]";

export default async function HomePage() {
  const contributions = await getContributions("NEER4J");

  return (
    <>
      <Loader />
      <Pet />
      <div className="mx-auto w-full max-w-[620px] px-6 pb-28 pt-14 sm:pt-20">
      {/* Header ------------------------------------------------------- */}
      <header className="v2-fade flex items-center justify-between">
        <a href="#hello" aria-label="Neeraj Sharma" className="inline-flex">
          <Image
            src="/image copy.png"
            alt="Neeraj Sharma"
            width={96}
            height={96}
            priority
            className="h-10 w-10 rounded-full object-cover"
          />
        </a>
        <ThemeToggle />
      </header>

      {/* Intro -------------------------------------------------------- */}
      <section
        id="hello"
        className="v2-fade mt-16 scroll-mt-8"
        style={{ animationDelay: "60ms" }}
      >
        <h1 className="text-[22px] leading-[1.55] tracking-[-0.015em] text-[var(--v2-fg)]">
          Hey, I&apos;m{" "}
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="v2-link decoration-[var(--v2-line-strong)]"
          >
            {INTRO.name}
          </a>
          , {INTRO.role}.
        </h1>
        <div className="mt-6 space-y-5 text-[16px] leading-[1.72] text-[var(--v2-fg-soft)]">
          <p>{INTRO.before}</p>
          <p>
            Right now I&apos;m building{" "}
            <a href={LINKS.docsiv} target="_blank" rel="noreferrer" className={linkCls}>
              Docsiv
            </a>
            , an AI-powered document hub for agencies.
          </p>
          <p>
            I also lead engineering at{" "}
            <span className="font-medium text-[var(--v2-fg)]">Virtual Xcellence</span>
            , where I build AI products including{" "}
            <a href={LINKS.govgrant} target="_blank" rel="noreferrer" className={linkCls}>
              Govgrant.ca
            </a>{" "}
            and{" "}
            <a href={LINKS.speediq} target="_blank" rel="noreferrer" className={linkCls}>
              SpeedIQ
            </a>
            .
          </p>
        </div>
      </section>

      {/* Selected work ----------------------------------------------- */}
      <section
        id="work"
        className="v2-fade mt-20 scroll-mt-8"
        style={{ animationDelay: "140ms" }}
      >
        <h2 className="v2-label mb-6">selected work</h2>
        <WorkSlider />
      </section>

      {/* Experience -------------------------------------------------- */}
      <Section id="about" label="experience" delay="60ms">
        <ul>
          {EXPERIENCE.map((r) => (
            <li
              key={r.title + r.org}
              className="grid grid-cols-[minmax(0,7.5rem)_1fr] gap-4 border-t border-[var(--v2-line)] py-4 first:border-t-0"
            >
              <span className="pt-0.5 text-[13px] tabular-nums text-[var(--v2-muted)]">
                {r.period}
              </span>
              <span className="text-[15px] tracking-[-0.01em] text-[var(--v2-fg)]">
                {r.title}{" "}
                <span className="text-[var(--v2-muted)]">{r.org}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Services + Stack -------------------------------------------- */}
      <div className="mt-20 grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-8">
        <div className="v2-fade" style={{ animationDelay: "60ms" }}>
          <h2 className="v2-label mb-5">services</h2>
          <ul className="space-y-2.5">
            {SERVICES.map((item) => (
              <li key={item} className="text-[15px] leading-[1.5] text-[var(--v2-fg-soft)]">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="v2-fade" style={{ animationDelay: "60ms" }}>
          <h2 className="v2-label mb-5">stack</h2>
          <ul className="space-y-2.5">
            {STACK.map((item) => (
              <li key={item} className="text-[15px] leading-[1.5] text-[var(--v2-fg-soft)]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Now --------------------------------------------------------- */}
      <section className="v2-fade mt-20 scroll-mt-8" style={{ animationDelay: "60ms" }}>
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="v2-label">now</h2>
          <span className="text-[13px] text-[var(--v2-muted)]">{NOW_UPDATED}</span>
        </div>
        <ul className="flex flex-col">
          {NOW.map((item) => (
            <li
              key={item.text}
              className="flex items-start gap-3 border-t border-[var(--v2-line)] py-3 first:border-t-0 first:pt-0"
            >
              <span
                aria-hidden
                className={`mt-[7px] h-[6px] w-[6px] shrink-0 rounded-[2px] ${
                  item.live ? "bg-[var(--gh3)] pulse-soft" : "bg-[var(--v2-faint)]"
                }`}
              />
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-baseline gap-1.5 text-[15px] leading-[1.55] text-[var(--v2-fg-soft)]"
                >
                  <span className="v2-link decoration-[var(--v2-line-strong)]">
                    {item.text}
                  </span>
                  <span
                    aria-hidden
                    className="text-[12px] text-[var(--v2-muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </a>
              ) : (
                <span
                  className={`text-[15px] leading-[1.55] ${
                    item.live ? "text-[var(--v2-fg)]" : "text-[var(--v2-fg-soft)]"
                  }`}
                >
                  {item.text}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Contact ----------------------------------------------------- */}
      <Section id="contact" label="contact" delay="60ms">
        <p className="text-[15px] leading-[1.72] text-[var(--v2-fg-soft)]">
          Building Docsiv. Open to consulting, startup collaborations, and
          interesting AI product conversations. Best path is a{" "}
          <a
            href={CALL}
            target="_blank"
            rel="noreferrer"
            className="v2-link text-[var(--v2-fg)] decoration-[var(--v2-line-strong)]"
          >
            30-min call
          </a>
          .
        </p>
        <ul className="mt-5 flex flex-col">
          {CONTACT.map((c) => (
            <li key={c.label} className="border-t border-[var(--v2-line)] first:border-t-0">
              <a
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 py-3.5 text-[15px] text-[var(--v2-fg)]"
              >
                <span className="inline-flex min-w-0 items-baseline gap-2.5">
                  <span className="v2-link decoration-[var(--v2-line-strong)]">
                    {c.label}
                  </span>
                  <span className="truncate text-[13px] text-[var(--v2-muted)]">
                    {c.handle}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="shrink-0 text-[12px] text-[var(--v2-muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* Activity ---------------------------------------------------- */}
      <Activity days={contributions} />

      {/* Footer ------------------------------------------------------ */}
      <footer className="v2-fade mt-24 flex items-center justify-between border-t border-[var(--v2-line)] pt-6 text-[12px] text-[var(--v2-muted)]">
        <LocalTime />
        <span>{FOOTER_NOTE}</span>
      </footer>
      </div>
    </>
  );
}

function Section({
  id,
  label,
  delay,
  children,
}: {
  id?: string;
  label: string;
  delay?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="v2-fade mt-20 scroll-mt-8"
      style={delay ? { animationDelay: delay } : undefined}
    >
      <h2 className="v2-label mb-6">{label}</h2>
      {children}
    </section>
  );
}
