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
    <>
      <Loader />
      <Pet />
      <main className="mx-auto w-full max-w-[620px] px-6 pb-28 pt-14 sm:pt-20">
        <header className="v2-fade flex items-center justify-between">
          <Link href="/#work" aria-label="Back to selected work" className="inline-flex">
            <Image
              src="/image copy.png"
              alt="Neeraj Sharma"
              width={96}
              height={96}
              priority
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
          <ThemeToggle />
        </header>

        <article className="v2-fade mt-16" style={{ animationDelay: "60ms" }}>
          <Link href="/#work" className="v2-label">selected work</Link>
          <h1 className="mt-5 text-[32px] leading-[1.15] tracking-[-0.03em] text-[var(--v2-fg)] sm:text-[38px]">{study.name}</h1>
          <p className="mt-2 text-[13px] text-[var(--v2-muted)]">{study.label} · {study.year}</p>
          <p className="mt-6 text-[17px] leading-[1.72] text-[var(--v2-fg-soft)]">{study.summary}</p>
          <p className="mt-4 font-[family-name:var(--v2-mono)] text-[12px] uppercase tracking-[0.08em] text-[var(--gh3)]">{study.metric}</p>

          <div className="v2-backdrop mt-10 flex items-center justify-center overflow-hidden px-5 py-8 sm:px-8 sm:py-12">
            <Image src={study.image} alt={`${study.name} product interface`} width={1600} height={1000} priority className="h-auto w-full" />
          </div>

          <CaseSection label="the problem"><p>{study.problem}</p></CaseSection>
          <CaseSection label="the research">
            <ul className="flex flex-col">
              {study.research.map((item) => <li key={item} className="border-t border-[var(--v2-line)] py-3 text-[15px] leading-[1.65] first:border-t-0 first:pt-0">{item}</li>)}
            </ul>
          </CaseSection>
          <CaseSection label="my role and scope"><p>{study.role}</p></CaseSection>
          <CaseSection label="key product decisions">
            <ol className="flex flex-col">
              {study.decisions.map((decision) => (
                <li key={decision} className="border-t border-[var(--v2-line)] py-3.5 text-[15px] leading-[1.65] text-[var(--v2-fg-soft)] first:border-t-0 first:pt-0">{decision}</li>
              ))}
            </ol>
          </CaseSection>

          <div className="mt-20 grid gap-14 sm:grid-cols-2 sm:gap-8">
            <ListSection label="what shipped" items={study.shipped} />
            <ListSection label="outcomes" items={study.outcomes} />
          </div>

          <CaseSection label="next success signals">
            <ul className="flex flex-col">
              {study.nextMetrics.map((item) => <li key={item} className="border-t border-[var(--v2-line)] py-3 text-[15px] leading-[1.65] first:border-t-0 first:pt-0">{item}</li>)}
            </ul>
          </CaseSection>

          <CaseSection label="what I learned"><p>{study.learning}</p></CaseSection>

          <CaseSection label="what this demonstrates">
            <ul className="flex flex-col">
              {study.demonstrates.map((item) => <li key={item} className="border-t border-[var(--v2-line)] py-3 text-[15px] text-[var(--v2-fg-soft)] first:border-t-0 first:pt-0">{item}</li>)}
            </ul>
          </CaseSection>

          <footer className="v2-fade mt-20 border-t border-[var(--v2-line)] pt-6">
            <p className="text-[15px] leading-[1.72] text-[var(--v2-fg-soft)]">Want to discuss the decisions behind the build?</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
              <a href="mailto:ittsneeraj@gmail.com" className="v2-link text-[var(--v2-fg)]">Email Neeraj</a>
              <a href={study.url} target="_blank" rel="noreferrer" className="v2-link text-[var(--v2-fg)]">Visit {study.name} ↗</a>
              <a href={LINKS.resume} className="v2-link text-[var(--v2-fg)]">PM resume</a>
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}

function CaseSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="v2-fade mt-20 scroll-mt-8 border-t border-[var(--v2-line)] pt-6" style={{ animationDelay: "60ms" }}>
      <h2 className="v2-label mb-6">{label}</h2>
      <div className="text-[15px] leading-[1.72] text-[var(--v2-fg-soft)]">{children}</div>
    </section>
  );
}

function ListSection({ label, items }: { label: string; items: string[] }) {
  return (
    <section className="v2-fade" style={{ animationDelay: "60ms" }}>
      <h2 className="v2-label mb-6">{label}</h2>
      <ul className="flex flex-col">
        {items.map((item) => <li key={item} className="border-t border-[var(--v2-line)] py-3 text-[15px] leading-[1.6] text-[var(--v2-fg-soft)] first:border-t-0 first:pt-0">{item}</li>)}
      </ul>
    </section>
  );
}
