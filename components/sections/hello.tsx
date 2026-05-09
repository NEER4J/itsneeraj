"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { AudienceTabs } from "../audience-tabs";
import { useAudience } from "../audience-provider";
import { HERO_BODY, HERO_BY_AUDIENCE, PROJECTS } from "@/lib/content";
import { Section } from "./section";

export function Hello() {
  const { audience } = useAudience();
  const headline = HERO_BY_AUDIENCE[audience];
  const current = PROJECTS.find((p) => p.current);

  return (
    <Section id="hello" eyebrow="hello">
      <div className="mb-7">
        <AudienceTabs />
      </div>

      <motion.h1
        key={audience}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-[clamp(30px,9vw,44px)] leading-[1.06] tracking-tight font-medium text-balance md:text-[64px] md:leading-[1.04]"
      >
        {headline}
      </motion.h1>

      <p className="mt-6 max-w-2xl text-[15px] leading-[1.65] text-fg-soft whitespace-pre-line md:mt-7 md:text-[16px] md:leading-[1.7]">
        {HERO_BODY}
      </p>

      {/* Mobile-only sticky note (desktop has its own draggable one). */}
      {current && <CurrentlyBuildingNote project={current} />}
    </Section>
  );
}

function CurrentlyBuildingNote({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  return (
    <div className="mt-10 flex justify-start md:hidden">
      <motion.a
        href={project.url ?? "#"}
        target={project.url ? "_blank" : undefined}
        rel={project.url ? "noopener noreferrer" : undefined}
        initial={{ opacity: 0, y: 12, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: -1.6 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        whileTap={{ scale: 0.98, rotate: -0.8 }}
        className="relative block w-[260px] rounded-[2px] bg-note-bg p-4 text-note-fg shadow-[0_14px_30px_rgba(0,0,0,0.25)]"
        aria-label={`Currently building ${project.name}`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2 left-1/2 h-3 w-16 -translate-x-1/2 rotate-[-3deg] bg-fg/10"
        />
        <div className="flex items-start justify-between gap-2">
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] opacity-70">
            currently building
          </div>
          {project.url && (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide opacity-75">
              {new URL(project.url).host.replace(/^www\./, "")}
              <ArrowUpRightIcon size={11} weight="bold" />
            </span>
          )}
        </div>
        {project.slug === "docsiv" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="https://www.docsiv.com/docsiv-logo.svg"
            alt={project.name}
            className="mt-3 h-7 w-auto select-none"
            draggable={false}
          />
        ) : (
          <div className="mt-3 text-[20px] font-semibold tracking-tight">
            {project.name}
          </div>
        )}
        <p className="mt-3 text-[12px] leading-snug opacity-85">
          {project.slug === "docsiv"
            ? "AI documents. Branded client portals."
            : project.story.split(".")[0] + "."}
        </p>
      </motion.a>
    </div>
  );
}
