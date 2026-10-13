import Link from "next/link";
import { site } from "@/lib/site";
import { proofStrip } from "@/content/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="mesh-glow relative overflow-hidden border-b border-line">
      <div className="grid-paper absolute inset-0" aria-hidden />
      <div className="shell relative mx-auto px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8">
        {site.availability.visible && (
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-600/25 bg-[#ECFDF5] px-3 py-1 text-sm font-medium text-[#047857]">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
            </span>
            {site.availability.label}
          </p>
        )}
        <h1
          id="hero-heading"
          className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl"
        >
          AI/ML engineer building{" "}
          <span className="bg-gradient-to-r from-blue via-violet to-cyan bg-clip-text text-transparent">
            reliable LLM systems
          </span>
          , agents, and real-time vision.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          I&apos;m {site.name} — a final-year B.E. IT student at I2IT Pune.
          Every project on this site states who built what, how it was evaluated,
          and links to the exact repo or an honest &ldquo;proof pending&rdquo; note.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
          >
            Explore AI systems →
          </a>
          <a
            href={site.resumePath}
            download
            className="rounded-xl border border-line bg-surface px-5 py-3 text-sm font-semibold shadow-sm transition-colors hover:border-blue hover:text-blue"
          >
            Download résumé (PDF)
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          <a className="text-ink-soft underline-offset-4 hover:text-blue hover:underline" href={site.github} target="_blank" rel="noopener">
            github/Atharvapatel07 ↗
          </a>
          <a className="text-ink-soft underline-offset-4 hover:text-blue hover:underline" href={site.linkedin} target="_blank" rel="me noopener">
            linkedin/atharva-a-patel ↗
          </a>
          <Link className="text-ink-soft underline-offset-4 hover:text-blue hover:underline" href="/projects">
            all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ProofStrip() {
  return (
    <section aria-label="Quick facts" className="border-b border-line bg-surface">
      <dl className="shell mx-auto grid grid-cols-2 divide-line px-4 sm:px-6 md:grid-cols-4 md:divide-x lg:px-8">
        {proofStrip.map((item, i) => (
          <div key={item.label} className={`px-2 py-5 ${i > 1 ? "border-t border-line md:border-t-0" : ""} ${i % 2 === 1 ? "border-l border-line pl-4 md:pl-8" : ""}`}>
            <dt className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
              {item.label}
            </dt>
            <dd className="mt-1.5 text-sm font-medium">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
