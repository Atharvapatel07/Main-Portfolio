import Link from "next/link";
import { site } from "@/lib/site";
import { lastUpdated } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell mx-auto grid gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">
            AI/ML engineer building reliable LLM systems, agents, and real-time
            vision — evaluated, reproducible, and shipped.
          </p>
          <p className="mt-4 font-mono text-xs text-ink-faint">
            Pune, India · content last updated {lastUpdated}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Site</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-blue" href="/projects">Projects</Link></li>
            <li><Link className="hover:text-blue" href="/#systems-lab">Systems Lab</Link></li>
            <li><Link className="hover:text-blue" href="/resume">Résumé</Link></li>
            <li><a className="hover:text-blue" href={site.resumePath} download>Résumé PDF</a></li>
          </ul>
        </nav>
        <nav aria-label="Elsewhere">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Elsewhere</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="hover:text-blue" href={site.github} rel="me noopener" target="_blank">GitHub</a></li>
            <li><a className="hover:text-blue" href={site.linkedin} rel="me noopener" target="_blank">LinkedIn</a></li>
            <li><a className="hover:text-blue" href={site.x} rel="me noopener" target="_blank">X / Twitter</a></li>
            <li><a className="hover:text-blue" href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line px-4 py-5 sm:px-6 lg:px-8">
        <p className="shell mx-auto font-mono text-xs text-ink-faint">
          Built with Next.js, TypeScript & Tailwind · every metric on this site
          is either evidence-linked or labeled self-reported
        </p>
      </div>
    </footer>
  );
}
