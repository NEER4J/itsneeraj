import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/theme-script";
import { ThemeProvider } from "@/components/theme-provider";
import { AudienceProvider } from "@/components/audience-provider";
import { Shell } from "@/components/shell";
import { META, PROJECTS } from "@/lib/content";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = "https://itsneeraj.com";
const SITE_NAME = "Neeraj Sharma";
const TITLE_DEFAULT = "Neeraj Sharma · full-stack engineer, AI products";
const TITLE_TEMPLATE = "%s · Neeraj Sharma";
const DESCRIPTION =
  "Full-stack engineer, five years building AI products. Building Docsiv right now, leading engineering on Govgrant.ca and SpeedIQ at Virtual Xcellence.";

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
    "full-stack engineer",
    "AI engineer",
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
    { media: "(prefers-color-scheme: dark)", color: "#050506" },
    { media: "(prefers-color-scheme: light)", color: "#ececef" },
  ],
};

function PersonJsonLd() {
  const sameAs = [
    ...META.links.map((l) => l.href),
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
    "Product engineering",
  ];

  const works = PROJECTS.filter((p) => p.url).map((p) => ({
    "@type": "CreativeWork",
    name: p.name,
    url: p.url,
    description: p.story.split(".")[0] + ".",
  }));

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Neeraj Kumar Sharma",
    alternateName: "Neeraj Sharma",
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.png`,
    jobTitle: "Full-stack engineer",
    worksFor: {
      "@type": "Organization",
      name: "Virtual Xcellence",
    },
    description: DESCRIPTION,
    email: `mailto:${META.email}`,
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
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
        <PersonJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className="min-h-full">
        <ThemeProvider>
          <AudienceProvider>
            <Shell>{children}</Shell>
          </AudienceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
