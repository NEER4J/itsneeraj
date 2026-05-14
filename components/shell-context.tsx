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
          const mainRect = main.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const top = main.scrollTop + (targetRect.top - mainRect.top) - 16;
          // On mobile we need a smaller intersection band (dock at bottom).
          const maxTop = Math.max(0, main.scrollHeight - main.clientHeight);
          main.scrollTo({ top: Math.min(top, maxTop), behavior: "smooth" });
        });
      });
    },
    [pickActiveMain],
  );

  // Deep-link: on first paint, if the URL points at a known section, jump to
  // it. Waits for a main to register before scrolling.
  const didInitialJump = useRef(false);
  useEffect(() => {
    if (didInitialJump.current) return;
    const target = readSectionFromUrl();
    if (!target) {
      didInitialJump.current = true;
      return;
    }
    if (!pickActiveMain()) return;
    didInitialJump.current = true;
    queueMicrotask(() => goToSection(target));
  }, [pickActiveMain, goToSection]);

  // URL sync: keep the hash in step with whatever section is active so the
  // current view is shareable. replaceState — no history pollution.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const current = window.location.hash.replace(/^#/, "");
    if (current === activeSection) return;
    const url = `${window.location.pathname}${window.location.search}#${activeSection}`;
    window.history.replaceState(null, "", url);
  }, [activeSection]);

  // Browser back/forward: if the user navigates via history and the hash
  // changes to another section, scroll to it.
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
