// Content for the home page — a clean single-column, editorial layout.

export const LINKS = {
  linkedin: "https://linkedin.com/in/neer4j",
  x: "https://x.com/NEER4J__",
  docsiv: "https://docsiv.com",
  govgrant: "https://govgrant.ca",
  speediq: "https://app.speediq.ai/",
  vx: "https://virtualxcellence.com",
};

export const INTRO = {
  name: "Neeraj Sharma",
  role: "an engineer building AI products",
  before:
    "For the past five years, I've been building AI products from 0 → 1. Software that ships and holds up in production.",
};

export type Work = {
  name: string;
  year: string;
  blurb: string;
  href?: string;
  metric?: string;
  image?: string;
};

export const SELECTED_WORK: Work[] = [
  {
    name: "Docsiv",
    year: "2025",
    href: "https://docsiv.com",
    image: "/projects/docsiv.png?v=2",
    blurb:
      "An AI-powered document hub for agencies: proposals, reports, contracts, presentations, spreadsheets, and client portals in one branded workspace.",
    metric: "building now",
  },
  {
    name: "SpeedIQ",
    year: "2025",
    href: "https://app.speediq.ai/",
    image: "/projects/speediq.png?v=2",
    blurb:
      "WhatsApp and email marketing for teams, built on Meta's Business API: broadcasts, chatbots, live chat, campaign analytics.",
  },
  {
    name: "Govgrant.ca",
    year: "2025",
    href: "https://govgrant.ca",
    image: "/projects/govgrant.png",
    blurb:
      "RAG-based grant matching for Canadian businesses. A scraper pipeline keeps 300+ grants current daily. I lead the engineering.",
    metric: "2,000 users",
  },
  {
    name: "Trade Business School",
    year: "2023",
    image: "/projects/tbs.png",
    blurb:
      "Multi-tenant SaaS for trades education. Course delivery, AI document processing, and student management.",
    metric: "200 students",
  },
  {
    name: "Apstic",
    year: "2025",
    href: "https://apstic.com",
    image: "/projects/apstic.png",
    blurb:
      "An AI automation studio. Custom workflows wiring CRMs, commerce, and comms together, plus OpenClaw, a local-first AI assistant.",
  },
];

export type Role = {
  period: string;
  title: string;
  org: string;
};

export const EXPERIENCE: Role[] = [
  { period: "2025 – Present", title: "Founder", org: "Docsiv" },
  { period: "2025 – Present", title: "Lead Engineer", org: "Virtual Xcellence" },
  { period: "2022 – 2025", title: "Full-stack Engineer & PM", org: "NJ Designpark" },
  { period: "2020 – 2023", title: "B.Tech, Computer Science", org: "CSVTU" },
];

export const SERVICES = [
  "AI product engineering",
  "Full-stack development",
  "AI agents & RAG systems",
  "Multi-tenant SaaS",
  "Payments & billing",
  "Technical leadership",
];

export const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js · Python",
  "PostgreSQL · Supabase",
  "OpenAI · Claude",
  "Vercel AI SDK · MCP · RAG",
  "Vercel · Stripe · Dodo",
];

// What I'm focused on right now. `live` items are actively in progress and get
// a pulsing marker; the rest are recent ships / state.
export type NowItem = { text: string; live?: boolean; href?: string };
export const NOW: NowItem[] = [
  { text: "Preparing Docsiv for launch 🚀", live: true },
  { text: "Onboarding the first agencies to Docsiv", live: true },
  { text: "Building AI agents and MCPs for Docsiv", live: true },
  { text: "Shipping new features every week" },
  { text: "Talking to users and chasing product-market fit" },
  { text: "Living in Bangalore and drinking too much filter coffee ☕" },
  { text: "This site is open source", href: "https://github.com/NEER4J/neeraj-portfolio" },
];
export const NOW_UPDATED = "Updated July 2026";

// X first — that's where the public building happens.
export const CONTACT = [
  { label: "Email", href: "mailto:ittsneeraj@gmail.com", handle: "ittsneeraj@gmail.com" },
  { label: "X", href: "https://x.com/NEER4J__", handle: "@NEER4J__" },
  { label: "LinkedIn", href: "https://linkedin.com/in/neer4j", handle: "in/neer4j" },
  { label: "GitHub", href: "https://github.com/NEER4J", handle: "@NEER4J" },
];

export const CALL = "https://cal.com/neeraj-sharma/30min";

export const FOOTER_NOTE = "Still shipping.";
