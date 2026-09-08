import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { LocalTime } from "@/components/portfolio/local-time";
import { SideNav } from "@/components/portfolio/side-nav";
import {
  CALL,
  CASE_STUDIES,
  CONTACT,
  EXPERIENCE,
  FOOTER_NOTE,
  LINKS,
  METRICS,
  PRODUCT_PRACTICE,
  PROFILE,
} from "@/components/portfolio/data";

const externalLink = "v2-link decoration-[var(--v2-line-strong)]";

export default function HomePage() {
  return (
    <>
      <SideNav />
      <main className="mx-auto w-full max-w-[980px] px-6 pb-20 pt-8 sm:px-10 sm:pb-28 sm:pt-12">
        <header className="v2-fade flex items-center justify-between border-b border-[var(--v2-line)] pb-5">
          <a href="#hello" className="flex items-center gap-3" aria-label="Neeraj Sharma home">
            <Image src="/image copy.png" alt="Neeraj Sharma" width={96} height={96} priority className="h-11 w-11 rounded-full object-cover" />
            <span>
              <span className="block text-[15px] font-medium tracking-[-0.01em] text-[var(--v2-fg)]">Neeraj Sharma</span>
              <span className="block text-[13px] text-[var(--v2-muted)]">Technical Product Manager</span>
            </span>
          </a>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href={LINKS.resume} className="hidden text-[14px] text-[var(--v2-fg-soft)] sm:inline-flex"><span className={externalLink}>Resume</span></a>
            <ThemeToggle />
          </div>
        </header>

        <section id="hello" className="v2-fade scroll-mt-8 pb-20 pt-16 sm:pb-24 sm:pt-24">
          <p className="pm-kicker">AI products · B2B SaaS · 0 to 1</p>
          <h1 className="mt-5 max-w-[880px] font-[family-name:var(--v2-serif)] text-[clamp(2.9rem,7vw,5.8rem)] leading-[0.98] tracking-[-0.05em] text-[var(--v2-fg)]">{PROFILE.headline}</h1>
          <p className="mt-8 max-w-[720px] text-[18px] leading-[1.7] text-[var(--v2-fg-soft)] sm:text-[20px]">
            I&apos;m {PROFILE.name}, a <strong className="font-medium text-[var(--v2-fg)]">{PROFILE.role}</strong>. {PROFILE.summary}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#work" className="pm-button pm-button-primary">View product work</a>
            <a href={LINKS.resume} className="pm-button">Download PM resume</a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="pm-button">LinkedIn ↗</a>
          </div>
        </section>

        <section id="proof" aria-label="Selected outcomes" className="v2-fade grid grid-cols-2 border-y border-[var(--v2-line)] sm:grid-cols-4">
          {METRICS.map((metric) => (
            <div key={metric.label} className="pm-metric"><strong>{metric.value}</strong><span>{metric.label}</span></div>
          ))}
        </section>

        <Section id="work" label="Product case studies" intro="Three products, each showing a different part of the product job: finding the right problem, making tradeoffs, and delivering a reliable workflow.">
          <div className="grid gap-6">
            {CASE_STUDIES.map((study, index) => (
              <article key={study.slug} className="pm-case-card group">
                <Link href={`/work/${study.slug}`} className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                  <div className={index % 2 ? "lg:order-2" : ""}>
                    <div className="pm-shot">
                      <Image src={study.image} alt={`${study.name} product interface`} width={1600} height={1000} className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]" />
                    </div>
                  </div>
                  <div className={index % 2 ? "lg:order-1" : ""}>
                    <p className="pm-kicker">{study.label}</p>
                    <h3 className="mt-3 font-[family-name:var(--v2-serif)] text-[36px] leading-tight tracking-[-0.035em] text-[var(--v2-fg)] sm:text-[44px]">{study.name}</h3>
                    <p className="mt-4 text-[16px] leading-[1.7] text-[var(--v2-fg-soft)]">{study.summary}</p>
                    <p className="mt-5 font-[family-name:var(--v2-mono)] text-[12px] uppercase tracking-[0.08em] text-[var(--pm-accent)]">{study.metric}</p>
                    <span className="mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-[var(--v2-fg)]">Read the product decisions <span aria-hidden>→</span></span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </Section>

        <Section id="approach" label="How I work" intro="My engineering background changes how I practice product: I can go deep when needed, but I keep the conversation anchored in the user and the outcome.">
          <ol className="grid gap-px overflow-hidden border border-[var(--v2-line)] bg-[var(--v2-line)] md:grid-cols-2">
            {PRODUCT_PRACTICE.map((item) => (
              <li key={item.number} className="bg-[var(--v2-bg)] p-6 sm:p-8">
                <span className="font-[family-name:var(--v2-mono)] text-[12px] text-[var(--pm-accent)]">{item.number}</span>
                <h3 className="mt-5 text-[18px] font-medium tracking-[-0.02em] text-[var(--v2-fg)]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-[var(--v2-fg-soft)]">{item.text}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="about" label="Experience" intro="Five years working close to customers, code, and delivery, with increasing ownership of what gets built and why.">
          <div className="border-t border-[var(--v2-line)]">
            {EXPERIENCE.map((role) => (
              <article key={role.title + role.org} className="grid gap-3 border-b border-[var(--v2-line)] py-6 sm:grid-cols-[150px_1fr] sm:gap-8">
                <span className="font-[family-name:var(--v2-mono)] text-[12px] text-[var(--v2-muted)]">{role.period}</span>
                <div>
                  <h3 className="text-[17px] font-medium tracking-[-0.015em] text-[var(--v2-fg)]">{role.title} <span className="font-normal text-[var(--v2-muted)]">· {role.org}</span></h3>
                  <p className="mt-2 max-w-[680px] text-[15px] leading-[1.65] text-[var(--v2-fg-soft)]">{role.detail}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-[14px] text-[var(--v2-muted)]">B.Tech in Computer Science · Chhattisgarh Swami Vivekanand Technical University · 2020-2023</p>
        </Section>

        <section id="contact" className="v2-fade mt-24 scroll-mt-8 border-t border-[var(--v2-line)] pt-14 sm:mt-32 sm:pt-20">
          <p className="pm-kicker">Open to Technical Product Manager and AI Product Manager roles</p>
          <h2 className="mt-5 max-w-[760px] font-[family-name:var(--v2-serif)] text-[clamp(2.5rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.045em] text-[var(--v2-fg)]">Let&apos;s talk about the product problem behind the roadmap.</h2>
          <p className="mt-7 max-w-[620px] text-[17px] leading-[1.7] text-[var(--v2-fg-soft)]">I&apos;m especially interested in AI-first and B2B SaaS teams where technical depth, customer judgment, and fast learning all matter.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={CALL} target="_blank" rel="noreferrer" className="pm-button pm-button-primary">Book a 30-minute call</a>
            <a href="mailto:ittsneeraj@gmail.com" className="pm-button">Email me</a>
          </div>
          <ul className="mt-14 grid gap-px border-y border-[var(--v2-line)] bg-[var(--v2-line)] sm:grid-cols-4">
            {CONTACT.map((item) => (
              <li key={item.label} className="bg-[var(--v2-bg)]">
                <a href={item.href} target={item.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="block px-4 py-5 transition-colors hover:bg-[var(--v2-hover)]">
                  <span className="block text-[14px] font-medium text-[var(--v2-fg)]">{item.label}</span>
                  <span className="mt-1 block truncate text-[12px] text-[var(--v2-muted)]">{item.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-16 flex flex-col gap-2 text-[12px] text-[var(--v2-muted)] sm:flex-row sm:items-center sm:justify-between"><LocalTime /><span>{FOOTER_NOTE}</span></footer>
      </main>
    </>
  );
}

function Section({ id, label, intro, children }: { id: string; label: string; intro: string; children: React.ReactNode }) {
  return (
    <section id={id} className="v2-fade mt-24 scroll-mt-8 sm:mt-32">
      <div className="mb-10 grid gap-4 sm:grid-cols-[220px_1fr] sm:gap-10">
        <h2 className="v2-label">{label}</h2>
        <p className="max-w-[620px] text-[16px] leading-[1.7] text-[var(--v2-fg-soft)]">{intro}</p>
      </div>
      {children}
    </section>
  );
}
