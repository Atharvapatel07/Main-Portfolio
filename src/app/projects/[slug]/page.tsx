import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { site, siteUrl } from "@/lib/site";
import { ProjectDiagram } from "@/components/diagrams";
import { StatusBadge } from "@/components/ui";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.oneLineOutcome,
    openGraph: {
      title: `${project.title} — ${site.shortName}`,
      description: project.oneLineOutcome,
      url: `${siteUrl}/projects/${project.slug}`,
    },
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    author: { "@type": "Person", name: site.name, url: siteUrl },
    url: `${siteUrl}/projects/${project.slug}`,
    codeRepository: project.repoUrl,
    programmingLanguage: project.stack.includes("Python") ? "Python" : undefined,
    keywords: project.tags.join(", "),
    dateModified: project.lastUpdated,
  };

  return (
    <article className="shell mx-auto px-4 py-14 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-faint">
        <ol className="flex gap-2">
          <li><Link href="/" className="hover:text-blue">home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/projects" className="hover:text-blue">projects</Link></li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-ink">{project.slug}</li>
        </ol>
      </nav>

      <header className="mt-8 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          <span className="font-mono text-xs text-ink-faint">{project.dates}</span>
          <span className="font-mono text-xs text-ink-faint">· updated {project.lastUpdated}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-ink-soft">{project.oneLineOutcome}</p>
        <p className="mt-2 font-mono text-sm text-blue">{project.role}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener"
              className="min-h-11 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              View repository ↗
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener"
              className="min-h-11 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-semibold hover:border-blue hover:text-blue"
            >
              Live demo ↗
            </a>
          )}
          {!project.repoUrl && !project.demoUrl && (
            <p className="rounded-xl border border-dashed border-line bg-lemon-panel px-4 py-3 font-mono text-xs text-amber">
              {project.proofState}
            </p>
          )}
        </div>
      </header>

      {/* Diagram */}
      {project.diagram !== "none" && (
        <div className="mt-10 rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-lift)] sm:p-10">
          <ProjectDiagram kind={project.diagram} />
        </div>
      )}

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-12">
          <Section title="The problem">
            <p>{project.problem}</p>
            <h4 className="mt-4 font-semibold">Why it mattered</h4>
            <p className="mt-1 text-ink-soft">{project.whyItMattered}</p>
          </Section>

          <Section title="Constraints & trade-offs">
            <ul className="space-y-2">
              {project.constraints.map((c) => (
                <Bullet key={c}>{c}</Bullet>
              ))}
            </ul>
          </Section>

          <Section title="Approach">
            <div className="space-y-5">
              {project.approach.map((step) => (
                <div key={step.heading}>
                  <h4 className="font-semibold">{step.heading}</h4>
                  <p className="mt-1 text-ink-soft">{step.detail}</p>
                </div>
              ))}
            </div>
          </Section>

          {project.codeExcerpt && (
            <Section title="Implementation excerpt">
              <figure>
                <figcaption className="mb-2 font-mono text-xs text-ink-faint">
                  {project.codeExcerpt.caption}
                  {project.codeExcerpt.sourceUrl && (
                    <>
                      {" · "}
                      <a
                        href={project.codeExcerpt.sourceUrl}
                        target="_blank"
                        rel="noopener"
                        className="text-blue hover:underline"
                      >
                        view source in repo ↗
                      </a>
                    </>
                  )}
                </figcaption>
                <pre className="code-excerpt rounded-xl bg-ink p-5 text-slate-100">
                  <code>{project.codeExcerpt.code}</code>
                </pre>
              </figure>
            </Section>
          )}

          <Section title={`Evaluation & results — ${project.proofState}`}>
            <ul className="space-y-4">
              {project.results.map((r) => (
                <li key={r.label} className="rounded-xl border border-line bg-surface p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-semibold">{r.label}</span>
                    <span className="font-display text-2xl font-bold text-blue">{r.value}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-soft">
                    {r.methodology ?? "Methodology pending publication."}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-wide">
                    {r.verified ? (
                      <span className="text-[#047857]">verified · evidence available</span>
                    ) : (
                      <span className="text-amber">
                        self-reported{r.evidenceUrl ? "" : " · awaiting benchmark publication"}
                      </span>
                    )}
                  </p>
                  {r.evidenceUrl && (
                    <a href={r.evidenceUrl} className="mt-1 inline-block font-mono text-xs text-blue hover:underline">
                      view evidence ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Failure modes & lessons learned">
            <ul className="space-y-2">
              {project.lessons.map((l) => (
                <Bullet key={l}>{l}</Bullet>
              ))}
            </ul>
          </Section>

          <Section title="Next steps">
            <ul className="space-y-2">
              {project.nextSteps.map((s) => (
                <Bullet key={s}>{s}</Bullet>
              ))}
            </ul>
          </Section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="font-mono text-xs uppercase tracking-widest text-ink-faint">Stack</h2>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <li key={s} className="rounded-md bg-canvas px-2 py-1 font-mono text-[11px] ring-1 ring-line">
                  {s}
                </li>
              ))}
            </ul>
            <h2 className="mt-6 font-mono text-xs uppercase tracking-widest text-ink-faint">
              My responsibilities
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {project.responsibilities.map((r) => (
                <li key={r} className="flex gap-2">
                  <span aria-hidden className="mt-0.5 text-blue">▸</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-blue-panel/60 p-6">
            <h2 className="font-mono text-xs uppercase tracking-widest text-ink-faint">Evidence links</h2>
            {project.evidenceLinks.length > 0 ? (
              <ul className="mt-3 space-y-2 text-sm">
                {project.evidenceLinks.map((l) => (
                  <li key={l.url}>
                    <a href={l.url} target="_blank" rel="noopener" className="font-medium text-blue hover:underline">
                      {l.label} ↗
                    </a>
                    <span className="ml-2 font-mono text-[11px] text-ink-faint">[{l.kind}]</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 rounded-lg border border-dashed border-line bg-lemon-panel px-3 py-2 font-mono text-xs text-amber">
                No public evidence yet — see the honest proof note above.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="font-mono text-xs uppercase tracking-widest text-ink-faint">Architecture notes</h2>
            <ul className="mt-3 space-y-2 font-mono text-xs leading-relaxed text-ink-soft">
              {project.architectureNotes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <nav aria-label="More projects" className="mt-16 flex flex-wrap justify-between gap-4 border-t border-line pt-8">
        {projects
          .filter((p) => p.slug !== project.slug)
          .slice(0, 2)
          .map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-blue/40"
            >
              <p className="font-mono text-xs text-ink-faint">Next case study</p>
              <p className="mt-1 font-display text-lg font-semibold group-hover:text-blue">{p.title}</p>
            </Link>
          ))}
      </nav>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
      <div className="mt-4 leading-relaxed text-ink-soft [&_h4]:text-ink">{children}</div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span aria-hidden className="mt-0.5 text-blue">▸</span>
      <span>{children}</span>
    </li>
  );
}
