# Portfolio, Structure & Layout

A snapshot of every UI piece in the portfolio, where it lives in the layout, and what it shows. Pure structure, no fonts, colors, or visual styling.

---

## 1. Top-level layout

The site has two layouts that switch on viewport width.

### Desktop (≥ 768px), 3 resizable columns

```
┌──────────────┬───────────────────────────────────┬─────────────────────────┐
│              │                                   │                         │
│   SIDEBAR    │            MAIN CONTENT           │       GAME PANE         │
│              │                                   │                         │
│  (left col)  │           (center col)            │      (top right)        │
│              │                                   ├─────────────────────────┤
│              │                                   │                         │
│              │                                   │       CHAT PANEL        │
│              │                                   │      (bottom right)     │
│              │                                   │                         │
└──────────────┴───────────────────────────────────┴─────────────────────────┘
```

- **Left column** (sidebar): default 22% width, min 14%, max 32%.
- **Middle column** (main content): default 50%, min 32%.
- **Right column** (split vertically into Game + Chat): default 28% width, min 20%, max 45%.
- **Right column vertical split**: Game ~48%, Chat ~52%, both min 20%.
- All splits are user-resizable; widths persist via `react-resizable-panels` autosave.

### Mobile (< 768px), single column + bottom dock

```
┌──────────────────────────────────────┐
│                                      │
│     ACTIVE TAB CONTENT               │
│   (Content / Game / Chat)            │
│                                      │
│                                      │
│                                      │
├──────────────────────────────────────┤
│  [Hello] [Work] [About] [Contact]    │
│         [Game] [Chat]                │  ← MobileDock
└──────────────────────────────────────┘
```

- One screen at a time. The bottom dock switches between content sections, the game pane, and the chat panel.
- Dock is a fixed pill at the bottom of the screen.

---

## 2. Sidebar (left column, desktop only)

Vertical stack, top to bottom:

1. **Brand block** (clickable, scrolls to "Hello")
   - Eyebrow: `© Code by Neeraj`
   - Heading: `Neeraj Sharma 👋` (animated waving emoji)
   - Sub-line: `AI · SaaS · Full-stack engineer.`
   - Sub-sub-line: `Shipping production work since 2020.`

2. **Section nav** (vertical list)
   - Hello
   - Work
   - About
   - Contact
   - Each row: a small dash + label. The active section's dash extends.

3. **Bottom block** (pinned at bottom via `mt-auto`)
   - **Clock**: hh:mm with seconds, day · date month, timezone abbreviation.
   - **Theme strip**: row of 8 circular swatches (theme switcher).
     - Themes: `dark`, `light`, `paper`, `terminal`, `gameboy`, `solar`, `brutalist`, `cyber`.

---

## 3. Main content (center column)

Vertical scroll. Sections are separated by thin horizontal dividers. Order:

1. **Hello** section
2. divider
3. **Work** section
4. divider
5. **About** section
6. divider
7. **Contact** section
8. Bottom spacer

Every section uses a wrapper with:
- An eyebrow line at the top (e.g. `/ hello`, `/ work`).
- A centered max-width content column (~max-w-3xl).
- A scroll-spy anchor (`#sec-{id}`) used by the sidebar nav.

### 3a. Hello section

Order top to bottom:

1. Eyebrow: `/ hello`
2. **Audience tabs** (horizontal row): `For anyone`, `Recruiters`, `Devs`, `Founders`, `Designers`. Active tab gets an underline.
3. **Headline** (large): swaps based on selected audience tab.
4. **Body paragraph**: short positioning blurb about Virtual Xcellence / Govgrant.ca / SpeedIQ.
5. **"Currently building" card** (linked to docsiv.com)
   - Eyebrow with sparkle icon: `Currently building`
   - Title: `Docsiv`
   - Inline description: `AI Documents and Branded Client Portals.`
   - Right side: `docsiv.com ↗`

### 3b. Work section

Order top to bottom:

1. Eyebrow: `/ work`
2. Heading: `Things I've shipped.`
3. Intro paragraph.
4. **Project list** (numbered, vertical). Each item is a 2-column grid:
   - **Left**: Project thumbnail card (4:3 aspect, patterned background, name + tag).
   - **Right**: project meta
     - Index number + year (small mono row)
     - Project name (linked, with `↗` if URL exists)
     - Optional metric (e.g. `2,000+ users`)
     - Story paragraph
     - Stack chips line (dot-separated)
   - Projects in order:
     1. Govgrant.ca (2025), RAG · grants · Canada, 2,000+ users
     2. Docsiv (2025), AI docs · multi-tenant
     3. SpeedIQ (2025), WA · email · multi-tenant
     4. Trade Business School (2023), education · SaaS, 200+ students
     5. UK Postcode API (2022), API · UK · auth, 1,000 clients · 100k+ fetches

5. **Also shipped** subsection
   - Eyebrow: `Also shipped`
   - 2-column rows (`name | description`):
     - Astonsys
     - Updoer
     - PicSafe
     - Apstic
     - Trekova

### 3c. About section

Order top to bottom:

1. Eyebrow: `/ about`
2. Heading: `Where I am, how I got here.`
3. **Currently** block, eyebrow + 2-col definition list:
   - role
   - working at (+ since)
   - based in
   - email (mailto link)
4. **How I got here** block, eyebrow + timeline list:
   - 2020, freelance, college
   - 2022, NJ Designpark
   - 2025, Virtual Xcellence
   - Each row is `[year + where] | [paragraph]`.
5. **Stack I reach for** block, eyebrow + 2-col definition list:
   - frontend
   - backend
   - ai
   - infra
   - payments
   - design
6. **How I work** block, eyebrow + 4-bullet list of working principles.

### 3d. Contact section

Order top to bottom:

1. Eyebrow: `/ contact`
2. Heading: `Let's talk.`
3. Intro paragraph.
4. **2-column grid** (stacks on mobile):
   - **Left column**:
     - Eyebrow: `Preferred`
     - Big link: `Book a 30-min call ↗` + `cal.com/neeraj-sharma/30min`
     - Eyebrow: `Email`
     - Email link + small caption.
   - **Right column**:
     - Eyebrow: `Elsewhere`
     - Link list: `linkedin`, `github`, `x / twitter`, `instagram`
     - Eyebrow: `Colophon`
     - Short build-credits paragraph.

---

## 4. Right column, Game pane (top)

A picker that opens into individual mini-games.

### Picker view (default)

- **Header bar**: game-controller icon + eyebrow `mini · games` + line `pick one. hover to preview.` + count on the right.
- **2-column grid of game cards**:
  1. Snake, "the classic."
  2. Tetris, "stack the blocks."
  3. Wordle, "guess in 6."
  4. Dino, "jump the cacti."
- Each card shows an animated thumbnail (animates on hover/focus).

### Active game view

- **Header bar**: `← games` button (back) on the left, current game name on the right.
- **Game body**: the selected game fills the remaining space. Compact mode on desktop.

---

## 5. Right column, Chat panel (bottom)

A streaming chat with an ASCII-cat mascot ("neeraj-bot v1").

### Header bar

- **Left**: ASCII-cat avatar tile + status dot (green idle / amber streaming).
- **Middle text**: `neeraj-bot · v1` + status line (`Say hi 👋`, `Thinking…`, `Typing…`, `Ready when you are.`).
- **Right**: `↻ new` button (clears chat, only visible after first message).

### Body (scrolls)

**Empty state**:
- Greeting line from the bot.
- Eyebrow: `Topics`
- 2x2 chip grid of starter prompts:
  - Work, "What's the one project to ask him about?"
  - Stack, "What's he using for AI these days?"
  - Hire, "Is he taking on freelance right now?"
  - Random, "Tell me one specific number from his bio."
- "Or type your own question below." line.

**Conversation state**:
- User messages: right-aligned bubbles.
- Assistant messages: left-aligned, full markdown rendering.
- While waiting for first token: animated 3-dot typing indicator.
- Inline error chip if the request fails.

### Input form (footer)

- Auto-growing textarea (max ~140px).
- Send button on the right (paper-plane icon).
- Footer hint line: `Enter to send · Shift+Enter for newline` + character count once over 200.

### ASCII-cat mascot moods

- `idle`, slow blink animation
- `talking`, fast face cycle while streaming tokens
- `thinking`, waiting for first token
- `sleeping`, unused state available

---

## 6. Mobile dock

Bottom-fixed pill. Buttons left to right:

1. Hello (house icon)
2. Work (briefcase icon)
3. About (user icon)
4. Contact (envelope icon)
5. Game (controller icon, toggles Game tab)
6. Chat (chat-bubble icon, toggles Chat tab)

The first four set both `mobileTab="content"` and the active section. Game/Chat buttons toggle the corresponding mobile tab.

---

## 7. Other pages / routes

- **`/`**, the only real page; everything above lives here.
- **`/not-found`** (404), single centered card:
  - `404` eyebrow
  - Heading: `this page wandered off.`
  - Body line.
  - `take me home →` button back to `/`.

---

## 8. API routes (server)

- **`POST /api/chat`**, backs the chat panel (streaming responses).
- **`/api/visitor`**, visitor/analytics endpoint (writes to `data/visitors.jsonl`).

---

## 9. Cross-cutting providers

Wrapped around the entire app in `app/layout.tsx`:

- `ThemeScript` (head-injected, prevents theme flash)
- `ThemeProvider` (dark / light / paper / terminal / gameboy / solar / brutalist / cyber)
- `AudienceProvider` (drives the Hello headline variants)
- `Shell` (the 3-column / mobile layout container)

---

## 10. Quick component map

| Area                    | File                                          |
| ----------------------- | --------------------------------------------- |
| Page composition        | `app/page.tsx`                                |
| App shell + layouts     | `components/shell.tsx`                        |
| Section/scroll context  | `components/shell-context.tsx`                |
| Sidebar                 | `components/sidebar.tsx`                      |
| Clock                   | `components/clock.tsx`                        |
| Theme switcher strip    | `components/theme-strip.tsx`                  |
| Audience tabs           | `components/audience-tabs.tsx`                |
| Hello section           | `components/sections/hello.tsx`               |
| Work section            | `components/sections/work.tsx`                |
| About section           | `components/sections/about.tsx`               |
| Contact section         | `components/sections/contact.tsx`             |
| Section wrapper/divider | `components/sections/section.tsx`             |
| Project thumbnail       | `components/sections/project-thumb.tsx`       |
| Chat panel              | `components/chat/chat-panel.tsx`              |
| Markdown renderer       | `components/chat/markdown-message.tsx`        |
| ASCII pet               | `components/ascii-pet.tsx`                    |
| Games picker            | `components/games/picker.tsx`                 |
| Games (Snake/Tetris/…)  | `components/games/{snake,tetris,wordle,dino}.tsx` |
| Game thumbnails         | `components/games/thumbnails.tsx`             |
| Content (data)          | `lib/content.ts`                              |
| Themes (data)           | `lib/themes.ts`                               |
| Chat API                | `app/api/chat/route.ts`                       |
| Visitor API             | `app/api/visitor/route.ts`                    |
| 404                     | `app/not-found.tsx`                           |
