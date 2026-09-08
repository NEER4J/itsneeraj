import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES, LINKS } from "@/components/portfolio/data";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { Loader } from "@/components/portfolio/loader";
import { Pet } from "@/components/portfolio/pet";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((item) => item.slug === slug);
  if (!study) return {};
  return {
    title: `${study.name} Product Case Study`,
    description: `${study.summary} Read the problem, product decisions, delivery scope, and outcomes.`,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((item) => item.slug === slug);
  if (!study) notFound();

  return (
    <main className="pm-case-shell min-h-dvh">
      <Loader />
      <Pet />
      <div className="mx-auto w-full max-w-[900px] px-6 pb-24 pt-8 sm:px-10 sm:pt-12">
        <header className="flex items-center justify-between border-b border-[var(--v2-line)] pb-5">
          <Link href="/#work" className="text-[14px] text-[var(--v2-fg-soft)]"><span className="v2-link">← All product work</span></Link>
          <ThemeToggle />
        </header>

        <article className="pt-16 sm:pt-24">
          <p className="pm-kicker">{study.label} · {study.year}</p>
          <h1 className="mt-5 font-[family-name:var(--v2-serif)] text-[clamp(3.8rem,10vw,7.4rem)] leading-[0.9] tracking-[-0.055em] text-[var(--v2-fg)]">{study.name}</h1>
          <p className="mt-8 max-w-[690px] text-[20px] leading-[1.65] text-[var(--v2-fg-soft)]">{study.summary}</p>
          <p className="mt-5 font-[family-name:var(--v2-mono)] text-[12px] uppercase tracking-[0.08em] text-[var(--pm-accent)]">{study.metric}</p>

          <div className="pm-shot mt-12 sm:mt-16">
            <Image src={study.image} alt={`${study.name} product interface`} width={1600} height={1000} priority className="h-auto w-full" />
          </div>

          <CaseSection label="The problem"><p>{study.problem}</p></CaseSection>
          <CaseSection label="My role and scope"><p>{study.role}</p></CaseSection>
          <CaseSection label="Key product decisions">
            <ol className="pm-decision-list">{study.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ol>
          </CaseSection>

          <div className="mt-20 grid gap-12 border-t border-[var(--v2-line)] pt-12 sm:grid-cols-2 sm:gap-16">
            <ListSection title="What shipped" items={study.shipped} />
            <ListSection title="Outcomes" items={study.outcomes} />
          </div>

          <CaseSection label="What this demonstrates">
            <ul className="flex flex-wrap gap-2">
              {study.demonstrates.map((item) => <li key={item} className="border border-[var(--v2-line-strong)] px-3 py-2 text-[13px] text-[var(--v2-fg-soft)]">{item}</li>)}
            </ul>
          </CaseSection>

          <footer className="mt-24 border-t border-[var(--v2-line)] pt-10">
            <p className="max-w-[620px] font-[family-name:var(--v2-serif)] text-[32px] leading-[1.2] tracking-[-0.03em] text-[var(--v2-fg)]">Want to discuss the decisions behind the build?</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="mailto:ittsneeraj@gmail.com" className="pm-button pm-button-primary">Email Neeraj</a>
              <a href={study.url} target="_blank" rel="noreferrer" className="pm-button">Visit {study.name} ↗</a>
              <a href={LINKS.resume} className="pm-button">PM resume</a>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}

function CaseSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-20 grid gap-5 border-t border-[var(--v2-line)] pt-10 sm:grid-cols-[190px_1fr] sm:gap-12">
      <h2 className="v2-label">{label}</h2>
      <div className="text-[17px] leading-[1.75] text-[var(--v2-fg-soft)]">{children}</div>
    </section>
  );
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="v2-label">{title}</h2>
      <ul className="mt-6 space-y-4 text-[15px] leading-[1.65] text-[var(--v2-fg-soft)]">
        {items.map((item) => <li key={item} className="border-l-2 border-[var(--pm-accent)] pl-4">{item}</li>)}
      </ul>
    </section>
  );
}
