import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mesh-glow relative flex min-h-[70vh] items-center overflow-hidden">
      <div className="grid-paper absolute inset-0" aria-hidden />
      <div className="shell relative mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <p className="font-mono text-sm uppercase tracking-widest text-blue">Error 404</p>
        <h1 className="mt-3 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
          This token wasn&apos;t in the vocabulary.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft">
          The page you asked for doesn&apos;t exist — possibly a stale link from an
          earlier version of this site.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="min-h-11 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Back to home
          </Link>
          <Link
            href="/projects"
            className="min-h-11 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-semibold hover:border-blue hover:text-blue"
          >
            Browse projects
          </Link>
        </div>
      </div>
    </div>
  );
}
