# Site copy

Every bit of human-readable copy on the site, UI text, marketing prose, the chat system prompt, and the bio it embeds. Grouped by where it appears.

---

## SEO / metadata, `app/layout.tsx` + `app/manifest.ts`

- **Site name:** Neeraj Sharma
- **Default title:** `Neeraj Sharma · full-stack engineer, AI products`
- **Title template:** `%s · Neeraj Sharma`
- **Description:** Full-stack engineer, five years building AI products. Building Docsiv right now, leading engineering on Govgrant.ca and SpeedIQ at Virtual Xcellence.
- **Manifest name:** `Neeraj Sharma · full-stack engineer, AI products`
- **Manifest description:** Full-stack engineer, five years building AI products. Building Docsiv right now.
- **JSON-LD job title:** Full-stack engineer · works for Virtual Xcellence · alumni of Chhattisgarh Swami Vivekanand Technical University · India (remote-friendly)
- **Keywords:** Neeraj Sharma, Neeraj Kumar Sharma, full-stack engineer, AI engineer, AI SaaS, Next.js developer, TypeScript, RAG, Claude, OpenAI, Docsiv, Govgrant.ca, SpeedIQ, Virtual Xcellence

---

## Sidebar / brand, `components/sidebar.tsx`

- Eyebrow: `© Code by Neeraj`
- Name: `Neeraj Sharma 👋`
- Tagline: `Full-stack engineer · AI software.`
- Sub: `Building for paying users since 2020.`
- Nav labels: `Hello`, `Work`, `About`, `Contact`

Mobile top bar repeats `© Code by Neeraj`.

---

## Hello section, `components/sections/hello.tsx` + `lib/content.ts`

**Audience tabs:** `Everyone`, `Recruiters`, `Engineers`, `Founders`, `Designers`

**Headline (one per audience):**
- **Everyone:** I'm Neeraj. Full-stack engineer. Five years building AI products.
- **Recruiters:** I'm Neeraj. Five years full-stack, three AI products in production. Open to senior full-stack and AI engineering roles.
- **Engineers:** I'm Neeraj. Next.js, Postgres, Claude, OpenAI. I like the boring infrastructure under the AI parts.
- **Founders:** I'm Neeraj. I take ideas to live products fast, and stay through the part where they need to actually work.
- **Designers:** I'm Neeraj. Engineer with design taste. I care how it reads, not just what it does.

**Hero body:** I'm building Docsiv right now, an AI document workspace for agencies. I also lead engineering on Govgrant.ca and SpeedIQ at Virtual Xcellence. Five years of shipping. Based in India.

---

## Sticky note (desktop + mobile), `components/sticky-notes.tsx` + `components/sections/hello.tsx`

- Eyebrow: `currently building`
- Body: `AI documents. Branded client portals.`
- Link label: `docsiv.com ↗`
- Empty user note placeholder: `write something…`
- Aria labels: `Add a sticky note`, `Delete note`, label `note`

---

## Work section, `components/sections/work.tsx` + `lib/content.ts`

- Title: `Work`
- Intro: Six products I've built or led from zero to live. Most are still running.
- Currently-building chip: `building now`

**Projects:**

1. **Docsiv**, `AI docs · agencies`, 2025, *building now*
   > An AI document workspace for agencies. Generate proposals, decks, contracts, and sheets from a prompt. Brand kits apply automatically. Branded client portals on custom domains. Multi-tenant, with credit billing, comments, version history, analytics, and e-signature.
   - Stack: Next.js · Supabase · AI SDK · OpenAI · Liveblocks · Dodo Payments

2. **Govgrant.ca**, `RAG · Canada`, 2025, `2,000 users`
   > RAG-based grant matching for Canadian businesses. A scraper pipeline keeps 300+ grants current daily. I lead the engineering.
   - Stack: Next.js · TypeScript · Supabase · OpenAI · RAG · Stripe · ChargeBee

3. **SpeedIQ**, `WhatsApp · multi-tenant`, 2025
   > WhatsApp and email marketing for teams. Built on Meta's Business API: embedded signup, broadcasts, chatbots, live chat, campaign analytics.
   - Stack: Next.js · Supabase · Meta Business API · webhooks

4. **Apstic**, `AI automation`, 2025
   > An AI automation studio. Custom workflows connecting CRMs, e-commerce, accounting, and comms. Lead replies, multi-channel ops across WhatsApp, Slack, and Discord, browser automation, real-time dashboards. Includes OpenClaw, a local-first AI assistant.
   - Stack: Next.js · n8n · OpenAI · Claude · Meta API · browser automation

5. **Trade Business School**, `education SaaS`, 2023, `200 students`
   > Multi-tenant SaaS for trades education. Course delivery, AI document processing, student management.
   - Stack: Next.js · AI APIs · multi-tenant

6. **UK Postcode API**, `API · auth`, 2022, `1,000 clients · 100k fetches`
   > Address lookup API. Auth, rate limiting, usage analytics, dashboard.
   - Stack: Node.js · PostgreSQL · API gateway

**Also shipped:**
- **Astonsys**, design system and site redesign for a QA firm
- **Updoer**, rebrand and web build for an IT services company
- **PicSafe**, AI reverse image search for unauthorised photo usage
- **Trekova**, a travel marketplace, in progress

---

## About section, `components/sections/about.tsx` + `lib/content.ts`

- Title: `About`

**Currently:**
- Senior full-stack at Virtual Xcellence, since Jan 2025
- Building Docsiv, leading engineering on Govgrant.ca and SpeedIQ
- Based in India, work remote
- ittsneeraj@gmail.com

**Background:**
- **2020.** Started freelancing in college. Django, Next.js, Node. Stripe, Razorpay, PayPal integrations. First time deploying code that handled real money.
- **2022.** Joined NJ Designpark. Led full-stack and PM work. Built Trade Business School from scratch. Wired Claude and OpenAI into support flows, dropped tickets 40%. Built a review system that saved a client $2k a month.
- **2025.** Moved fully into AI SaaS at Virtual Xcellence. Now leading three products.

**Stack:**
- frontend: Next.js · React · TypeScript · Tailwind · Shadcn · Framer Motion
- backend: Node · Python · Postgres · Supabase
- ai: OpenAI · Claude · Gemini · RAG · LangChain · Vercel AI SDK · n8n
- infra: Vercel · Railway · Docker
- payments: Stripe · ChargeBee · Dodo Payments · Razorpay

**How I work:**
- Ship the smallest version that solves the actual problem. Iterate from real usage.
- Treat AI as a product surface, not a demo.
- Stay across design, architecture, build, and what happens after launch.
- Comfortable as the only engineer or part of a team.

---

## Contact section, `components/sections/contact.tsx`

- Title: `Contact`
- Intro: Open to full-time roles, contract, and freelance, senior full-stack and AI engineering. Or a chat about something you're building.
- **Preferred:** `Book 30 minutes ↗`, `cal.com/neeraj-sharma/30min`
- **Email:** ittsneeraj@gmail.com
- **Elsewhere:** linkedin · github · x · instagram
- **Built with:** Next.js 16, Tailwind CSS v4, and Framer Motion. Typeface is Geist. Designed and coded from scratch, no templates.

---

## Theme strip, `lib/themes.ts`

- `auto`, system theme
- `dark`, quiet
- `light`, bright
- `terminal`, green CRT
- `retro`, 70s sunshine

---

## Chat panel UI, `components/chat/chat-panel.tsx`

- Empty state: `I'm a small assistant trained on Neeraj's bio. Ask about his projects, stack, hiring, or how he works.`
- Input placeholder: `Ask anything…`
- Clear-chat label: `new`
- Suggestion chips:
  - **Work:** What is he building right now?
  - **Stack:** What's his AI stack?
  - **Hire:** Is he open to full-time roles or freelance?
  - **Random:** Tell me how he works.
- Limit card:
  - Eyebrow: `session ended`
  - Headline: `we've hit the chat limit for this session`
  - Body: `if you'd like to keep the conversation going, the fastest ways to reach Neeraj are right here.`
  - Tile labels: `email`, `book a call` → `30 min · cal.com`, `also on`

---

## Chat API, server messages, `app/api/chat/route.ts`

- Missing key (503): `chat is offline right now. set OPENROUTER_API_KEY in .env.local to bring it back. (the rest of the site still works.)`
- Rate limited (429): `you've hit the chat rate limit. give it a bit and try again, or email ittsneeraj@gmail.com.`
- Bad JSON: `invalid json`
- Bad shape: `messages must end with a user turn`
- Upstream error: `upstream <status>: <detail>`

---

## Chat system prompt (the LLM persona), `app/api/chat/route.ts`

```
You are a friendly little chatbot embedded on Neeraj Kumar Sharma's portfolio site.

Voice rules:
- Lowercase, casual, warm. Short messages by default (1–4 sentences).
- Refer to "Neeraj" or "he". You are not Neeraj, you're a chatbot trained on his bio.
- If asked something not covered by his bio, say so honestly and suggest emailing him at ittsneeraj@gmail.com or booking a call at https://cal.com/neeraj-sharma/30min.
- Don't invent projects, clients, numbers, or facts. Stick to what's in the bio below.
- A tiny bit playful is okay. Single emoji once in a while is fine, but don't overdo it.

Hiring rules (important, recruiters and hiring managers use this chat):
- Neeraj is open to **full-time roles, contract, and freelance**. Treat recruiter and hiring-manager messages seriously and answer plainly.
- Best fit: **senior full-stack or AI engineering** at AI-first or AI-adjacent product teams. He's comfortable as a senior IC, the only engineer in the room, or technical leadership in small-to-mid teams. Remote-friendly; based in India.
- For any "is he hiring/available" / "looking for a role" / "open to full-time" question, lead with "yes, open to full-time, contract, and freelance," then point them to the cal.com link (https://cal.com/neeraj-sharma/30min) or ittsneeraj@gmail.com so they can take it off-chat.
- If a recruiter shares a role spec or company, don't pretend to know specifics about the role, point them to email/cal so Neeraj can respond directly.
- Don't volunteer salary, location, or visa details. Defer those to a direct conversation.

Content rules:
- **Docsiv (https://docsiv.com) is the headline.** It's what he is currently building and the project to highlight first. Whenever the conversation touches "what he's working on", "current project", "what should I check out", or "his latest", lead with Docsiv.
- When listing his projects, put Docsiv first and call out that it's the one he's currently building. The others are real work too, but they're context, not the headline.
- Avoid leading with specific numbers/metrics (user counts, fetch counts, etc.). Mention them only if directly asked, and frame them as context, not as the headline.
- Talk about what he builds and how he thinks, not vanity stats.

Formatting rules:
- Markdown is supported. Use it when it helps: short bullet lists for project lists, **bold** for project names, tables for stack comparisons, fenced code blocks for code.
- Don't use headings (# / ## / ###). Keep responses inline-conversational.
- Don't use markdown for one-liner answers. Those should be plain prose.
- Always render URLs as clickable [link text](url), never bare URLs.

Here is everything you know about Neeraj:

{ABOUT_FULL, see below}
```

---

## ABOUT_FULL, bio fed into the chat, `lib/content.ts`

```markdown
# Neeraj Kumar Sharma

A full-stack engineer with five years of production experience, currently building AI software for small teams. **The headline: he is currently building Docsiv. Lead with that whenever someone asks what he's working on.** He also leads engineering at Virtual Xcellence (since Jan 2025) on Govgrant.ca and SpeedIQ. Based in India, comfortable working remotely with teams anywhere.

**Availability: open to full-time roles, contract, and freelance.** Best fit is senior full-stack or AI engineering at AI-first or AI-adjacent product teams.

## Voice / personality
- Practical and low-ego. Talks about the work, not himself.
- Treats AI features like product features. They have to be reliable, observable, and worth the latency.
- Has been building for paying users since 2020. Started freelancing in college with Django, Next.js, Node, and payment integrations.

## Current

**The headline: he is currently building Docsiv. This is the main project. Lead with it whenever someone asks what he's working on.**

- **Docsiv** (https://docsiv.com): currently building. An AI document workspace for agencies, consultants, and creative teams. Generates proposals, decks, contracts, sheets, and canvases from a prompt; auto-applies the client's brand kit (logos, colors, typography, voice); branded client portals on custom domains; threaded comments and version history; document analytics; e-signature; credit-based billing. Multi-tenant from day one. Pitch line: "from prompt to client inbox in 30 minutes."
- Also leading engineering at Virtual Xcellence on:
  - Govgrant.ca: RAG-based grant matching for Canadian businesses, with a scraper pipeline that keeps 300+ grants current daily, plus full subscription billing. https://govgrant.ca
  - SpeedIQ: a multi-tenant WhatsApp and email marketing platform built on the Meta Business API with embedded signup.

## Stack
- Frontend: Next.js, React, TypeScript, Tailwind, Shadcn UI, Framer Motion, GSAP
- Backend: Node.js, Express, Python, PostgreSQL, Supabase
- AI: OpenAI, Claude, Gemini, RAG, LangChain, Vercel AI SDK, n8n
- Infra: Vercel, Netlify, Railway, Docker, CI/CD
- Payments: Stripe, ChargeBee, Dodo Payments, Razorpay
- Design: Figma, Adobe XD, Spline, LottieFiles, Illustrator

## Selected work
1. **Docsiv** (2025): an AI document workspace for agencies, consultants, and creative teams. Proposal, deck, contract, sheet, and canvas editors with auto-applied brand kits, branded client portals, multi-tenant, credit-based billing. **Currently building, this is the main one.**
2. Govgrant.ca (2025): RAG grant matching, 300+ grants scraped daily, led the engineering top to bottom.
3. SpeedIQ (2025): WhatsApp and email marketing for teams.
4. **Apstic** (https://apstic.com, 2025): an AI automation studio. Builds custom workflows that wire CRMs, e-commerce, accounting, and comms tools together: automated lead replies, multi-channel ops across WhatsApp, Slack, and Discord, browser automation, and real-time dashboards. Also home to OpenClaw, a local-first AI assistant that runs on-device.
5. Trade Business School (2023): a multi-tenant SaaS for trades education.
6. UK Postcode API (2022): auth, rate limiting, usage analytics, dashboard.
- Also shipped: Astonsys (design system + redesign for a QA firm), Updoer (rebrand and web build for an IT services company), PicSafe (AI reverse image search), Trekova (a travel marketplace, in progress).

## Background
- 2020: started freelancing in college. Django, Next.js, Node, and payment integrations across Stripe, Razorpay, and PayPal.
- 2022: joined NJ Designpark, led full-stack and PM work. Integrated OpenAI and Claude into client support flows and cut tickets by 40%. Built a custom review system that saved one client around $2k a month.
- 2025: moved fully into AI SaaS at Virtual Xcellence.
- B.Tech in Computer Science, Chhattisgarh Swami Vivekanand Technical University, 2020–2023.

## Hire / contact
- **Open to full-time roles, contract, and freelance.** Senior full-stack or AI engineering, especially at AI-first or AI-adjacent product teams.
- Comfortable as a senior IC, the only engineer in the room, or technical leadership in small-to-mid teams.
- Remote-friendly; based in India. Open to async-first or hybrid setups.
- Recruiters and hiring managers: best path is a 30-min call or email, where he can talk through the role directly.
- Book a 30-min call: https://cal.com/neeraj-sharma/30min
- Email: ittsneeraj@gmail.com
- Site: https://itsneeraj.com
- LinkedIn: https://linkedin.com/in/neer4j
- GitHub: https://github.com/NEER4J
- X: https://x.com/NEER4J__
```

> The chatbot's bio is intentionally untouched, it's the model's source of truth and changing it without testing the chat output is risky. Update separately if its tone needs to match the new copy.

---

## 404 page, `app/not-found.tsx`

- Meta title: `404`
- Meta description: `This site is mostly one page. Pick a section.`
- Headline: `404`
- Body: This site is mostly one page. Pick a section.
- Jump links: `Hello`, `Work`, `About`, `Contact`
- CTA: `Take me home →`

---

## Standalone bio used outside the app, `public/about-me.md`

Long-form version kept in `public/`, not rendered on the site itself. Has its own voice, written before the recent copy pass, and may be out of date relative to the new tone.

---

## Misc UI strings

- Games picker, eyebrow `arcade` · subhead `pick one` · back button `games` · game names `snake`, `tetris`, `wordle`, `dino`
- Section eyebrows: `hello`, `work`, `about`, `contact` (each prefixed by a slash glyph)
- Tablet/mobile dock labels: `Game`, `Chat`, plus the four section labels
- Aria labels: `panels`, `sections`, `close`, `send`, `clear chat`, `thinking`, `Open <Project>`, `switch theme (current: <theme>)`
