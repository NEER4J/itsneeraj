"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  p: ({ children }) => <p className="my-2 first:mt-0 last:mb-0 leading-[1.55]">{children}</p>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent transition-colors"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold text-fg">{children}</strong>,
  em: ({ children }) => <em className="italic text-fg-soft">{children}</em>,
  ul: ({ children }) => (
    <ul className="my-2 ml-5 list-disc space-y-0.5 first:mt-0 last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 ml-5 list-decimal space-y-0.5 first:mt-0 last:mb-0">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-[1.55]">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-2 border-l-2 border-border pl-3 text-fg-soft italic">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...rest }) => {
    const isInline = !/\blanguage-/.test(className ?? "");
    if (isInline) {
      return (
        <code
          className="rounded bg-bg px-1.5 py-0.5 font-mono text-[0.85em] text-fg before:content-none after:content-none"
          {...rest}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        className={`block font-mono text-[12px] leading-relaxed ${className ?? ""}`}
        {...rest}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-2 overflow-x-auto rounded-lg border border-border bg-bg p-3 first:mt-0 last:mb-0">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-2 overflow-x-auto first:mt-0 last:mb-0">
      <table className="w-full border-collapse text-[12px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="border-b border-border">{children}</thead>,
  th: ({ children }) => (
    <th className="px-2 py-1 text-left font-medium text-fg">{children}</th>
  ),
  tr: ({ children }) => <tr className="border-b border-border/50 last:border-0">{children}</tr>,
  td: ({ children }) => <td className="px-2 py-1 align-top text-fg-soft">{children}</td>,
  hr: () => <hr className="my-3 border-border" />,
  // Headings are discouraged in the system prompt, but render politely if used.
  h1: ({ children }) => (
    <h3 className="mt-3 mb-1 text-[15px] font-semibold first:mt-0">{children}</h3>
  ),
  h2: ({ children }) => (
    <h3 className="mt-3 mb-1 text-[14px] font-semibold first:mt-0">{children}</h3>
  ),
  h3: ({ children }) => (
    <h4 className="mt-3 mb-1 text-[13px] font-semibold first:mt-0">{children}</h4>
  ),
};

export function MarkdownMessage({ children }: { children: string }) {
  return (
    <div className="text-[13px] leading-[1.55]">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
