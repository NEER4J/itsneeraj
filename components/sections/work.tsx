import { ALSO_SHIPPED, PROJECTS } from "@/lib/content";
import { Section } from "./section";
import { ProjectThumb } from "./project-thumb";

export function Work() {
  return (
    <Section id="work" eyebrow="work">
      <h2 className="text-[clamp(28px,7.5vw,40px)] leading-[1.06] tracking-tight font-medium md:text-[52px] md:leading-[1.04]">
        Selected work.
      </h2>
      <p className="mt-4 max-w-xl text-[15px] leading-[1.65] text-fg-soft">
        A small set of products I&apos;ve led from blank page to live product, and stuck around for the long tail of getting them used.
      </p>

      <ol className="mt-10 space-y-10 md:mt-12 md:space-y-12">
        {PROJECTS.map((p, i) => (
          <li
            key={p.slug}
            className="grid grid-cols-1 gap-4 sm:grid-cols-[180px_1fr] sm:gap-5 md:grid-cols-[200px_1fr]"
          >
            <a
              href={p.url ?? "#"}
              target={p.url ? "_blank" : undefined}
              rel={p.url ? "noopener noreferrer" : undefined}
              className="block w-full transition-transform hover:scale-[1.02]"
              aria-label={p.url ? `Open ${p.name}` : p.name}
            >
              <ProjectThumb thumb={p.thumb} name={p.name} />
            </a>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                <span className="font-mono text-[10px] tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {p.thumb.tag}
                </span>
                {p.current && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    currently building
                  </span>
                )}
              </div>
              <h3 className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[20px] tracking-tight font-medium md:text-[22px]">
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      p.current
                        ? "group inline-flex items-baseline gap-2 text-accent hover:opacity-80 transition-opacity"
                        : "group inline-flex items-baseline gap-2 hover:text-accent transition-colors"
                    }
                  >
                    {p.name}
                    <span className="text-[12px] text-muted group-hover:text-accent translate-y-[1px]">
                      ↗
                    </span>
                  </a>
                ) : (
                  p.name
                )}
                {p.metric && (
                  <span className="font-mono text-[11px] text-muted">
                    · {p.metric}
                  </span>
                )}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-fg-soft">{p.story}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14 md:mt-16">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          Also shipped
        </div>
        <ul className="space-y-3 text-[14px]">
          {ALSO_SHIPPED.map((s) => (
            <li
              key={s.name}
              className="grid grid-cols-1 gap-1 sm:grid-cols-[140px_1fr] sm:gap-4 md:grid-cols-[180px_1fr]"
            >
              <span className="font-medium">{s.name}</span>
              <span className="text-fg-soft">{s.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
