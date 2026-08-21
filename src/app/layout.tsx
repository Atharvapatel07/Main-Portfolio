import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/lib/site";
import { RecruiterProvider } from "@/components/recruiter-mode";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CommandPalette } from "@/components/command-palette";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.shortName}`,
  },
  description:
    "AI/ML engineer building reliable LLM systems, agents, and real-time vision. Evidence-linked case studies: transformer from scratch, RAG agents, detection & tracking.",
  keywords: [
    "AI engineer",
    "machine learning",
    "LLM systems",
    "RAG",
    "agents",
    "computer vision",
    "inference",
    "PyTorch",
    "Atharva Patel",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description:
      "Evidence-first AI/ML portfolio: LLM systems, agents, and real-time vision.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@AtharvahP33100",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7faff",
  width: "device-width",
  initialScale: 1,
};

function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.shortName,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    url: siteUrl,
    address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "International Institute of Information Technology (I2IT), Pune",
    },
    sameAs: [site.github, site.linkedin, site.x],
    knowsAbout: [
      "Large Language Models",
      "Retrieval-Augmented Generation",
      "AI Agents",
      "Computer Vision",
      "PyTorch",
      "Machine Learning Evaluation",
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-recruiter="off" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${sora.variable} ${jetbrains.variable} antialiased`}
      >
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <RecruiterProvider>
          <SiteHeader />
          <div id="recruiter-brief">
            <RecruiterBrief />
          </div>
          <main id="main">{children}</main>
          <SiteFooter />
          <CommandPalette />
        </RecruiterProvider>
        <script
          type="application/ld+json"
          // Static, truthful structured data — see also per-page JSON-LD.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </body>
    </html>
  );
}

/** Condensed recruiter summary shown only in Recruiter Mode. */
import { featuredProjects } from "@/content/projects";
import { capabilityGroups } from "@/content/site";
import Link from "next/link";

function RecruiterBrief() {
  return (
    <section aria-label="Recruiter brief" className="border-b border-line bg-lilac-panel">
      <div className="shell mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-violet">
          Recruiter mode — condensed view
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
          Atharva A. Patel · AI/ML Engineer · Pune, India
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Pre-final-year B.E. IT @ I2IT Pune (2023–27). AI/ML Student Researcher,
          May–Sep 2025. Builds LLM systems, agents, and real-time vision — with
          evaluation first.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {featuredProjects.map((p) => (
            <li key={p.slug} className="rounded-xl border border-line bg-surface p-4">
              <p className="font-mono text-[11px] uppercase tracking-wide text-blue">
                {p.status}
              </p>
              <Link href={`/projects/${p.slug}`} className="mt-1 block font-semibold hover:text-blue">
                {p.title}
              </Link>
              <p className="mt-1 text-sm text-ink-soft">{p.oneLineOutcome}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-soft">
          <strong className="text-ink">Skills with evidence:</strong>{" "}
          {capabilityGroups
            .flatMap((g) => g.skills.filter((s) => s.usedIn).map((s) => s.name))
            .join(" · ")}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={site.resumePath} download className="rounded-lg bg-blue px-4 py-2.5 text-sm font-semibold text-white">
            Download résumé (PDF)
          </a>
          <a href={`mailto:${site.email}`} className="rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-semibold">
            Email {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
