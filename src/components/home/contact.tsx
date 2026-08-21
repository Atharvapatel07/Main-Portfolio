"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export function ContactCta() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (permissions/insecure context) — no-op.
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mesh-glow relative scroll-mt-20 overflow-hidden border-t border-line"
    >
      <div className="grid-paper absolute inset-0" aria-hidden />
      <div className="shell relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-blue">Contact</p>
        <h2 id="contact-heading" className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-5xl">
          Let&apos;s build something intelligent.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
          I&apos;m looking for AI/ML internships, graduate research, and early-career
          engineering roles. Email is fastest — I usually reply within a day.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="rounded-xl bg-blue px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
          >
            Email {site.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="min-h-11 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-semibold hover:border-blue hover:text-blue"
          >
            {copied ? "Copied ✓" : "Copy email"}
          </button>
          <a
            href={site.resumePath}
            download
            className="min-h-11 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-semibold hover:border-blue hover:text-blue"
          >
            Download résumé
          </a>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-sm">
          <a className="text-ink-soft hover:text-blue" href={site.github} target="_blank" rel="noopener">GitHub ↗</a>
          <a className="text-ink-soft hover:text-blue" href={site.linkedin} target="_blank" rel="me noopener">LinkedIn ↗</a>
          <a className="text-ink-soft hover:text-blue" href={site.x} target="_blank" rel="noopener">X ↗</a>
        </div>
        <p aria-live="polite" className="sr-only">
          {copied ? "Email address copied to clipboard" : ""}
        </p>
      </div>
    </section>
  );
}
