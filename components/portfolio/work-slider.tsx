"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { FreeMode, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { type Work, SELECTED_WORK } from "./data";

// Left inset of the centered content column, so the first slide lines up with
// the "selected work" label while the track itself runs full-bleed.
const MAX_W = 620;
const GUTTER = 24;

function useColumnOffset() {
  const [offset, setOffset] = useState(GUTTER);
  useEffect(() => {
    const compute = () =>
      setOffset(Math.max(GUTTER, (window.innerWidth - MAX_W) / 2 + GUTTER));
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return offset;
}

export function WorkSlider() {
  const offset = useColumnOffset();
  const swiperRef = useRef<SwiperClass | null>(null);

  // Re-measure Swiper when the column offset (spacer widths) changes on resize.
  useEffect(() => {
    const s = swiperRef.current;
    if (s && !s.destroyed) s.update();
  }, [offset]);

  // Leading/trailing spacer slides align the first card to the content column
  // while letting the track run full-bleed. Using real (empty) slides instead
  // of slidesOffsetBefore avoids Swiper's translate glitch on prop change.
  return (
    <div className="v2-bleed">
      <Swiper
        onSwiper={(s) => {
          swiperRef.current = s;
        }}
        modules={[FreeMode, Mousewheel, Keyboard]}
        slidesPerView="auto"
        spaceBetween={20}
        freeMode={{ enabled: true, momentumBounce: false }}
        grabCursor
        keyboard={{ enabled: true }}
        mousewheel={{ forceToAxis: true }}
      >
        <SwiperSlide
          aria-hidden
          className="pointer-events-none !h-auto"
          style={{ width: offset - 20 }}
        />
        {SELECTED_WORK.map((w, i) => (
          <SwiperSlide
            key={w.name}
            className="!h-auto !w-[76vw] sm:!w-[420px] lg:!w-[520px]"
          >
            <WorkCard work={w} priority={i === 0} />
          </SwiperSlide>
        ))}
        <SwiperSlide
          aria-hidden
          className="pointer-events-none !h-auto"
          style={{ width: offset - 20 }}
        />
      </Swiper>
    </div>
  );
}

function WorkCard({ work, priority }: { work: Work; priority?: boolean }) {
  const inner = (
    <>
      <div className="v2-backdrop flex aspect-[16/11] items-center justify-center overflow-hidden px-4 py-10 sm:px-9 sm:py-16">
        {work.image ? (
          <Image
            src={work.image}
            alt={work.name}
            width={1600}
            height={1000}
            priority={priority}
            draggable={false}
            className="w-full select-none"
          />
        ) : (
          <span className="font-[family-name:var(--v2-serif)] text-[40px] italic text-[var(--v2-muted)]">
            {work.name}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="inline-flex items-baseline gap-1.5 text-[15px] font-medium tracking-[-0.01em] text-[var(--v2-fg)]">
            <span className={work.href ? "v2-link decoration-[var(--v2-line-strong)]" : ""}>
              {work.name}
            </span>
            {work.href && (
              <span
                aria-hidden
                className="text-[12px] text-[var(--v2-muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            )}
          </span>
          <p className="mt-1 text-[13.5px] leading-[1.5] text-[var(--v2-fg-soft)]">
            {work.blurb}
          </p>
        </div>
        <span className="shrink-0 pt-0.5 text-[12px] text-[var(--v2-muted)]">
          {work.metric ?? work.year}
        </span>
      </div>
    </>
  );

  const cls =
    "group block transition-transform duration-300 ease-out will-change-transform hover:-translate-y-[3px]";

  return work.href ? (
    <a
      href={work.href}
      target="_blank"
      rel="noreferrer"
      className={cls}
      draggable={false}
    >
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
