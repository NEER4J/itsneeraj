export type AudienceId =
  | "anyone"
  | "recruiter"
  | "dev"
  | "founder"
  | "designer";

export const AUDIENCES: { id: AudienceId; label: string }[] = [
  { id: "anyone", label: "Everyone" },
  { id: "recruiter", label: "Recruiters" },
  { id: "dev", label: "Engineers" },
  { id: "founder", label: "Founders" },
  { id: "designer", label: "Designers" },
];

export const HERO_BY_AUDIENCE: Record<AudienceId, string> = {
  anyone:
    "I'm Neeraj. Full-stack engineer. Five years building AI products.",
  recruiter:
    "I'm Neeraj. Five years full-stack, three AI products in production. Open to senior full-stack and AI engineering roles.",
  dev:
    "I'm Neeraj. Next.js, Postgres, Claude, OpenAI. I like the boring infrastructure under the AI parts.",
  founder:
    "I'm Neeraj. I take ideas to live products fast, and stay through the part where they need to actually work.",
  designer:
    "I'm Neeraj. Engineer with design taste. I care how it reads, not just what it does.",
};

export const HERO_BODY = `I'm building Docsiv right now, an AI document workspace for agencies. I also lead engineering on Govgrant.ca and SpeedIQ at Virtual Xcellence. Five years of shipping. Based in India.`;

export type PatternId = "dots" | "lines" | "grid" | "stripes" | "checks";

export type ProjectThumb = {
  /** Solid base color of the thumbnail. Should be dark enough for white text. */
  color: string;
  /** Pattern overlay style. */
  pattern: PatternId;
  /** Tag line shown on the thumbnail. */
  tag: string;
  /** Optional screenshot. When set, the thumb renders the image at its
      natural aspect ratio instead of the colored 4:3 block. */
  image?: string;
};

export type Project = {
  slug: string;
  name: string;
  url?: string;
  year: string;
  story: string;
  stack: string[];
  metric?: string;
  thumb: ProjectThumb;
  current?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "docsiv",
    name: "Docsiv",
    url: "https://docsiv.com",
    year: "2025",
    current: true,
    story:
      "An AI document workspace for agencies. Generate proposals, decks, contracts, and sheets from a prompt. Brand kits apply automatically. Branded client portals on custom domains. Multi-tenant, with credit billing, comments, version history, analytics, and e-signature.",
    stack: ["Next.js", "Supabase", "AI SDK", "OpenAI", "Liveblocks", "Dodo Payments"],
    thumb: {
      color: "#312e81",
      pattern: "lines",
      tag: "AI docs · agencies",
      image: "/projects/docsiv.png",
    },
  },
  {
    slug: "govgrant",
    name: "Govgrant.ca",
    url: "https://govgrant.ca",
    year: "2025",
    story:
      "RAG-based grant matching for Canadian businesses. A scraper pipeline keeps 300+ grants current daily. I lead the engineering.",
    stack: ["Next.js", "TypeScript", "Supabase", "OpenAI", "RAG", "Stripe", "ChargeBee"],
    metric: "2,000 users",
    thumb: {
      color: "#1e3a8a",
      pattern: "dots",
      tag: "RAG · Canada",
      image: "/projects/govgrant.png",
    },
  },
  {
    slug: "speediq",
    name: "SpeedIQ",
    year: "2025",
    story:
      "WhatsApp and email marketing for teams. Built on Meta's Business API: embedded signup, broadcasts, chatbots, live chat, campaign analytics.",
    stack: ["Next.js", "Supabase", "Meta Business API", "webhooks"],
    thumb: { color: "#064e3b", pattern: "grid", tag: "WhatsApp · multi-tenant" },
  },
  {
    slug: "apstic",
    name: "Apstic",
    url: "https://apstic.com",
    year: "2025",
    story:
      "An AI automation studio. Custom workflows connecting CRMs, e-commerce, accounting, and comms. Lead replies, multi-channel ops across WhatsApp, Slack, and Discord, browser automation, real-time dashboards. Includes OpenClaw, a local-first AI assistant.",
    stack: ["Next.js", "n8n", "OpenAI", "Claude", "Meta API", "browser automation"],
    thumb: {
      color: "#4c1d95",
      pattern: "dots",
      tag: "AI automation",
      image: "/projects/apstic.png",
    },
  },
  {
    slug: "tbs",
    name: "Trade Business School",
    year: "2023",
    story:
      "Multi-tenant SaaS for trades education. Course delivery, AI document processing, student management.",
    stack: ["Next.js", "AI APIs", "multi-tenant"],
    metric: "200 students",
    thumb: {
      color: "#7c2d12",
      pattern: "stripes",
      tag: "education SaaS",
      image: "/projects/tbs.png",
    },
  },
  {
    slug: "uk-postcode",
    name: "UK Postcode API",
    year: "2022",
    story:
      "Address lookup API. Auth, rate limiting, usage analytics, dashboard.",
    stack: ["Node.js", "PostgreSQL", "API gateway"],
    metric: "1,000 clients · 100k fetches",
    thumb: {
      color: "#1e293b",
      pattern: "checks",
      tag: "API · auth",
      image: "/projects/postcode.png",
    },
  },
];

export const ALSO_SHIPPED = [
  { name: "Astonsys", desc: "design system and site redesign for a QA firm" },
  { name: "Updoer", desc: "rebrand and web build for an IT services company" },
  { name: "PicSafe", desc: "AI reverse image search for unauthorised photo usage" },
  { name: "Trekova", desc: "a travel marketplace, in progress" },
];

export const STACK = {
  frontend: "Next.js · React · TypeScript · Tailwind · Shadcn · Framer Motion",
  backend: "Node · Python · Postgres · Supabase",
  ai: "OpenAI · Claude · Gemini · RAG · LangChain · Vercel AI SDK · n8n",
  infra: "Vercel · Railway · Docker",
  payments: "Stripe · ChargeBee · Dodo Payments · Razorpay",
};

export const META = {
  email: "ittsneeraj@gmail.com",
  call: "https://cal.com/neeraj-sharma/30min",
  links: [
    { label: "linkedin", href: "https://linkedin.com/in/neer4j" },
    { label: "github", href: "https://github.com/NEER4J" },
    { label: "x", href: "https://x.com/NEER4J__" },
    { label: "instagram", href: "https://www.instagram.com/neerajsharma.__/" },
  ],
};

export const STORY = [
  {
    when: "2020",
    what:
      "Started freelancing in college. Django, Next.js, Node. Stripe, Razorpay, PayPal integrations. First time deploying code that handled real money.",
  },
  {
    when: "2022",
    what:
      "Joined NJ Designpark. Led full-stack and PM work. Built Trade Business School from scratch. Wired Claude and OpenAI into support flows, dropped tickets 40%. Built a review system that saved a client $2k a month.",
  },
  {
    when: "2025",
    what:
      "Moved fully into AI SaaS at Virtual Xcellence. Now leading three products.",
  },
];

export const ABOUT_FULL = `# Neeraj Kumar Sharma

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
`;
