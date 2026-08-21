import { z } from "zod";

/**
 * Content model for the portfolio.
 *
 * Evidence rules enforced here and in tests (tests/content.test.ts):
 * - No numeric metric may render without `methodology` + `evidenceUrl`,
 *   or it must be explicitly flagged `verified: false` so the UI labels
 *   it "self-reported".
 * - Résumé bracket placeholders are forbidden anywhere in content.
 */

export const PROJECT_STATUSES = [
  "shipped",
  "active",
  "experimental",
  "planned",
  "archived",
] as const;
export const projectStatusSchema = z.enum(PROJECT_STATUSES);
export type ProjectStatus = z.infer<typeof projectStatusSchema>;

export const metricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  /** How the number was produced. Required for verified metrics. */
  methodology: z.string().optional(),
  /** Link to repo file, benchmark script, dashboard, write-up… */
  evidenceUrl: z.string().url().optional(),
  /** true → only set when methodology AND evidence exist */
  verified: z.boolean(),
});
export type Metric = z.infer<typeof metricSchema>;

export const linkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
  kind: z
    .enum(["repo", "demo", "benchmark", "writeup", "certificate", "other"])
    .default("other"),
});
export type EvidenceLink = z.infer<typeof linkSchema>;

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  oneLineOutcome: z.string().min(1),
  summary: z.string().min(1),
  role: z.string().min(1),
  status: projectStatusSchema,
  featured: z.boolean(),
  dates: z.string().min(1),
  problem: z.string().min(1),
  whyItMattered: z.string().min(1),
  constraints: z.array(z.string()),
  approach: z.array(z.object({ heading: z.string(), detail: z.string() })),
  architectureNotes: z.array(z.string()),
  stack: z.array(z.string()),
  responsibilities: z.array(z.string()),
  results: z.array(metricSchema),
  /**
   * Honest fallback text shown when a project has no public proof,
   * e.g. "Private code · write-up in progress".
   */
  proofState: z.string().min(1),
  repoUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  caseStudyUrl: z.string().url().optional(),
  diagram: z.enum(["transformer", "rag", "detect-track", "none"]).default("none"),
  codeExcerpt: z
    .object({
      language: z.string(),
      caption: z.string(),
      sourceUrl: z.string().url().optional(),
      code: z.string(),
    })
    .optional(),
  lessons: z.array(z.string()),
  nextSteps: z.array(z.string()),
  tags: z.array(z.string()),
  lastUpdated: z.string(),
  evidenceLinks: z.array(linkSchema).default([]),
});
export type Project = z.infer<typeof projectSchema>;

/** Roadmap / archive entries — never rendered beside shipped work without a badge. */
export const roadmapItemSchema = z.object({
  name: z.string().min(1),
  blurb: z.string().min(1),
  status: projectStatusSchema,
  stack: z.array(z.string()).default([]),
});
export type RoadmapItem = z.infer<typeof roadmapItemSchema>;

export const achievementSchema = z.discriminatedUnion("verified", [
  z.object({
    verified: z.literal(true),
    title: z.string().min(1),
    event: z.string().min(1),
    date: z.string().min(1),
    description: z.string().min(1),
    evidenceUrl: z.string().url(),
  }),
  z.object({
    verified: z.literal(false),
    title: z.string().min(1),
    description: z.string().min(1),
    note: z.string().min(1),
  }),
]);
export type Achievement = z.infer<typeof achievementSchema>;
