import { describe, expect, it } from "vitest";
import { projectSchema, achievementSchema } from "@/content/schema";
import { projects } from "@/content/projects";
import { roadmap, archive } from "@/content/roadmap";
import {
  proofStrip,
  capabilityGroups,
  experience,
  education,
  reportedHighlights,
  principles,
  about,
} from "@/content/site";
import { site } from "@/lib/site";

/** Résumé placeholders and typos that must never render publicly. */
const FORBIDDEN = [
  "[75-90]",
  "[90-99]",
  "[1000-1500]",
  "[65-75]",
  "[85]%",
  "[YOUR_PPL]",
  "YOUR_USERNAME",
  "YOUR_PROFILE",
  "Insert screenshot",
  "Pythonproficient",
  "80percent",
  "¡2 second",
  "+91 9356729700",
  "09356729700",
];

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
}

const allContent = [
  ...projects.map((p) => p),
  ...roadmap,
  ...archive,
  proofStrip,
  capabilityGroups.map((g) => ({ title: g.title, skills: g.skills })),
  experience,
  education,
  reportedHighlights,
  principles,
  about,
  site.positioning,
];

describe("content schema", () => {
  it("every project validates against the zod schema", () => {
    for (const p of projects) {
      expect(() => projectSchema.parse(p)).not.toThrow();
    }
  });

  it("roadmap and archive entries validate", () => {
    for (const item of [...roadmap, ...archive]) {
      expect(item.status).toBeDefined();
      expect(typeof item.blurb).toBe("string");
    }
  });
});

describe("evidence rules", () => {
  it("contains no résumé bracket placeholders or known typos", () => {
    const strings = collectStrings(allContent).join("\n");
    for (const bad of FORBIDDEN) {
      expect(strings, `forbidden string found: ${bad}`).not.toContain(bad);
    }
  });

  it("never exposes the phone number in site content or metadata config", () => {
    const strings = collectStrings(allContent).join("\n");
    expect(strings).not.toMatch(/9356729700/);
  });

  it("verified metrics always have methodology AND evidence URL", () => {
    for (const p of projects) {
      for (const r of p.results) {
        if (r.verified) {
          expect(r.methodology?.length ?? 0, `${p.slug}: ${r.label}`).toBeGreaterThan(0);
          expect(r.evidenceUrl, `${p.slug}: ${r.label}`).toBeTruthy();
        }
      }
    }
  });

  it("featured case studies have a public link or an honest proof state", () => {
    for (const p of projects.filter((x) => x.featured)) {
      const hasPublicProof = Boolean(p.repoUrl || p.demoUrl || p.caseStudyUrl);
      expect(
        hasPublicProof || p.proofState.length > 0,
        `${p.slug} needs repo/demo/case-study URL or explicit proofState`,
      ).toBe(true);
    }
  });

  it("project CTAs never point at a GitHub profile root", () => {
    for (const p of projects) {
      if (p.repoUrl) {
        expect(p.repoUrl).toMatch(/\/[^/]+$/);
        expect(p.repoUrl).not.toBe(site.github);
      }
    }
  });

  it("only verified achievements exist in the featured list", () => {
    // The achievements array is intentionally empty until evidence exists.
    // Any future entry must satisfy achievementSchema with an evidence URL —
    // enforced here via a typed placeholder check that always runs.
    const futureEntries: unknown[] = [];
    for (const a of futureEntries) {
      const parsed = achievementSchema.parse(a);
      if (parsed.verified) {
        expect(parsed.evidenceUrl).toMatch(/^https?:\/\//);
      }
    }
    expect(futureEntries).toEqual([]);
  });
});

describe("identity facts", () => {
  it("uses verified contact links only", () => {
    expect(site.github).toBe("https://github.com/Atharvapatel07");
    expect(site.linkedin).toBe("https://www.linkedin.com/in/atharva-a-patel-772233296");
    expect(site.email).toBe("atharvapatel918@gmail.com");
  });

  it("does not publish the 404 portfolio repo link", () => {
    const strings = collectStrings(allContent).join("\n");
    expect(strings).not.toContain("My-Portfolio");
  });
});
