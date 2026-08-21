/**
 * Central site configuration.
 * Canonical URL comes from NEXT_PUBLIC_SITE_URL (see .env.example).
 */

const FALLBACK_URL = "https://musical-torrone-936f4f.netlify.app";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_URL
).replace(/\/$/, "");

export const site = {
  name: "Atharva A. Patel",
  shortName: "Atharva Patel",
  role: "AI/ML Engineer",
  positioning:
    "Building reliable LLM systems, agents, and real-time vision — with evaluation first.",
  location: "Pune, India",
  email: "atharvapatel918@gmail.com",
  /** Intentionally NOT exposed in page metadata or public CTAs. Lives only inside the résumé PDF. */
  github: "https://github.com/Atharvapatel07",
  linkedin: "https://www.linkedin.com/in/atharva-a-patel-772233296",
  x: "https://x.com/AtharvahP33100",
  resumePath: "/Atharva-A-Patel-Resume.pdf",
  availability: {
    visible: true,
    label: "Open to AI/ML internships & research · 2026",
  },
} as const;

export const navigation = [
  { href: "/", label: "Work", hash: "#work" },
  { href: "/", label: "Systems Lab", hash: "#systems-lab" },
  { href: "/", label: "Experience", hash: "#experience" },
  { href: "/", label: "About", hash: "#about" },
  { href: "/resume", label: "Résumé" },
] as const;
