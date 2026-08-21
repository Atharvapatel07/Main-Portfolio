import type { RoadmapItem } from "./schema";

/**
 * Roadmap & archive. These are NEVER rendered as shipped work.
 * Statuses reflect audited reality (Aug 2026):
 * - No local implementation and no public repository exists for these yet,
 *   so résumé claims like "built" are not carried over as fact.
 */
export const roadmap: RoadmapItem[] = [
  {
    name: "InfernoServe",
    blurb:
      "From-scratch LLM inference engine — paged KV-cache, continuous batching, speculative decoding, goodput-aware scheduler. Design phase; résumé throughput figures were placeholders and are deliberately unpublished.",
    status: "planned",
    stack: ["Python", "C++/CUDA", "PyTorch", "Triton", "FastAPI"],
  },
  {
    name: "Sentinel",
    blurb:
      "Reliability guardrail layer for multi-agent systems — bounded loops, schema-validated tool calls, cost/token budgets, critic/verifier gate, deterministic replay from an event-sourced log.",
    status: "planned",
    stack: ["Python", "LangGraph", "Pydantic", "FastAPI", "Postgres", "Redis"],
  },
  {
    name: "GradMesh",
    blurb:
      "Distributed data-parallel training framework — ring all-reduce with gradient compression overlapped on backprop, elastic membership, checkpoint-based fault recovery.",
    status: "planned",
    stack: ["Python", "PyTorch", "NCCL/Gloo", "Prometheus"],
  },
  {
    name: "CortexGraph",
    blurb:
      "Hybrid knowledge-graph + vector retrieval engine with graph-aware re-ranking for multi-hop questions with citations.",
    status: "planned",
    stack: ["Python", "Neo4j", "pgvector", "spaCy"],
  },
  {
    name: "Atlas",
    blurb:
      "Scalable RL training platform for decision agents — async actor/learner split, prioritized replay service, reproducible control benchmarks.",
    status: "planned",
    stack: ["Python", "PyTorch", "Gymnasium", "Ray", "gRPC"],
  },
];

/** Older builds kept for the record; no public code links survive verification. */
export const archive: RoadmapItem[] = [
  {
    name: "RL-based traffic control (SUMO + edge nodes)",
    blurb:
      "Reinforcement-learning signal control simulated in SUMO with Raspberry Pi/Arduino vision input during early college coursework.",
    status: "archived",
    stack: ["Python", "SUMO", "Raspberry Pi"],
  },
  {
    name: "Satellite imagery panorama stitching",
    blurb:
      "Distributed image-stitching of ISRO-provided drone imagery across public compute nodes.",
    status: "archived",
    stack: ["C++", "PHP", "Java"],
  },
  {
    name: "Drag-n-drop ML studio",
    blurb:
      "Scratch-like visual editor for composing ML pipelines with in-context tutorials.",
    status: "archived",
    stack: ["Python", "JavaScript"],
  },
];
