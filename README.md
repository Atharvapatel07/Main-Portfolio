# Atharva A. Patel — AI/ML Engineering Portfolio

A production, evidence-first portfolio for AI/ML internship, graduate-research,
and early-career engineering applications. Bright "AI systems exhibition" design;
every metric is either evidence-linked or explicitly labeled self-reported.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript strict**
- **Tailwind CSS v4** with CSS-variable design tokens (`src/app/globals.css`)
- **Zod-validated typed content layer** (`src/content/`) — no facts scattered in JSX
- **Framer Motion** used sparingly; most motion is CSS + IntersectionObserver
- **Vitest** for content-rule tests
- Hand-built **SVG architecture diagrams** (no stock artwork)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Dev server                            |
| `npm run build`     | Production build                      |
| `npm run start`     | Serve the production build            |
| `npm run lint`      | ESLint (flat config)                  |
| `npm run typecheck` | `tsc --noEmit`                        |
| `npm test`          | Vitest — content validation suite     |

## Environment variables

Copy `.env.example` → `.env.local`. Only one variable exists:

- `NEXT_PUBLIC_SITE_URL` — canonical base URL used for metadata, sitemap,
  robots, and JSON-LD. Defaults to the Netlify deployment URL until the custom
  domain resolves.

No secrets are required; there are no server-side API integrations.

## Editing content

All factual content lives in `src/content/`:

| File                | Purpose                                                        |
| ------------------- | -------------------------------------------------------------- |
| `schema.ts`         | Zod schemas: project model, statuses, metrics, achievements     |
| `projects.ts`       | Flagship case studies (typed, evidence-flagged)                 |
| `roadmap.ts`        | Roadmap + archive entries (never rendered as shipped work)      |
| `site.ts`           | Profile, proof strip, capabilities, experience, about, principles |

Evidence rules enforced by tests (`tests/content.test.ts`):

1. No résumé bracket placeholder (`[75-90]%`, `[YOUR_PPL]`, …) anywhere.
2. No personal phone number in site content/metadata.
3. A `verified: true` metric must have both methodology and evidence URL.
4. Every featured case study needs either a public repo/demo link or an honest
   `proofState` string.
5. All content validates against the Zod schema.

## Adding a case study

1. Add a new object to `projects.ts` following the schema (copy an existing entry).
2. Set `status` truthfully (`shipped | active | experimental | planned | archived`).
3. Only set `verified: true` on results that have methodology + evidence URL.
4. Pick or add a diagram kind in `src/components/diagrams.tsx`.
5. Run `npm test && npm run build` — tests will fail on evidence-rule violations.

## Deployment (Netlify)

The repo includes `netlify.toml` using the official Next.js runtime:

```bash
netlify deploy --build --prod
# or connect the repo in the Netlify UI; build command `npm run build`
```

Set `NEXT_PUBLIC_SITE_URL` in Netlify's environment settings. The site is also
portable to Vercel without changes.

## Routes

| Route              | Purpose                                              |
| ------------------ | ---------------------------------------------------- |
| `/`                | Recruiter overview: hero, proof strip, flagship work, systems lab, capabilities, timeline, principles, about, contact |
| `/projects`        | Searchable/filterable index + roadmap/archive        |
| `/projects/[slug]` | Full case study (problem → constraints → approach → evaluation → lessons → CTAs) |
| `/resume`          | Accessible web résumé + PDF download                 |
| `404`              | Custom not-found page                                |

## Accessibility & performance notes

- WCAG 2.2 AA target: skip link, landmarks, focus rings, 44px touch targets,
  semantic filters, text alternatives on every diagram.
- `prefers-reduced-motion` disables all animation, including SVG flow strokes.
- No WebGL/canvas in the critical path; diagrams are server-rendered SVG.
- Recruiter Mode (`◆` button or command palette) condenses the page to role fit,
  top projects, skills evidence, résumé, contact — and kills motion.
- Command palette: `Ctrl/Cmd + K`.

See `CONTENT_TODO.md` for outstanding evidence items before publicizing.
