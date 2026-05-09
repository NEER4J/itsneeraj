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
} from "@phosphor-icons/react";
import { Sidebar } from "./sidebar";
import { ChatPanel } from "./chat/chat-panel";
import { GamesPicker } from "./games/picker";
import { Clock } from "./clock";
import { Socials } from "./socials";
import { ThemeStrip } from "./theme-strip";
import { StickyNotes } from "./sticky-notes";
import { MobileTopBar } from "./mobile-top-bar";
import {
  type LayoutId,
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
      {/* Desktop: resizable 3-column layout */}
      <div className="hidden h-full md:block">
        <div className="h-full overflow-hidden p-5">
          {mounted ? (
            <PanelGroup direction="horizontal" autoSaveId="neeraj.cols.v1">
              <Panel defaultSize={22} minSize={14} maxSize={32}>
                <LeftStack />
              </Panel>
              <ResizeHandle direction="horizontal" />
              <Panel defaultSize={50} minSize={32}>
                <div
                  className={`${CARD} card-enter`}
                  data-card-accent="rainbow"
                  style={{ animationDelay: "60ms" }}
                >
                  <Main layoutId="desktop">{children}</Main>
                </div>
              </Panel>
              <ResizeHandle direction="horizontal" />
              <Panel defaultSize={28} minSize={20} maxSize={45}>
                <RightStack />
              </Panel>
            </PanelGroup>
          ) : (
            <div className="grid h-full grid-cols-[280px_minmax(0,1fr)_400px] gap-5">
              <LeftStack />
              <div className={CARD}>
                <Main layoutId="desktop">{children}</Main>
              </div>
              <RightStack />
            </div>
          )}
        </div>
      </div>

      {/* Mobile: single column with bottom dock */}
      <div className="md:hidden">
        <MobileLayout>{children}</MobileLayout>
      </div>

      <StickyNotes />
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
  const isMobile = layoutId === "mobile";
  return (
    <main
      ref={ref}
      data-layout={layoutId}
      className={`h-full overflow-y-auto ${
        isMobile ? "pb-dock scroll-pb-dock" : ""
      }`}
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

function RightStack() {
  const [gameActive, setGameActive] = useState(false);

  return (
    <div className="flex h-full flex-col gap-5">
      <div
        className={`overflow-hidden rounded-md bg-bg-elevated card-enter ${
          gameActive ? "min-h-0 flex-1" : "flex-none"
        }`}
        data-card-accent="red"
        style={{ animationDelay: "100ms" }}
      >
        <GamePane onActiveChange={setGameActive} />
      </div>
      <div
        className={`overflow-hidden rounded-md bg-bg-elevated card-enter ${
          gameActive ? "h-[260px] flex-none" : "min-h-0 flex-1"
        }`}
        data-card-accent="yellow"
        style={{ animationDelay: "160ms" }}
      >
        <ChatPanel />
      </div>
    </div>
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

  return (
    <div className="relative h-dvh overflow-hidden">
      <div className={`flex h-full flex-col ${mobileTab === "content" ? "" : "hidden"}`}>
        <MobileTopBar />
        <div className="min-h-0 flex-1">
          <Main layoutId="mobile">{children}</Main>
        </div>
      </div>
      <div className={`h-full pb-dock ${mobileTab === "game" ? "block" : "hidden"}`}>
        <GamePane compact={false} />
      </div>
      <div className={`h-full pb-dock ${mobileTab === "chat" ? "block" : "hidden"}`}>
        <ChatPanel />
      </div>
      <MobileDock />
    </div>
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
      className="fixed inset-x-0 bottom-0 z-50 px-2 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto flex w-full max-w-md items-stretch gap-0.5 rounded-2xl border border-border bg-bg-elevated/95 p-1 shadow-[var(--shadow)] backdrop-blur">
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
      </div>
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
      className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[9px] font-medium leading-none transition-colors ${
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
