"use client";

import { SECTIONS, useShell } from "./shell-context";

export function Sidebar() {
  const { activeSection, goToSection } = useShell();

  return (
    <div className="flex h-full flex-col px-7 py-9">
      <div>
        <button
          type="button"
          onClick={() => goToSection("hello")}
          className="block text-left"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            © Code by Neeraj
          </div>
          <p className="mt-3 text-[36px] font-bold tracking-tight leading-[1] text-fg">
            Neeraj{" "}
            <span className="text-fg/70">Sharma</span>
            <span
              aria-hidden
              className="ml-1.5 inline-block animate-[wave_2.5s_ease-in-out_infinite] origin-[70%_70%]"
            >
              👋
            </span>
          </p>
          <div className="mt-4 max-w-[230px] text-[14px] leading-[1.5]">
            <div className="font-medium text-fg">
              Full-stack engineer · AI software.
            </div>
            <div className="mt-1 text-fg-soft">
              Building for paying users since 2020.
            </div>
          </div>
        </button>
      </div>

      <nav className="mt-12 flex flex-col">
        {SECTIONS.map((item) => {
          const active = item.id === activeSection;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSection(item.id)}
              className="group relative flex items-baseline gap-3 py-2 text-left"
              aria-current={active ? "true" : undefined}
            >
              <span
                className={`block h-px transition-all duration-300 ${
                  active ? "w-7 bg-fg" : "w-3 bg-muted/40 group-hover:w-5 group-hover:bg-fg-soft"
                }`}
                aria-hidden
              />
              <span
                className={`text-[15px] tracking-tight transition-colors ${
                  active ? "text-fg" : "text-muted group-hover:text-fg-soft"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
