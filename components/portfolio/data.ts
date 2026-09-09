// Product-positioned content shared by the portfolio and case-study pages.

export const LINKS = {
  linkedin: "https://linkedin.com/in/neer4j",
  github: "https://github.com/NEER4J",
  x: "https://x.com/NEER4J__",
  docsiv: "https://docsiv.com",
  govgrant: "https://govgrant.ca",
  speediq: "https://app.speediq.ai/",
  resume: "/Neeraj_Kumar_Sharma_Product_Manager.pdf",
};

export const PROFILE = {
  name: "Neeraj Sharma",
  role: "Technical Product Manager",
  headline: "I turn messy workflows into AI products people can use.",
  summary:
    "Product-minded engineer and founder with five years of experience taking B2B SaaS from ambiguous customer problems to production. I combine discovery, prioritization, and product judgment with enough technical depth to ship alongside engineering teams.",
};

export const INTRO = {
  name: PROFILE.name,
  role: "a technical product manager building AI products",
  before:
    "For the past five years, I've taken B2B SaaS from ambiguous customer problems to production - combining product judgment with hands-on technical depth.",
};

export const METRICS = [
  { value: "5 years", label: "building products" },
  { value: "2,000+", label: "users served" },
  { value: "100k+", label: "messages delivered" },
  { value: "40%", label: "support workload reduced" },
];

export type CaseStudy = {
  slug: string;
  name: string;
  label: string;
  year: string;
  url: string;
  image: string;
  metric: string;
  summary: string;
  problem: string;
  research: string[];
  role: string;
  decisions: string[];
  shipped: string[];
  outcomes: string[];
  nextMetrics: string[];
  learning: string;
  demonstrates: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "docsiv",
    name: "Docsiv",
    label: "Founder-led 0 to 1 product",
    year: "2024-2026",
    url: LINKS.docsiv,
    image: "/projects/docsiv.png?v=2",
    metric: "Live and onboarding early agencies",
    summary:
      "An AI document workspace that helps agencies create, brand, share, sign, and track client deliverables in one workflow.",
    problem:
      "Agencies were producing proposals, reports, contracts, decks, and spreadsheets across disconnected tools. The work was repeatedly copied, reformatted, emailed, and tracked by hand, creating an inconsistent client experience.",
    research: [
      "Observed the same client-delivery friction repeat across agencies: too many tools, inconsistent branding, and fragmented approvals.",
      "Framed the primary user as an agency or service team responsible for the quality of a client-facing deliverable, not simply someone looking for an AI writing tool.",
      "Research pointed to the connected workflow and branded client experience as the product wedge: create, brand, share, sign, and track.",
    ],
    role:
      "As founder, I shaped the product thesis, translated agency workflows into a roadmap, worked with designers and developers, built core product systems, launched the product, and now use early-user conversations to guide distribution and the next product decisions.",
    decisions: [
      "Focused the initial audience on agencies and service firms, where documents directly influence revenue and client trust.",
      "Made the client workflow the product boundary: create, brand, share, sign, and track, instead of building another general-purpose editor.",
      "Designed brand context and client portals as core platform primitives rather than add-on presentation features.",
      "Prioritized a multi-tenant foundation, plan-based billing, and AI credits early so the product could move from prototype to a real SaaS business.",
    ],
    shipped: [
      "AI-assisted proposals, reports, contracts, decks, sheets, forms, and whiteboards",
      "Brand kits, client portals, custom-domain support, and granular access",
      "Document analytics, collaboration, version history, signing, and billing",
      "A production workspace now used to onboard and learn from early agencies",
    ],
    outcomes: [
      "Moved from observed problem to research, private beta, and public launch",
      "Established a weekly shipping and early-customer learning loop",
      "Created a coherent product platform instead of a collection of isolated AI features",
    ],
    nextMetrics: [
      "Time from brief to first client-ready draft",
      "Draft-to-share and share-to-sign conversion",
      "Weekly active agency workspaces and repeat client delivery",
      "Generated-content quality and client-portal reliability as guardrails",
    ],
    learning:
      "The strongest product story is not AI writing by itself. It is a calmer client workflow that connects the work before and after the document is created.",
    demonstrates: [
      "Customer problem framing",
      "0 to 1 product strategy",
      "Roadmap and scope decisions",
      "Founder-level execution",
    ],
  },
  {
    slug: "govgrant",
    name: "Govgrant.ca",
    label: "AI recommendations at production scale",
    year: "2025-2026",
    url: LINKS.govgrant,
    image: "/projects/govgrant.png",
    metric: "2,000+ users and 300+ grants refreshed daily",
    summary:
      "A Canadian grant-discovery platform that matches businesses with relevant funding programs using RAG-based recommendations.",
    problem:
      "Canadian businesses had to search fragmented government sources, interpret eligibility criteria, and repeatedly check whether programs were still open. The product needed to make discovery faster without presenting stale or irrelevant opportunities.",
    research: [
      "Mapped the journey from a business need to a relevant grant, including search, eligibility interpretation, freshness, and next action.",
      "Treated stale or weakly grounded recommendations as a trust problem, not only a model-quality problem.",
      "Used the operational reality of daily grant updates to shape the product: ingestion, admin controls, and recommendation quality had to work together.",
    ],
    role:
      "I led engineering across the recommendation experience and SaaS platform, turning the product requirements into a reliable matching workflow with authentication, subscriptions, admin controls, and an automated grant pipeline.",
    decisions: [
      "Combined structured grant data with retrieval-based recommendations so matching could remain explainable and grounded in current program information.",
      "Automated grant ingestion and refreshes instead of relying on a manually maintained catalogue.",
      "Treated freshness, eligibility context, and operational admin tools as product requirements, not background infrastructure.",
      "Built the matching experience inside a complete subscription product rather than shipping a standalone AI demo.",
    ],
    shipped: [
      "RAG-based matching and recommendation workflows",
      "Automated ingestion processing more than 300 grants per day",
      "Authentication, billing, subscriptions, and administration",
      "Production infrastructure supporting more than 2,000 users",
    ],
    outcomes: [
      "Served more than 2,000 users across Canada",
      "Kept the grant catalogue current through a daily automated pipeline",
      "Connected AI recommendations to a usable, monetizable SaaS workflow",
    ],
    nextMetrics: [
      "Relevant-match click-through and saved-grant rate",
      "Fresh-grant coverage and stale-listing rate",
      "Match-to-application intent and subscription conversion",
      "Recommendation quality and explanation usefulness as guardrails",
    ],
    learning:
      "Freshness, explainability, and admin tooling are visible parts of the user experience. They cannot be treated as background infrastructure behind an AI feature.",
    demonstrates: [
      "AI product judgment",
      "Platform thinking",
      "Reliability and data freshness",
      "Product delivery at scale",
    ],
  },
  {
    slug: "speediq",
    name: "SpeedIQ",
    label: "Multi-channel B2B SaaS",
    year: "2025-2026",
    url: LINKS.speediq,
    image: "/projects/speediq.png?v=2",
    metric: "100k+ messages delivered",
    summary:
      "A multi-tenant marketing platform for WhatsApp and email campaigns, automation, live chat, and campaign analytics.",
    problem:
      "Marketing teams needed to manage customer conversations, broadcasts, automation, and reporting across channels without stitching together separate tools or losing operational visibility.",
    research: [
      "Mapped how teams moved between broadcasts, WhatsApp conversations, chatbot automation, live chat, and reporting.",
      "Identified the product boundary as campaigns plus conversations, rather than exposing channel-specific infrastructure to operators.",
      "Treated onboarding and third-party API constraints as part of the customer journey, especially for WhatsApp Business setup.",
    ],
    role:
      "I helped translate multi-channel marketing workflows into a production platform and owned major technical delivery across onboarding, messaging, automation, analytics, and Meta Business API integration.",
    decisions: [
      "Centered the experience around campaigns and conversations rather than exposing channel-specific infrastructure.",
      "Used a multi-tenant architecture so teams, permissions, channel connections, and analytics could scale safely.",
      "Integrated Meta embedded signup to reduce setup friction for WhatsApp Business customers.",
      "Connected broadcasts, chatbots, live chat, and analytics so teams could operate and learn in one place.",
    ],
    shipped: [
      "WhatsApp and email broadcasts",
      "Chatbot automation and live team inbox",
      "Campaign analytics and delivery visibility",
      "Meta Business API onboarding and multi-tenant controls",
    ],
    outcomes: [
      "Delivered more than 100,000 messages across supported channels",
      "Created one operating surface for campaign execution and customer conversations",
      "Turned a complex third-party API workflow into a team-facing SaaS product",
    ],
    nextMetrics: [
      "Time from signup to first successful campaign",
      "Delivery quality, failure reasons, and cost per message",
      "Repeat campaign rate and active team usage",
      "Conversation resolution and handoff quality as guardrails",
    ],
    learning:
      "When a product sits on top of a complex API, onboarding, reliability, and failure visibility are product surfaces. The abstraction only works when teams can trust what happens underneath.",
    demonstrates: [
      "Workflow design",
      "API product delivery",
      "Multi-tenant systems",
      "Outcome-oriented execution",
    ],
  },
];

// Kept for the existing slider component, which is not used on the PM homepage
// but remains available for future editorial layouts.
export type Work = {
  name: string;
  year: string;
  blurb: string;
  href?: string;
  metric?: string;
  image?: string;
};

export const SELECTED_WORK: Work[] = [
  ...CASE_STUDIES.map((study) => ({
    name: study.name,
    year: study.year,
    blurb: study.summary,
    href: `/work/${study.slug}`,
    metric: study.metric,
    image: study.image,
  })),
  {
    name: "Trade Business School",
    year: "2023",
    blurb:
      "Multi-tenant SaaS for trades education, including course delivery, AI document processing, and student management.",
    metric: "200 students",
    image: "/projects/tbs.png",
  },
  {
    name: "Apstic",
    year: "2025",
    blurb:
      "An AI automation studio connecting CRMs, commerce, accounting, and communication workflows.",
    href: "https://apstic.com",
    image: "/projects/apstic.png",
  },
];

export const EXPERIENCE = [
  {
    period: "2025-Present",
    title: "Founder and Product Lead",
    org: "Docsiv",
    detail: "Own product direction, early-user learning, roadmap decisions, and launch execution for an AI document workspace serving agencies.",
  },
  {
    period: "2025-Present",
    title: "Lead Engineer, AI Products",
    org: "Virtual Xcellence",
    detail: "Lead product delivery across Govgrant.ca and SpeedIQ, connecting AI systems and platform architecture to customer workflows.",
  },
  {
    period: "2022-2025",
    title: "Full-stack Developer and Project Manager",
    org: "NJ Designpark",
    detail: "Managed and shipped SaaS products across education, trades, marketing, and services; reduced support workload by 40% through AI-enabled workflows.",
  },
  {
    period: "2020-2022",
    title: "Independent Product Engineer",
    org: "Freelance",
    detail: "Built production web products and payment workflows for small businesses while completing a B.Tech in Computer Science.",
  },
];

export const PRODUCT_PRACTICE = [
  { number: "01", title: "Find the real workflow", text: "Start with the job users are trying to complete, where it breaks, and what the current workaround costs them." },
  { number: "02", title: "Choose the smallest useful bet", text: "Turn ambiguity into a product boundary, explicit tradeoffs, and a sequence the team can actually ship." },
  { number: "03", title: "Build with the team", text: "Work close to engineering and design, using technical depth to remove uncertainty without prescribing every implementation detail." },
  { number: "04", title: "Learn from production", text: "Instrument the workflow, talk to users, and use what happens after launch to make the next decision better." },
];

export const SERVICES = [
  "Customer discovery",
  "0 to 1 product strategy",
  "Roadmaps & prioritization",
  "Requirements & workflows",
  "AI product delivery",
  "Technical leadership",
];

export const STACK = [
  "Next.js · React · TypeScript",
  "Node.js · Python · SQL",
  "PostgreSQL · Supabase",
  "OpenAI · Claude · Gemini",
  "RAG · AI agents · n8n",
  "Vercel · Railway · Docker",
  "Stripe · ChargeBee · Dodo",
];

export type NowItem = { text: string; live?: boolean; href?: string };
export const NOW: NowItem[] = [
  { text: "Onboarding early agencies to Docsiv", live: true },
  { text: "Talking to users and sharpening product-market fit", live: true },
  { text: "Testing distribution and the next product bets", live: true },
  { text: "Shipping new Docsiv features every week" },
  { text: "Writing product case studies", href: "/work/docsiv" },
  { text: "Open to Technical Product Manager and AI Product Manager roles" },
  { text: "Living in Bangalore and drinking too much filter coffee ☕" },
];
export const NOW_UPDATED = "Updated September 2026";

export const CONTACT = [
  { label: "Email", href: "mailto:ittsneeraj@gmail.com", handle: "ittsneeraj@gmail.com" },
  { label: "LinkedIn", href: LINKS.linkedin, handle: "in/neer4j" },
  { label: "GitHub", href: LINKS.github, handle: "@NEER4J" },
  { label: "X", href: LINKS.x, handle: "@NEER4J__" },
  { label: "Resume", href: LINKS.resume, handle: "PDF" },
];

export const CALL = "https://cal.com/neeraj-sharma/30min";
export const FOOTER_NOTE = "Still shipping.";
