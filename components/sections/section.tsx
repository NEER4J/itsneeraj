export function Section({
  id,
  eyebrow,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={`sec-${id}`}
      className={`relative scroll-mt-4 px-5 py-8 sm:px-6 md:px-12 md:py-12 ${className}`}
    >
      <div className="mx-auto w-full max-w-3xl">
        {eyebrow && (
          <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted md:mb-8">
            <span className="mr-2 text-fg/30">/</span>
            {eyebrow}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function SectionDivider() {
  return <div className="mx-5 my-2 h-px bg-border sm:mx-6 md:mx-12" />;
}
