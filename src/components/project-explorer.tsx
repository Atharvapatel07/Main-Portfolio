"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { projects } from "@/content/projects";
import { roadmap, archive } from "@/content/roadmap";
import { StatusBadge } from "@/components/ui";

const TAGS = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

export function ProjectExplorer() {
  const [tag, setTag] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesTag = tag === "All" || p.tags.includes(tag);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        [p.title, p.summary, p.stack.join(" "), p.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesTag && matchesQuery;
    });
  }, [tag, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {/* Filters use radiogroup semantics with visible active state */}
        <fieldset className="min-w-0">
          <legend className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            Filter by area
          </legend>
          <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Filter by tag">
            {TAGS.map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={tag === t}
                onClick={() => setTag(t)}
                className={`min-h-11 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  tag === t
                    ? "border-blue bg-blue-panel font-semibold text-blue"
                    : "border-line bg-surface text-ink-soft hover:border-blue/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="w-full md:w-72">
          <label htmlFor="project-search" className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            Search
          </label>
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. FAISS, YOLO, FastAPI…"
            className="mt-2 min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm outline-none placeholder:text-ink-faint focus:border-blue"
          />
        </div>
      </div>

      <p aria-live="polite" className="mt-6 font-mono text-xs text-ink-faint">
        Showing {filtered.length} of {projects.length} case studies
        {tag !== "All" ? ` · filter: ${tag}` : ""}
      </p>

      <ul className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-center justify-between gap-3">
                <StatusBadge status={p.status} />
                <span className="font-mono text-[11px] text-ink-faint">{p.dates}</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold leading-snug group-hover:text-blue">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{p.oneLineOutcome}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                {p.stack.slice(0, 4).map((s) => (
                  <li key={s} className="rounded-md bg-canvas px-2 py-0.5 font-mono text-[11px] text-ink-soft ring-1 ring-line">
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-dashed border-line pt-2 font-mono text-[11px] text-ink-faint">
                {p.repoUrl ? "public repo ↗" : "private · write-up in progress"}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-8 rounded-xl border border-dashed border-line bg-surface p-8 text-center text-sm text-ink-soft">
          No case studies match. Clear the search or pick another area.
        </p>
      )}

      {/* Roadmap & archive — clearly separated from shipped work */}
      <section aria-labelledby="roadmap-heading" className="mt-16">
        <h2 id="roadmap-heading" className="font-display text-2xl font-bold tracking-tight">
          Roadmap & archive
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft">
          Systems in design, and earlier builds kept for the record. None of these
          are shipped work — résumé claims were reconciled against reality before
          publishing anything here.
        </p>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {[...roadmap, ...archive].map((item) => (
            <li key={item.name} className="rounded-xl border border-dashed border-line bg-canvas p-5">
              <div className="flex items-center gap-3">
                <StatusBadge status={item.status} />
                <h3 className="font-semibold">{item.name}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.blurb}</p>
              {item.stack.length > 0 && (
                <p className="mt-2 font-mono text-[11px] text-ink-faint">{item.stack.join(" · ")}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
