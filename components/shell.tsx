"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import {
  ChatCircleTextIcon,
  EnvelopeSimpleIcon,
  GameControllerIcon,
  HouseIcon,
  BriefcaseIcon,
  UserIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Sidebar } from "./sidebar";
import { ChatPanel } from "./chat/chat-panel";
import { GamesPicker } from "./games/picker";
import { Clock } from "./clock";
import { Socials } from "./socials";
import { ThemeStrip } from "./theme-strip";
import { MobileTopBar } from "./mobile-top-bar";
import {
  type LayoutId,
  type MobileTab,
  type SectionId,
  SECTIONS,
  ShellProvider,
  useShell,
} from "./shell-context";

const CARD = "h-full min-h-0 overflow-hidden rounded-md bg-bg-elevated";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <ShellProvider>
      <Layout>{children}</Layout>
    </ShellProvider>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="h-dvh w-full overflow-hidden">
      {/* Desktop (≥1024px): resizable 3-column layout */}
      <div className="hidden h-full lg:block">
        <div className="h-full overflow-hidden p-5">
          {mounted ? (
            <PanelGroup direction="horizontal" autoSaveId="neeraj.cols.v2">
              <Panel defaultSize={22} minSize={14} maxSize={32}>
                <LeftStack />
              </Panel>
              <ResizeHandle direction="horizontal" />
              <Panel defaultSize={78} minSize={32}>
                <div
                  className={`${CARD} card-enter`}
                  data-card-accent="rainbow"
                  style={{ animationDelay: "60ms" }}
                >
                  <Main layoutId="desktop">{children}</Main>
                </div>
              </Panel>
            </PanelGroup>
          ) : (
            <div className="grid h-full grid-cols-[280px_minmax(0,1fr)] gap-5">
              <LeftStack />
              <div className={CARD}>
                <Main layoutId="desktop">{children}</Main>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tablet (768–1023px): 2-column with floating dock + sheet overlay */}
      <div className="hidden h-full md:block lg:hidden">
        <TabletLayout>{children}</TabletLayout>
      </div>

      {/* Mobile (<768px): single column with bottom dock */}
      <div className="md:hidden">
        <MobileLayout>{children}</MobileLayout>
      </div>
    </div>
  );
}

function Main({
  children,
  layoutId,
}: {
  children: React.ReactNode;
  layoutId: LayoutId;
}) {
  const { registerMain } = useShell();
  const ref = useCallback(
    (el: HTMLElement | null) => registerMain(layoutId, el),
    [registerMain, layoutId],
  );
  const padClass = layoutId === "tablet" ? "pb-20 scroll-pb-20" : "";
  return (
    <main
      ref={ref}
      data-layout={layoutId}
      className={`h-full overflow-y-auto ${padClass}`}
    >
      {children}
    </main>
  );
}

function LeftStack() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="grid h-full grid-rows-[minmax(0,1fr)_auto_auto_auto] gap-5">
        <div className={`${CARD} overflow-y-auto`}>
          <Sidebar />
        </div>
        <div className={CARD}>
          <div className="h-full overflow-y-auto p-4">
            <Clock />
          </div>
        </div>
        <div className={CARD}>
          <div className="h-full p-3">
            <Socials />
          </div>
        </div>
        <div className={CARD}>
          <div className="h-full p-3">
            <ThemeStrip />
          </div>
        </div>
      </div>
    );
  }

  return (
    <PanelGroup direction="vertical" autoSaveId="neeraj.left.v3">
      <Panel defaultSize={66} minSize={20}>
        <div
          className={`${CARD} overflow-y-auto card-enter`}
          data-card-accent="blue"
          style={{ animationDelay: "0ms" }}
        >
          <Sidebar />
        </div>
      </Panel>
      <ResizeHandle direction="vertical" />
      <Panel defaultSize={10} minSize={6}>
        <div
          className={`${CARD} card-enter`}
          data-card-accent="orange"
          style={{ animationDelay: "120ms" }}
        >
          <div className="h-full overflow-y-auto p-3">
            <Clock />
          </div>
        </div>
      </Panel>
      <ResizeHandle direction="vertical" />
      <Panel defaultSize={10} minSize={6}>
        <div
          className={`${CARD} card-enter`}
          data-card-accent="green"
          style={{ animationDelay: "180ms" }}
        >
          <div className="h-full p-3">
            <Socials />
          </div>
        </div>
      </Panel>
      <ResizeHandle direction="vertical" />
      <Panel defaultSize={14} minSize={6}>
        <div
          className={`${CARD} card-enter`}
          data-card-accent="purple"
          style={{ animationDelay: "240ms" }}
        >
          <div className="h-full p-3">
            <ThemeStrip />
          </div>
        </div>
      </Panel>
    </PanelGroup>
  );
}

function GamePane({
  compact = true,
  onActiveChange,
}: {
  compact?: boolean;
  onActiveChange?: (active: boolean) => void;
}) {
  return <GamesPicker compact={compact} onActiveChange={onActiveChange} />;
}

function MobileLayout({ children }: { children: React.ReactNode }) {
  const { mobileTab } = useShell();
  const paneCard = "min-h-0 flex-1 overflow-hidden rounded-md bg-bg-elevated card-enter";

  return (
    <div className="relative h-dvh overflow-hidden">
      <div
        className="flex h-full flex-col gap-3 p-3"
        style={{
          paddingTop: "max(0.75rem, env(safe-area-inset-top))",
          paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
        }}
      >
        <div
          className="overflow-hidden rounded-md bg-bg-elevated card-enter"
          data-card-accent="blue"
          style={{ animationDelay: "0ms" }}
        >
          <MobileTopBar />
        </div>
        <div
          className={`${paneCard} ${mobileTab === "content" ? "" : "hidden"}`}
          data-card-accent="rainbow"
          style={{ animationDelay: "60ms" }}
        >
          <Main layoutId="mobile">{children}</Main>
        </div>
        <div
          className={`${paneCard} ${mobileTab === "game" ? "" : "hidden"}`}
          data-card-accent="red"
          style={{ animationDelay: "60ms" }}
        >
          <GamePane compact={false} />
        </div>
        <div
          className={`${paneCard} ${mobileTab === "chat" ? "" : "hidden"}`}
          data-card-accent="yellow"
          style={{ animationDelay: "60ms" }}
        >
          <ChatPanel />
        </div>
        <MobileDock />
      </div>
    </div>
  );
}

function TabletLayout({ children }: { children: React.ReactNode }) {
  const { mobileTab, setMobileTab } = useShell();
  const sheetOpen = mobileTab !== "content";

  // Close sheet on Escape
  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileTab("content");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheetOpen, setMobileTab]);

  return (
    <div className="relative h-full overflow-hidden">
      <div className="grid h-full grid-cols-[260px_minmax(0,1fr)] gap-4 p-4 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-5 lg:p-5">
        <TabletLeftStack />
        <div
          className={`${CARD} card-enter`}
          data-card-accent="rainbow"
          style={{ animationDelay: "60ms" }}
        >
          <Main layoutId="tablet">{children}</Main>
        </div>
      </div>

      <SecondarySheet
        open={mobileTab === "game"}
        accent="red"
        onClose={() => setMobileTab("content")}
      >
        <GamePane compact={false} />
      </SecondarySheet>
      <SecondarySheet
        open={mobileTab === "chat"}
        accent="yellow"
        onClose={() => setMobileTab("content")}
      >
        <ChatPanel />
      </SecondarySheet>

      <TabletDock active={mobileTab} onSelect={setMobileTab} />
    </div>
  );
}

function TabletLeftStack() {
  return (
    <div className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto_auto_auto] gap-4 lg:gap-5">
      <div
        className={`${CARD} overflow-y-auto card-enter`}
        data-card-accent="blue"
        style={{ animationDelay: "0ms" }}
      >
        <Sidebar />
      </div>
      <div
        className={`${CARD} card-enter`}
        data-card-accent="orange"
        style={{ animationDelay: "120ms" }}
      >
        <div className="p-3">
          <Clock />
        </div>
      </div>
      <div
        className={`${CARD} card-enter`}
        data-card-accent="green"
        style={{ animationDelay: "180ms" }}
      >
        <div className="p-3">
          <Socials />
        </div>
      </div>
      <div
        className={`${CARD} card-enter`}
        data-card-accent="purple"
        style={{ animationDelay: "240ms" }}
      >
        <div className="p-3">
          <ThemeStrip />
        </div>
      </div>
    </div>
  );
}

function SecondarySheet({
  open,
  accent,
  onClose,
  children,
}: {
  open: boolean;
  accent: "red" | "yellow";
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <button
        type="button"
        aria-hidden={!open}
        tabIndex={-1}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-hidden={!open}
        className={`fixed inset-y-4 right-4 z-50 flex w-[min(480px,calc(100vw-2rem))] flex-col overflow-hidden rounded-md bg-bg-elevated shadow-[var(--shadow)] transition-transform duration-300 ease-out lg:inset-y-5 lg:right-5 ${
          open ? "translate-x-0" : "translate-x-[calc(100%+1.5rem)]"
        }`}
        data-card-accent={accent}
      >
        <div className="flex items-center justify-end border-b border-border/40 px-2 py-1.5">
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="grid h-8 w-8 place-items-center rounded-full text-fg-soft transition-colors hover:bg-bg hover:text-fg"
          >
            <XIcon size={16} weight="bold" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      </aside>
    </>
  );
}

const SECONDARY_TABS: { id: Exclude<MobileTab, "content">; label: string; Icon: React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill" | "duotone" }> }[] = [
  { id: "game", label: "Game", Icon: GameControllerIcon },
  { id: "chat", label: "Chat", Icon: ChatCircleTextIcon },
];

function TabletDock({
  active,
  onSelect,
}: {
  active: MobileTab;
  onSelect: (t: MobileTab) => void;
}) {
  return (
    <nav
      aria-label="panels"
      className="pointer-events-none fixed bottom-4 right-4 z-[60] flex justify-end lg:bottom-5 lg:right-5"
    >
      <div className="pointer-events-auto flex items-stretch gap-1 rounded-2xl border border-border bg-bg-elevated/95 p-1 shadow-[var(--shadow)] backdrop-blur">
        {SECONDARY_TABS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(isActive ? "content" : id)}
              aria-pressed={isActive}
              aria-label={label}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-medium leading-none transition-colors ${
                isActive ? "bg-accent text-accent-fg" : "text-fg-soft hover:bg-bg hover:text-fg"
              }`}
            >
              <Icon size={16} weight={isActive ? "fill" : "regular"} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

const SECTION_ICON: Record<SectionId, React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill" | "duotone" }>> = {
  hello: HouseIcon,
  work: BriefcaseIcon,
  about: UserIcon,
  contact: EnvelopeSimpleIcon,
};

function MobileDock() {
  const { activeSection, goToSection, mobileTab, setMobileTab } = useShell();

  return (
    <nav
      aria-label="sections"
      className="card-enter flex flex-none items-stretch gap-1 overflow-hidden rounded-md bg-bg-elevated p-1.5"
      data-card-accent="purple"
      style={{ animationDelay: "120ms" }}
    >
      {SECTIONS.map((s) => {
        const active = mobileTab === "content" && activeSection === s.id;
        const Icon = SECTION_ICON[s.id];
        return (
          <DockButton
            key={s.id}
            active={active}
            onClick={() => goToSection(s.id)}
            icon={<Icon size={18} weight={active ? "fill" : "regular"} />}
            label={s.label}
          />
        );
      })}
      <DockButton
        active={mobileTab === "game"}
        onClick={() => setMobileTab(mobileTab === "game" ? "content" : "game")}
        icon={<GameControllerIcon size={18} weight={mobileTab === "game" ? "fill" : "regular"} />}
        label="Game"
      />
      <DockButton
        active={mobileTab === "chat"}
        onClick={() => setMobileTab(mobileTab === "chat" ? "content" : "chat")}
        icon={<ChatCircleTextIcon size={18} weight={mobileTab === "chat" ? "fill" : "regular"} />}
        label="Chat"
      />
    </nav>
  );
}

function DockButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-sm px-1 py-2 text-[10px] font-medium leading-none transition-colors ${
        active ? "bg-accent text-accent-fg" : "text-fg-soft active:bg-bg"
      }`}
    >
      {icon}
      <span className="hidden min-[360px]:block truncate max-w-full">{label}</span>
    </button>
  );
}

function ResizeHandle({
  direction,
  onDragging,
}: {
  direction: "horizontal" | "vertical";
  onDragging?: (isDragging: boolean) => void;
}) {
  const isHorizontal = direction === "horizontal";
  return (
    <PanelResizeHandle
      onDragging={onDragging}
      className={`group relative flex items-center justify-center transition-colors ${
        isHorizontal ? "w-5" : "h-5"
      }`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute rounded-full bg-muted/40 transition-all group-hover:bg-fg group-hover:scale-110 group-data-[resize-handle-active]:bg-accent ${
          isHorizontal
            ? "h-12 w-[4px] group-hover:w-1.5"
            : "h-[4px] w-12 group-hover:h-1.5"
        }`}
      />
    </PanelResizeHandle>
  );
}
