import Link from "next/link";
import {
  capabilityGroups,
  experience,
  education,
  principles,
  reportedHighlights,
  about,
} from "@/content/site";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";

function projectTitle(slug: string | null) {
  if (!slug) return undefined;
  return projects.find((p) => p.slug === slug)?.title;
}

export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-heading" className="scroll-mt-20">
      <div className="shell mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            id="capabilities-heading"
            kicker="Technical depth"
            title="Skills, each linked to where they were used."
            lead="No percentage bars. If a skill carries weight here, you can follow it to the system that proves it."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityGroups.map((group, gi) => (
            <Reveal
              key={group.title}
              delay={gi * 60}
              className={`rounded-2xl border border-line p-6 ${
                gi % 3 === 0 ? "bg-blue-panel/50" : gi % 3 === 1 ? "bg-lilac-panel/50" : "bg-mint-panel/50"
              }`}
            >
              <h3 className="font-display text-lg font-semibold">{group.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.skills.map((skill) => {
                  const title = projectTitle(skill.usedIn);
                  return (
                    <li key={skill.name} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <span>{skill.name}</span>
                      {skill.usedIn && title ? (
                        <Link
                          href={`/projects/${skill.usedIn}`}
                          className="font-mono text-[11px] text-blue underline-offset-2 hover:underline"
                        >
                          used in {title.split(" — ")[0]} ↗
                        </Link>
                      ) : (
                        <span className="font-mono text-[11px] text-ink-faint">coursework / study</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Timeline() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-20 border-y border-line bg-surface"
    >
      <div className="shell mx-auto grid gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p id="experience-heading" className="font-mono text-xs uppercase tracking-widest text-blue">
            Experience
          </p>
          <ol className="mt-6 space-y-8">
            {experience.map((job) => (
              <li key={job.role + job.period} className="relative border-l-2 border-line pl-6">
                <span aria-hidden className="absolute -left-[7px] top-1 size-3 rounded-full border-2 border-blue bg-surface" />
                <h3 className="font-display text-lg font-semibold">{job.role}</h3>
                <p className="text-sm text-ink-soft">
                  {job.org} · {job.period}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <span aria-hidden className="mt-0.5 text-blue">▸</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                {"note" in job && job.note && (
                  <p className="mt-2 font-mono text-xs text-amber">{job.note}</p>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={80}>
          <p className="font-mono text-xs uppercase tracking-widest text-violet">Education</p>
          <div className="mt-6 rounded-2xl border border-line bg-lilac-panel/60 p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold">{education.degree}</h3>
            <p className="mt-1 text-sm text-ink-soft">{education.school}</p>
            <p className="mt-1 font-mono text-xs text-ink-faint">
              {education.period} · GPA {education.gpa}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Key courses">
              {education.courses.map((c) => (
                <li key={c} className="rounded-md bg-white px-2 py-1 font-mono text-[11px] text-ink-soft ring-1 ring-line">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 font-mono text-xs uppercase tracking-widest text-cyan">
            Reported highlights
          </p>
          <p className="mt-2 text-sm text-ink-faint">
            Honest until verifiable links exist — these render as reported, not featured.
          </p>
          <ul className="mt-4 space-y-3">
            {reportedHighlights.map((h) => (
              <li key={h.title} className="rounded-xl border border-dashed border-line bg-canvas p-4">
                <p className="text-sm font-semibold">{h.title}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{h.description}</p>
                <p className="mt-1 font-mono text-xs text-amber">{h.note}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Principles() {
  return (
    <section aria-labelledby="principles-heading" className="recruit-hide scroll-mt-20">
      <div className="shell mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            id="principles-heading"
            kicker="Engineering principles"
            title="How I decide what to build."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((pr, i) => (
            <Reveal key={pr.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6 shadow-sm">
                <span aria-hidden className="font-mono text-xs text-blue">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{pr.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pr.body}</p>
                {pr.exampleSlug && (
                  <Link
                    href={`/projects/${pr.exampleSlug}`}
                    className="mt-3 inline-block font-mono text-xs text-blue underline-offset-2 hover:underline"
                  >
                    see it applied ↗
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="recruit-hide scroll-mt-20 border-y border-line bg-surface"
    >
      <div className="shell mx-auto grid max-w-none gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
        <Reveal>
          <p id="about-heading" className="font-mono text-xs uppercase tracking-widest text-blue">
            About
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">
            {about.headline}
          </h2>
          <p className="mt-4 rounded-xl border border-line bg-canvas p-4 font-mono text-xs leading-relaxed text-ink-faint">
            Based in Pune, India · replies within a day · open to internships,
            research collaborations, and early-career AI engineering roles.
          </p>
        </Reveal>
        <Reveal delay={80} className="space-y-4 text-lg leading-relaxed text-ink-soft">
          {about.body.map((para) => (
            <p key={para.slice(0, 32)}>{para}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
