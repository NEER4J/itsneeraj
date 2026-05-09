import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          404
        </div>
        <h1 className="mt-3 text-3xl font-medium tracking-tight">
          nothing here.
        </h1>
        <p className="mt-3 text-[14px] text-fg-soft">
          this site has just the one page, and it has everything you came for.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-accent-fg"
        >
          back to the home page →
        </Link>
      </div>
    </div>
  );
}
