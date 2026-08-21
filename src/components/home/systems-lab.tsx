"use client";

import { useState } from "react";
import { RagDiagram, DetectTrackDiagram, TransformerDiagram } from "@/components/diagrams";

const tabs = [
  {
    id: "rag",
    label: "RAG pipeline",
    title: "Retrieval-Augmented Generation",
    body: "How the research agent answers: a planner decomposes the question, FAISS retrieves over chunked sources, a re-ranker keeps only evidence worth reading, and synthesis must cite what it used. The offline eval harness scores retrieval accuracy separately from generation quality.",
    diagram: <RagDiagram />,
    panel: "bg-blue-panel",
  },
  {
    id: "transformer",
    label: "Transformer flow",
    title: "Inside MiniGPT",
    body: "Tokens enter, embeddings are added, and six pre-LayerNorm blocks apply causal multi-head attention — each token may only look left. A weight-tied head projects back to vocabulary logits, streamed token-by-token over WebSocket.",
    diagram: <TransformerDiagram />,
    panel: "bg-lilac-panel",
  },
  {
    id: "detect-track",
    label: "Detect → track",
    title: "YOLOv8 + DeepSORT",
    body: "Detection finds objects per frame; tracking keeps their identity. DeepSORT matches detections across frames using appearance embeddings plus Kalman-filtered motion prediction — the reason ID1 stays ID1 through occlusion instead of flickering into ID7.",
    diagram: <DetectTrackDiagram />,
    panel: "bg-mint-panel",
  },
];

export function SystemsLab() {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section
      id="systems-lab"
      aria-labelledby="systems-lab-heading"
      className="scroll-mt-20 border-y border-line bg-surface"
    >
      <div className="shell mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <p id="systems-lab-heading" className="font-mono text-xs uppercase tracking-widest text-blue">
          Systems Lab
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          How the machines actually work.
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">
          Interactive explainers built from real project architecture — not
          decorative AI art. Pick a system:
        </p>

        <div role="tablist" aria-label="System explainers" className="mt-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => setActive(t.id)}
              className={`min-h-11 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                active === t.id
                  ? "border-blue bg-blue-panel text-blue"
                  : "border-line bg-canvas text-ink-soft hover:border-blue/50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          tabIndex={0}
          className={`mt-6 grid gap-8 rounded-3xl border border-line p-6 sm:p-10 lg:grid-cols-[1fr_1.4fr] ${tab.panel}`}
        >
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight">{tab.title}</h3>
            <p className="mt-3 leading-relaxed text-ink-soft">{tab.body}</p>
            <p className="mt-4 rounded-lg border border-line bg-white/70 px-3 py-2 font-mono text-xs text-ink-faint">
              Diagram: real architecture from this site&apos;s case studies · animated
              strokes pause under reduced motion
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-lift)] sm:p-6">
            {tab.diagram}
          </div>
        </div>
      </div>
    </section>
  );
}
