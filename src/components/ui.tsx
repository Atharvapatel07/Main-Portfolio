import type { ProjectStatus } from "@/content/schema";

const statusStyles: Record<ProjectStatus, string> = {
  shipped: "border-emerald-600/30 bg-[#ECFDF5] text-[#047857]",
  active: "border-blue/30 bg-blue-panel text-blue",
  experimental: "border-violet/30 bg-lilac-panel text-violet",
  planned: "border-amber-500/40 bg-lemon-panel text-amber",
  archived: "border-slate-400/40 bg-slate-100 text-slate-600",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide ${statusStyles[status]}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function SectionHeading({
  kicker,
  title,
  lead,
  id,
}: {
  kicker: string;
  title: string;
  lead?: string;
  id?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p id={id} className="font-mono text-xs uppercase tracking-widest text-blue">
        {kicker}
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-3 text-lg leading-relaxed text-ink-soft">{lead}</p>}
    </div>
  );
}
