import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Sans, Instrument_Serif, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/theme-script";
import { CASE_STUDIES, CONTACT } from "@/components/portfolio/data";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Fresh type system for the v2 page — a clean grotesque paired with an
// editorial serif for accents. Kept separate from the Geist stack the
// legacy shell uses.
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});
// Retro pixel font for the pixel pet's speech bubbles + particles.
const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

const SITE_URL = "https://itsneeraj.com";
const SITE_NAME = "Neeraj Sharma";
const TITLE_DEFAULT = "Neeraj Sharma · Technical Product Manager for AI and SaaS";
const TITLE_TEMPLATE = "%s · Neeraj Sharma";
const DESCRIPTION =
  "Technical Product Manager and product-minded engineer building AI and B2B SaaS from customer problem to production. Founder of Docsiv.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: TITLE_TEMPLATE,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Neeraj Kumar Sharma", url: SITE_URL }],
  creator: "Neeraj Kumar Sharma",
  publisher: "Neeraj Kumar Sharma",
  category: "technology",
  keywords: [
    "Neeraj Sharma",
    "Neeraj Kumar Sharma",
    "Technical Product Manager",
    "AI Product Manager",
    "B2B SaaS Product Manager",
    "product strategy",
    "product discovery",
    "0 to 1 products",
    "full-stack engineer",
    "AI SaaS",
    "Next.js developer",
    "TypeScript",
    "RAG",
    "Claude",
    "OpenAI",
    "Docsiv",
    "Govgrant.ca",
    "SpeedIQ",
    "Virtual Xcellence",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    siteName: SITE_NAME,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    firstName: "Neeraj",
    lastName: "Sharma",
    username: "NEER4J",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    creator: "@NEER4J__",
    site: "@NEER4J__",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  referrer: "origin-when-cross-origin",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

function PersonJsonLd() {
  const sameAs = [
    ...CONTACT.filter((item) => !item.href.startsWith("mailto:")).map((item) => item.href),
    "https://docsiv.com",
    "https://govgrant.ca",
    "https://apstic.com",
  ];

  const knowsAbout = [
    "Artificial Intelligence",
    "Retrieval-Augmented Generation",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "OpenAI",
    "Anthropic Claude",
    "Multi-tenant SaaS",
    "Product Management",
    "Product Strategy",
    "Customer Discovery",
    "Product engineering",
  ];

  const works = CASE_STUDIES.map((p) => ({
    "@type": "CreativeWork",
    name: p.name,
    url: p.url,
    description: p.summary,
  }));

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Neeraj Kumar Sharma",
    alternateName: "Neeraj Sharma",
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.png`,
    jobTitle: "Technical Product Manager",
    worksFor: {
      "@type": "Organization",
      name: "Virtual Xcellence",
    },
    description: DESCRIPTION,
    email: "mailto:ittsneeraj@gmail.com",
    sameAs,
    knowsAbout,
    knowsLanguage: ["English", "Hindi"],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Chhattisgarh Swami Vivekanand Technical University",
    },
    nationality: { "@type": "Country", name: "India" },
    workLocation: { "@type": "Place", name: "India (remote-friendly)" },
    subjectOf: works,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: "Neeraj Kumar Sharma",
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable} ${instrumentSerif.variable} ${pressStart.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
        <PersonJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className="v2-scope min-h-dvh">{children}</body>
    </html>
  );
}
