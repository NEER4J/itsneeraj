"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const SECTIONS = [
  { id: "hello", label: "Hello" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
export type MobileTab = "content" | "game" | "chat";
export type LayoutId = "desktop" | "tablet" | "mobile";

type Ctx = {
  activeSection: SectionId;
  goToSection: (id: SectionId) => void;
  mobileTab: MobileTab;
  setMobileTab: (t: MobileTab) => void;
  registerMain: (layout: LayoutId, el: HTMLElement | null) => void;
};

const ShellCtx = createContext<Ctx>({
  activeSection: "hello",
  goToSection: () => {},
  mobileTab: "content",
  setMobileTab: () => {},
  registerMain: () => {},
});

function activeLayout(): LayoutId {
  if (typeof window === "undefined") return "mobile";
  if (window.matchMedia("(min-width: 1024px)").matches) return "desktop";
  if (window.matchMedia("(min-width: 768px)").matches) return "tablet";
  return "mobile";
}

const VALID_SECTIONS = new Set<string>(SECTIONS.map((s) => s.id));

function normalizeSection(raw: string | null | undefined): SectionId | null {
  if (!raw) return null;
  const clean = raw.toLowerCase().replace(/^sec-/, "");
  return VALID_SECTIONS.has(clean) ? (clean as SectionId) : null;
}

function readSectionFromUrl(): SectionId | null {
  if (typeof window === "undefined") return null;
  const fromHash = normalizeSection(window.location.hash.replace(/^#/, ""));
  if (fromHash) return fromHash;
  return normalizeSection(new URLSearchParams(window.location.search).get("section"));
}

const SECTION_SCROLL_OFFSET = 16;

function elementOffsetTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

function sectionScrollTop(main: HTMLElement, target: HTMLElement): number {
  const targetTop = elementOffsetTop(target) - elementOffsetTop(main);
  const maxTop = Math.max(0, main.scrollHeight - main.clientHeight);
  return Math.max(0, Math.min(targetTop - SECTION_SCROLL_OFFSET, maxTop));
}

export function ShellProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionId>("hello");
  const [mobileTab, setMobileTab] = useState<MobileTab>("content");
  // Use state (not refs) so effects re-run when mains mount.
  const [desktopMain, setDesktopMain] = useState<HTMLElement | null>(null);
  const [tabletMain, setTabletMain] = useState<HTMLElement | null>(null);
  const [mobileMain, setMobileMain] = useState<HTMLElement | null>(null);

  const registerMain = useCallback((layout: LayoutId, el: HTMLElement | null) => {
    const setter =
      layout === "desktop"
        ? setDesktopMain
        : layout === "tablet"
          ? setTabletMain
          : setMobileMain;
    setter((prev) => (prev === el ? prev : el));
  }, []);

  const pickActiveMain = useCallback(() => {
    const layout = activeLayout();
    if (layout === "desktop") return desktopMain;
    if (layout === "tablet") return tabletMain;
    return mobileMain;
  }, [desktopMain, tabletMain, mobileMain]);

  const goToSection = useCallback(
    (id: SectionId) => {
      setMobileTab("content");
      // Two frames so the conditional `hidden` class change applies and layout settles.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const main = pickActiveMain();
          if (!main) return;
          const target = main.querySelector<HTMLElement>(`#sec-${id}`);
          if (!target) return;
          main.scrollTo({ top: sectionScrollTop(main, target), behavior: "smooth" });
        });
      });
    },
    [pickActiveMain],
  );

  // Deep-link: pendingTarget is non-null while we're trying to land on a
  // URL-specified section. URL-sync defers to it so an intermediate "hello"
  // (from scroll-spy after the static→PanelGroup remount) can't clobber the
  // hash before we land.
  const pendingTarget = useRef<SectionId | null>(null);

  // Run the deep-link by polling. The desktop/tablet layout first renders a
  // static fallback and then remounts inside PanelGroup, so the first scroll
  // can land on a soon-to-be-discarded main. Keep polling until the active
  // main is both at the target and stable for a short window.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const target = readSectionFromUrl();
    if (!target) return;
    pendingTarget.current = target;

    let attempts = 0;
    let timeoutId: number | null = null;
    let stableTicks = 0;
    let lastMain: HTMLElement | null = null;

    const findMain = (): HTMLElement | null => {
      const layout = activeLayout();
      return document.querySelector<HTMLElement>(`main[data-layout="${layout}"]`);
    };

    const tick = () => {
      timeoutId = null;
      if (!pendingTarget.current) return;
      attempts += 1;

      const main = findMain();
      if (main !== lastMain) {
        lastMain = main;
        stableTicks = 0;
      }

      if (main) {
        const el = main.querySelector<HTMLElement>(`#sec-${target}`);
        if (el && main.scrollHeight > main.clientHeight + 4) {
          const top = sectionScrollTop(main, el);
          console.debug("[hash-scroll] " + JSON.stringify({
            attempt: attempts,
            stableTicks,
            target,
            top,
            scrollTop: main.scrollTop,
            scrollHeight: main.scrollHeight,
            clientHeight: main.clientHeight,
          }));

          if (Math.abs(main.scrollTop - top) > 2) {
            stableTicks = 0;
            main.scrollTo({ top, behavior: "auto" });
          } else {
            stableTicks += 1;
            if (stableTicks >= 4) {
              setActiveSection(target);
              pendingTarget.current = null;
              return;
            }
          }
        } else {
          stableTicks = 0;
        }
      } else {
        stableTicks = 0;
      }

      if (attempts > 80) {
        pendingTarget.current = null;
        return;
      }
      timeoutId = window.setTimeout(tick, 50);
    };

    tick();
    return () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, []);

  // URL sync: mirror activeSection into the hash. Skipped while a deep-link
  // is in flight, otherwise an intermediate scroll-spy reading would
  // overwrite the URL the user actually loaded.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pendingTarget.current) return;
    const current = window.location.hash.replace(/^#/, "");
    if (current === activeSection) return;
    const url = `${window.location.pathname}${window.location.search}#${activeSection}`;
    window.history.replaceState(null, "", url);
  }, [activeSection]);

  // Browser back/forward: re-deep-link when the hash changes externally.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onHashChange = () => {
      const target = readSectionFromUrl();
      if (target) goToSection(target);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [goToSection]);

  // Scroll-spy: observe sections inside both mains. Only the visible main's
  // sections will fire intersection events (display:none nodes have no layout).
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const setupFor = (root: HTMLElement | null) => {
      if (!root) return;
      const targets = SECTIONS.map((s) =>
        root.querySelector<HTMLElement>(`#sec-${s.id}`),
      ).filter((el): el is HTMLElement => el !== null);
      if (targets.length === 0) return;

      const isMobileMain = root === mobileMain;
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible[0]) {
            const id = visible[0].target.id.replace("sec-", "") as SectionId;
            setActiveSection(id);
          }
        },
        {
          root,
          // Bias the active band slightly higher on mobile so the dock isn't
          // counted as a visible region.
          rootMargin: isMobileMain ? "-20% 0px -65% 0px" : "-25% 0px -55% 0px",
          threshold: [0, 0.25, 0.5, 0.75],
        },
      );

      targets.forEach((t) => observer.observe(t));
      observers.push(observer);
    };

    setupFor(desktopMain);
    setupFor(tabletMain);
    setupFor(mobileMain);

    return () => observers.forEach((o) => o.disconnect());
  }, [desktopMain, tabletMain, mobileMain]);

  const value = useMemo<Ctx>(
    () => ({
      activeSection,
      goToSection,
      mobileTab,
      setMobileTab,
      registerMain,
    }),
    [activeSection, goToSection, mobileTab, registerMain],
  );

  return <ShellCtx.Provider value={value}>{children}</ShellCtx.Provider>;
}

export function useShell() {
  return useContext(ShellCtx);
}
