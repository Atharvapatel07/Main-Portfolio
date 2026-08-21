import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import { ProjectDiagram } from "@/components/diagrams";
import { StatusBadge } from "@/components/ui";
import { Reveal } from "@/components/reveal";

const panelThemes = [
  "bg-blue-panel",
  "bg-lilac-panel",
  "bg-mint-panel",
];

export function FlagshipWork() {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-20">
      <div className="shell mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <p id="work-heading" className="font-mono text-xs uppercase tracking-widest text-blue">
            Flagship systems
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Three systems, told honestly.
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-ink-soft">
            One is public and runnable today. Two were built in research settings —
            their numbers are labeled self-reported until benchmarks are published.
            No counter starts at zero; nothing pretends to be verified.
          </p>
        </Reveal>

        <div className="mt-12 space-y-10">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} as="article" className={i > 0 ? "" : ""}>
              <div
                className={`grid overflow-hidden rounded-3xl border border-line bg-surface shadow-[var(--shadow-lift)] lg:grid-cols-[1.05fr_1fr] ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Editorial panel */}
                <div className={`flex flex-col justify-between gap-6 p-7 sm:p-10 ${panelThemes[i % panelThemes.length]}`}>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusBadge status={project.status} />
                      <span className="font-mono text-xs text-ink-faint">{project.dates}</span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      <Link href={`/projects/${project.slug}`} className="hover:underline">
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-3 leading-relaxed text-ink-soft">
                      {project.oneLineOutcome}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <ul className="space-y-1.5 text-sm text-ink-soft">
                      {project.responsibilities.slice(0, 3).map((r) => (
                        <li key={r} className="flex gap-2">
                          <span aria-hidden className="mt-0.5 text-blue">▸</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                    <p className="rounded-lg border border-line bg-white/70 px-3 py-2 font-mono text-xs text-ink-faint">
                      Proof: {project.proofState}
                    </p>
                  </div>
                </div>

                {/* Diagram panel */}
                <div className="flex flex-col justify-between border-t border-line bg-surface p-6 sm:p-8 lg:border-l lg:border-t-0">
                  <ProjectDiagram kind={project.diagram} />
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
                      {project.stack.slice(0, 5).map((s) => (
                        <li key={s} className="rounded-md bg-canvas px-2 py-1 font-mono text-[11px] text-ink-soft ring-1 ring-line">
                          {s}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex min-h-11 items-center rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                    >
                      Read case study →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center rounded-xl border border-line bg-surface px-5 py-3 text-sm font-semibold hover:border-blue hover:text-blue"
          >
            Browse all projects, roadmap & archive →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
