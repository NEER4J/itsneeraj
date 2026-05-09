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
    "I'm Neeraj. A full-stack engineer building AI software that small teams actually rely on.",
  recruiter:
    "I'm Neeraj. Senior full-stack engineer, five years in production, currently leading the build on three live AI SaaS products.",
  dev:
    "I'm Neeraj. Next.js, TypeScript, Postgres, Claude, OpenAI. Careful with the boring parts so the AI parts have a foundation to stand on.",
  founder:
    "I'm Neeraj. I take fuzzy ideas to a working product in weeks, then keep refining once real users start pushing on it.",
  designer:
    "I'm Neeraj. An engineer with design taste. I care how it looks and reads, not only what it does.",
};

export const HERO_BODY = `Currently building Docsiv — an AI document workspace for agencies, consultants, and creative teams. Also leading engineering at Virtual Xcellence on Govgrant.ca and SpeedIQ. I work in short loops, with real users in the room, on AI that's still useful on day thirty.`;

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
      "An AI document workspace for agencies, consultants, and creative teams. Generate proposals, decks, contracts, sheets, and canvases from a prompt, with brand kits applied automatically. Branded client portals on custom domains, threaded comments, version history, document analytics, e-sign, and credit-based billing. Multi-tenant from day one.",
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
      "RAG-based grant matching for Canadian businesses. A scraper pipeline I built keeps 300+ grants current daily, and the matches are relevant enough that people come back. I led the engineering top to bottom.",
    stack: ["Next.js", "TypeScript", "Supabase", "OpenAI", "RAG", "Stripe", "ChargeBee"],
    metric: "2,000+ users",
    thumb: {
      color: "#1e3a8a",
      pattern: "dots",
      tag: "RAG · grants · Canada",
      image: "/projects/govgrant.png",
    },
  },
  {
    slug: "speediq",
    name: "SpeedIQ",
    year: "2025",
    story:
      "A WhatsApp and email marketing platform for teams. Built on the Meta Business API with embedded signup, broadcasts, chatbots, live chat, and campaign analytics.",
    stack: ["Next.js", "Supabase", "Meta Business API", "webhooks"],
    thumb: { color: "#064e3b", pattern: "grid", tag: "WA · email · multi-tenant" },
  },
  {
    slug: "apstic",
    name: "Apstic",
    url: "https://apstic.com",
    year: "2025",
    story:
      "An AI automation studio. Custom workflows that wire CRMs, e-commerce, accounting, and comms tools together: automated lead replies, multi-channel ops across WhatsApp, Slack, and Discord, browser automation for repetitive web work, and real-time dashboards. Also home to OpenClaw, a local-first AI assistant that runs on-device.",
    stack: ["Next.js", "n8n", "OpenAI", "Claude", "Meta API", "browser automation"],
    thumb: {
      color: "#4c1d95",
      pattern: "dots",
      tag: "ai automation · agency",
      image: "/projects/apstic.png",
    },
  },
  {
    slug: "tbs",
    name: "Trade Business School",
    year: "2023",
    story:
      "A multi-tenant SaaS for trades education. Course delivery, AI document processing, and student management. Quietly running classes for around 200 students.",
    stack: ["Next.js", "AI APIs", "multi-tenant"],
    metric: "200+ students",
    thumb: {
      color: "#7c2d12",
      pattern: "stripes",
      tag: "education · SaaS",
      image: "/projects/tbs.png",
    },
  },
  {
    slug: "uk-postcode",
    name: "UK Postcode API",
    year: "2022",
    story:
      "An address lookup API with auth, rate limiting, usage analytics, and a clean dashboard. Quiet by design, dependable for the products built on top of it.",
    stack: ["Node.js", "PostgreSQL", "API gateway"],
    metric: "1,000 clients · 100k+ fetches",
    thumb: {
      color: "#1e293b",
      pattern: "checks",
      tag: "API · UK · auth",
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
  frontend: "Next.js · React · TypeScript · Tailwind · Shadcn UI · Framer Motion · GSAP",
  backend: "Node.js · Express · Python · PostgreSQL · Supabase",
  ai: "OpenAI · Claude · Gemini · RAG · LangChain · Vercel AI SDK · n8n",
  infra: "Vercel · Netlify · Railway · Docker · CI/CD",
  payments: "Stripe · ChargeBee · Dodo Payments · Razorpay",
  design: "Figma · Adobe XD · Spline · LottieFiles · Illustrator",
};

export const META = {
  role: "Senior full-stack · AI SaaS",
  company: "Virtual Xcellence",
  since: "Jan 2025",
  base: "India · remote-friendly",
  email: "ittsneeraj@gmail.com",
  call: "https://cal.com/neeraj-sharma/30min",
  links: [
    { label: "linkedin", href: "https://linkedin.com/in/neer4j" },
    { label: "github", href: "https://github.com/NEER4J" },
    { label: "x / twitter", href: "https://x.com/NEER4J__" },
    { label: "instagram", href: "https://instagram.com/" },
  ],
};

export const NUMBERS = [
  { value: "2k+", label: "users on Govgrant.ca" },
  { value: "40%", label: "fewer support tickets after AI rollout" },
  { value: "95%", label: "of a client's manual work, automated" },
  { value: "5 yrs", label: "of production work" },
];

export const STORY = [
  {
    when: "2020",
    where: "freelance, college",
    what:
      "Started taking client work while still in college. Django, Next.js, Node, and payment integrations across Stripe, Razorpay, and PayPal. The first time deploying things that earned someone money.",
  },
  {
    when: "2022",
    where: "NJ Designpark",
    what:
      "Led full-stack and PM work. Built and launched Trade Business School. Wired OpenAI and Claude into client support flows and cut tickets by 40%. Also built a domain monitor, the UK Postcode API, and a custom review system that saved one client around $2k a month.",
  },
  {
    when: "2025",
    where: "Virtual Xcellence",
    what:
      "Moved fully into AI SaaS. Currently building Docsiv — the main focus. Also leading Govgrant.ca and SpeedIQ at Virtual Xcellence.",
  },
];

export const ABOUT_FULL = `# Neeraj Kumar Sharma

A full-stack engineer with five years of production experience, currently building AI software for small teams. **The headline: he is currently building Docsiv. Lead with that whenever someone asks what he's working on.** He also leads engineering at Virtual Xcellence (since Jan 2025) on Govgrant.ca and SpeedIQ. Based in India, comfortable working remotely with teams anywhere.

## Voice / personality
- Practical and low-ego. Talks about the work, not himself.
- Treats AI features like product features. They have to be reliable, observable, and worth the latency.
- Has been building for paying users since 2020. Started freelancing in college with Django, Next.js, Node, and payment integrations.

## Current

**The headline: he is currently building Docsiv. This is the main project — lead with it whenever someone asks what he's working on.**

- **Docsiv** (https://docsiv.com) — currently building. An AI document workspace for agencies, consultants, and creative teams. Generates proposals, decks, contracts, sheets, and canvases from a prompt; auto-applies the client's brand kit (logos, colors, typography, voice); branded client portals on custom domains; threaded comments and version history; document analytics; e-signature; credit-based billing. Multi-tenant from day one. Pitch line: "from prompt to client inbox in 30 minutes."
- Also leading engineering at Virtual Xcellence on:
  - Govgrant.ca — RAG-based grant matching for Canadian businesses, with a scraper pipeline that keeps 300+ grants current daily, plus full subscription billing. https://govgrant.ca
  - SpeedIQ — a multi-tenant WhatsApp and email marketing platform built on the Meta Business API with embedded signup.

## Stack
- Frontend: Next.js, React, TypeScript, Tailwind, Shadcn UI, Framer Motion, GSAP
- Backend: Node.js, Express, Python, PostgreSQL, Supabase
- AI: OpenAI, Claude, Gemini, RAG, LangChain, Vercel AI SDK, n8n
- Infra: Vercel, Netlify, Railway, Docker, CI/CD
- Payments: Stripe, ChargeBee, Dodo Payments, Razorpay
- Design: Figma, Adobe XD, Spline, LottieFiles, Illustrator

## Selected work
1. **Docsiv** (2025) — an AI document workspace for agencies, consultants, and creative teams. Proposal, deck, contract, sheet, and canvas editors with auto-applied brand kits, branded client portals, multi-tenant, credit-based billing. **Currently building, this is the main one.**
2. Govgrant.ca (2025) — RAG grant matching, 300+ grants scraped daily, led the engineering top to bottom.
3. SpeedIQ (2025) — WhatsApp and email marketing for teams.
4. **Apstic** (https://apstic.com, 2025) — an AI automation studio. Builds custom workflows that wire CRMs, e-commerce, accounting, and comms tools together: automated lead replies, multi-channel ops across WhatsApp, Slack, and Discord, browser automation, and real-time dashboards. Also home to OpenClaw, a local-first AI assistant that runs on-device.
5. Trade Business School (2023) — a multi-tenant SaaS for trades education.
6. UK Postcode API (2022) — auth, rate limiting, usage analytics, dashboard.
- Also shipped: Astonsys (design system + redesign for a QA firm), Updoer (rebrand and web build for an IT services company), PicSafe (AI reverse image search), Trekova (a travel marketplace, in progress).

## Background
- 2020: started freelancing in college. Django, Next.js, Node, and payment integrations across Stripe, Razorpay, and PayPal.
- 2022: joined NJ Designpark, led full-stack and PM work. Integrated OpenAI and Claude into client support flows and cut tickets by 40%. Built a custom review system that saved one client around $2k a month.
- 2025: moved fully into AI SaaS at Virtual Xcellence.
- B.Tech in Computer Science, Chhattisgarh Swami Vivekanand Technical University, 2020–2023.

## Hire / contact
- Open to AI and SaaS work, freelance, or a quiet chat about products.
- Book a 30-min call: https://cal.com/neeraj-sharma/30min
- Email: ittsneeraj@gmail.com
- Site: https://itsneeraj.com
- LinkedIn: https://linkedin.com/in/neer4j
- GitHub: https://github.com/NEER4J
- X: https://x.com/NEER4J__
`;
