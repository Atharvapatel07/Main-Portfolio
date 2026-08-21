"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { useRecruiter } from "./recruiter-mode";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Systems Lab", href: "/#systems-lab" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { enabled, toggle } = useRecruiter();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-canvas/85 backdrop-blur">
      <div className="shell mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight"
        >
          <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-ink text-[13px] font-bold text-white">
            AP
          </span>
          <span className="hidden sm:inline">Atharva Patel</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-blue-panel hover:text-blue"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/projects"
            className="rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-blue-panel hover:text-blue"
          >
            Projects
          </Link>
          <Link
            href="/resume"
            className="rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-blue-panel hover:text-blue"
          >
            Résumé
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              toggle();
              setMenuOpen(false);
            }}
            aria-pressed={enabled}
            className={`min-h-11 rounded-lg border px-3 text-xs font-medium transition-colors ${
              enabled
                ? "border-violet bg-lilac-panel text-violet"
                : "border-line text-ink-soft hover:border-violet hover:text-violet"
            }`}
            title="Condensed, low-motion view for recruiters"
          >
            <span aria-hidden>◆</span> Recruiter mode
          </button>
          <a
            href={site.resumePath}
            download
            className="hidden min-h-11 items-center rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-px md:inline-flex"
          >
            Download résumé
          </a>
          <button
            type="button"
            onClick={() => setOpenPaletteHint()}
            data-palette-trigger
            aria-label="Open command palette (Ctrl+K)"
            className="hidden min-h-11 min-w-11 items-center justify-center rounded-lg border border-line font-mono text-xs text-ink-faint hover:border-blue hover:text-blue sm:inline-flex"
          >
            ⌘K
          </button>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line md:hidden"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M4 4l10 10M14 4L4 14" />
              ) : (
                <path d="M2 5h14M2 9h14M2 13h14" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-line bg-surface px-4 pb-4 pt-2 md:hidden"
        >
          {[...links, { label: "Projects", href: "/projects" }, { label: "Résumé", href: "/resume" }].map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-3 text-base text-ink hover:bg-blue-panel"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={site.resumePath}
            download
            onClick={() => setMenuOpen(false)}
            className="mt-2 block rounded-lg bg-blue px-3 py-3 text-center text-base font-semibold text-white"
          >
            Download résumé
          </a>
        </nav>
      )}
    </header>
  );
}

function setOpenPaletteHint() {
  document.dispatchEvent(new CustomEvent("open-command-palette"));
}
