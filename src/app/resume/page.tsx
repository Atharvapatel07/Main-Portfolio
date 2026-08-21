import type { Metadata } from "next";
import { site } from "@/lib/site";
import { experience, education, lastUpdated } from "@/content/site";
import { projects } from "@/content/projects";
import { StatusBadge } from "@/components/ui";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Web résumé of Atharva A. Patel — AI/ML engineer. Education, research experience, projects with honest status, and PDF download.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="shell mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-blue">Résumé</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-2 text-lg text-ink-soft">{site.role} · {site.location}</p>
          <p className="mt-1 font-mono text-sm text-ink-faint">
            <a className="hover:text-blue" href={`mailto:${site.email}`}>{site.email}</a>
            {" · "}
            <a className="hover:text-blue" href={site.github} target="_blank" rel="noopener">github.com/Atharvapatel07</a>
          </p>
        </div>
        <a
          href={site.resumePath}
          download
          className="min-h-11 rounded-xl bg-blue px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
        >
          Download PDF ↓
        </a>
      </header>

      <section aria-labelledby="edu-h" className="mt-10">
        <h2 id="edu-h" className="font-mono text-xs uppercase tracking-widest text-ink-faint">Education</h2>
        <div className="mt-3 rounded-2xl border border-line bg-surface p-6">
          <p className="font-semibold">{education.degree}</p>
          <p className="text-sm text-ink-soft">{education.school}</p>
          <p className="mt-1 font-mono text-xs text-ink-faint">
            {education.period} · GPA {education.gpa}
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {education.courses.map((c) => (
              <li key={c} className="rounded-md bg-canvas px-2 py-0.5 font-mono text-[11px] ring-1 ring-line">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="exp-h" className="mt-10">
        <h2 id="exp-h" className="font-mono text-xs uppercase tracking-widest text-ink-faint">Experience</h2>
        <ol className="mt-3 space-y-4">
          {experience.map((job) => (
            <li key={job.role} className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold">{job.role} — {job.org}</p>
                <span className="font-mono text-xs text-ink-faint">{job.period}</span>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink-soft marker:text-blue">
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="proj-h" className="mt-10">
        <h2 id="proj-h" className="font-mono text-xs uppercase tracking-widest text-ink-faint">Projects</h2>
        <ul className="mt-3 space-y-4">
          {projects.map((p) => (
            <li key={p.slug} className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={p.status} />
                <a href={`/projects/${p.slug}`} className="font-semibold hover:text-blue">{p.title}</a>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.summary}</p>
              <p className="mt-2 font-mono text-xs text-ink-faint">{p.stack.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-12 border-t border-line pt-6 font-mono text-xs text-ink-faint">
        Content last updated {lastUpdated}. Phone number is intentionally excluded
        from this page — it is available inside the downloadable PDF.
      </footer>
    </div>
  );
}
