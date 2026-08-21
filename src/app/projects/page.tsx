import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/project-explorer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Searchable index of Atharva Patel's AI/ML case studies — LLM systems, RAG agents, computer vision — with honest status badges and evidence links.",
};

export default function ProjectsPage() {
  return (
    <div className="shell mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-blue">Index</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Projects
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Every entry states its real status. Shipped work links to public code;
          everything else says exactly what proof exists today.
        </p>
      </header>
      <div className="mt-10">
        <ProjectExplorer />
      </div>
    </div>
  );
}
