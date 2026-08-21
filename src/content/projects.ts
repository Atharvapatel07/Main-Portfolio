import type { Project } from "./schema";

/**
 * FEATURED CASE STUDIES
 *
 * Evidence policy applied:
 * - MiniGPT is the only project with a public repository → full case study,
 *   direct repo CTA, no benchmark numbers until published (README still has
 *   placeholders; parameter count is under reconciliation — see CONTENT_TODO.md).
 * - Research Agent + CV Tracking have no public code/demo today → metrics are
 *   flagged `verified: false` and render as "self-reported", with an honest
 *   "Private code · write-up in progress" proof state.
 * - InfernoServe / Sentinel / GradMesh / CortexGraph / Atlas and older web work
 *   live in roadmap.ts, never beside shipped work.
 */

export const projects: Project[] = [
  {
    slug: "minigpt-from-scratch",
    title: "MiniGPT — Transformer LM from scratch",
    oneLineOutcome:
      "A GPT-style decoder-only transformer written from raw PyTorch tensors, served over WebSocket token streaming.",
    summary:
      "MiniGPT implements every piece of a GPT-style language model by hand — causal multi-head attention, pre-LayerNorm blocks, AdamW + cosine scheduling with gradient clipping — then wraps it in a FastAPI backend that streams generated tokens over WebSocket into a vanilla JS/canvas UI. No nn.Transformer, no prebuilt LLM libraries.",
    role: "Solo engineer — model, training pipeline, backend, and frontend.",
    status: "shipped",
    featured: true,
    dates: "2026",
    problem:
      "Most 'LLM projects' glue together an API. I wanted to prove I understand what happens between logits and loss — so I built a transformer where every component had no library to hide behind.",
    whyItMattered:
      "Writing attention, normalization, scheduling, and checkpointing from first principles is the fastest way to debug real LLM systems later. The same repo also forced end-to-end thinking: training code, serving code, streaming protocol, and a demo interface in one reproducible setup.",
    constraints: [
      "Consumer GPU / Google Colab budget — small context window (512 tokens) and compact d_model (384)",
      "Single-machine training, so the setup had to be fully reproducible from a requirements file",
      "cl100k tokenizer (100K vocab) chosen for transferable tokenization rather than a tiny custom BPE",
    ],
    approach: [
      {
        heading: "Model core",
        detail:
          "Decoder-only transformer: fused QKV projection, pre-computed causal mask buffer, pre-LayerNorm residual blocks, GELU feed-forward (d_ff = 4×d_model), weight-tied embedding/output head, PyTorch 2.0 scaled-dot-product (flash) attention when available.",
      },
      {
        heading: "Training loop",
        detail:
          "AdamW (β₁ 0.9 / β₂ 0.95, weight decay 0.1), cosine LR schedule 3e-4 → 3e-5 with 500 warmup steps, gradient clipping at 1.0, periodic eval splits with best-checkpoint tracking, W&B experiment logging.",
      },
      {
        heading: "Serving layer",
        detail:
          "FastAPI app loads the best checkpoint at startup (falling back to a fresh model for demos), exposes REST inference endpoints plus a WebSocket route that streams tokens as they are sampled instead of returning one blocked response.",
      },
      {
        heading: "Interface",
        detail:
          "Vanilla JS single page with a canvas architecture diagram — deliberately dependency-free so the demo runs anywhere the container runs.",
      },
    ],
    architectureNotes: [
      "config: n_layers 6 · n_heads 6 · d_model 384 · d_ff 1536 · context 512 · dropout 0.1 · bias disabled",
      "tokenizer: tiktoken cl100k_base (100,277 vocab)",
      "checkpoints carry step + val_loss; server derives perplexity = exp(val_loss) once benchmarks are published",
      "Dockerfile packages model + backend + static frontend into one runnable image",
    ],
    stack: ["PyTorch 2.x", "Python", "FastAPI", "WebSocket", "tiktoken", "Docker", "W&B", "Vanilla JS"],
    responsibilities: [
      "Designed and implemented the transformer architecture from scratch (no nn.Transformer)",
      "Built the data preparation and tokenization pipeline for the CodeParrot Python dataset",
      "Implemented training loop with cosine scheduling, clipping, and checkpoint selection",
      "Built FastAPI/WebSocket streaming backend and canvas demo UI",
      "Containerized the full stack and wrote reproducible setup instructions",
    ],
    results: [
      {
        label: "Benchmark status",
        value: "Awaiting publication",
        verified: false,
        methodology:
          "Validation loss/perplexity will be reported from the tracked eval split once the final run finishes; the README's perplexity placeholder was intentionally not carried into this site.",
      },
    ],
    proofState: "Public repository with runnable training, backend, and demo — benchmark numbers pending publication",
    repoUrl: "https://github.com/Atharvapatel07/minigpt-from-scratch",
    diagram: "transformer",
    codeExcerpt: {
      language: "python",
      caption:
        "Causal self-attention with a fused QKV projection and flash attention fallback — model/transformer.py",
      sourceUrl: "https://github.com/Atharvapatel07/minigpt-from-scratch/blob/main/model/transformer.py",
      code: `class CausalSelfAttention(nn.Module):
    def __init__(self, config: GPTConfig):
        super().__init__()
        # Fused QKV projection — more efficient than 3 separate linears
        self.qkv_proj = nn.Linear(config.d_model, 3 * config.d_model, bias=config.bias)
        self.out_proj = nn.Linear(config.d_model, config.d_model, bias=config.bias)
        # Causal mask: token i cannot attend to token j > i
        mask = torch.triu(
            torch.full((config.context_len, config.context_len), float('-inf')),
            diagonal=1,
        )
        self.register_buffer("mask", mask)
        self.use_flash = hasattr(F, "scaled_dot_product_attention")`,
    },
    lessons: [
      "Numerical stability details (pre-LN placement, β₂=0.95, grad clipping) matter more at small scale than tutorials suggest",
      "Streaming changes perceived quality more than raw latency — tokens appearing live feel dramatically faster",
      "Reproducibility is a feature: config-as-dataclass saved/loaded alongside checkpoints prevents 'which run was this?' archaeology",
    ],
    nextSteps: [
      "Publish validation loss / perplexity from a completed training run",
      "Add a Hugging Face model card and hosted demo",
      "Benchmark against a nanoGPT baseline at matched compute",
    ],
    tags: ["LLM", "PyTorch", "Transformers", "Inference", "MLOps"],
    lastUpdated: "2026-08-22",
    evidenceLinks: [
      {
        label: "minigpt-from-scratch (public repository)",
        url: "https://github.com/Atharvapatel07/minigpt-from-scratch",
        kind: "repo",
      },
    ],
  },
  {
    slug: "autonomous-research-agent-rag",
    title: "Autonomous Research Agent with RAG",
    oneLineOutcome:
      "An agentic research assistant that plans, retrieves, and synthesizes answers across many heterogeneous sources.",
    summary:
      "Built during my AI/ML student researcher role at I2IT Pune: a LangChain-based agent that decomposes research questions, retrieves over a FAISS index with chunk-level re-ranking, cites sources, and answers through a Streamlit interface. Retrieval quality and hallucination behavior were measured with a custom eval harness rather than vibes.",
    role: "Solo builder — agent design, retrieval pipeline, evaluation harness, deployment.",
    status: "experimental",
    featured: true,
    dates: "May – Sep 2025 · I2IT Pune",
    problem:
      "Open-ended research questions need multi-step reasoning over sources an LLM has never seen. Naive RAG answers confidently from weak retrievals; I wanted retrieval accuracy measured explicitly before trusting any answer.",
    whyItMattered:
      "It was my first end-to-end agentic system and it taught me that evaluation design drives architecture: chunking strategy, re-ranking, and citation enforcement all changed once accuracy was measured per-stage instead of judged by eye.",
    constraints: [
      "Academic research setting — no production secret management or paid vector DB",
      "Heterogeneous sources (papers, notes, web pages) with inconsistent structure",
      "Latency budget for interactive use in a Streamlit app",
    ],
    approach: [
      {
        heading: "Planning agent",
        detail:
          "Question decomposition into sub-queries with tool-calling loops over the retrieval index.",
      },
      {
        heading: "Retrieval",
        detail:
          "FAISS vector search over chunked embeddings with chunk-level re-ranking before synthesis.",
      },
      {
        heading: "Evaluation harness",
        detail:
          "Labeled query set scored for retrieval hit-rate; grounded-answer checks to estimate hallucination rate — numbers below are self-reported from this internal harness.",
      },
      {
        heading: "Serving",
        detail:
          "Embedding cache plus async retrieval to keep interactive latency low in Streamlit.",
      },
    ],
    architectureNotes: [
      "Pipeline: question → planner → FAISS retrieval → re-rank → synthesis with citations",
      "Evaluation ran offline against a labeled set, separate from the serving path",
    ],
    stack: ["Python", "LangChain", "OpenAI API", "FAISS", "Streamlit"],
    responsibilities: [
      "Designed the agent planning/tool-calling loop",
      "Built the FAISS ingestion + re-ranking pipeline",
      "Wrote the retrieval-accuracy and hallucination eval harness",
      "Deployed the Streamlit interface used for manual testing sessions",
    ],
    results: [
      {
        label: "Retrieval accuracy",
        value: "~92%",
        methodology:
          "Self-reported from an internal labeled-query harness during the research period.",
        verified: false,
      },
      {
        label: "Hallucination reduction vs ungrounded baseline",
        value: "~75%",
        methodology:
          "Self-reported comparison against the same model answering without retrieval, judged on the internal eval set.",
        verified: false,
      },
      {
        label: "Queries handled",
        value: "500+",
        methodology: "Self-reported count across manual testing sessions.",
        verified: false,
      },
      {
        label: "Interactive latency",
        value: "<2 s typical",
        methodology: "Self-reported informal timing, not a p95 benchmark.",
        verified: false,
      },
    ],
    proofState: "Private code · write-up in progress — metrics are self-reported pending a public benchmark",
    diagram: "rag",
    lessons: [
      "Measure retrieval before generation — most 'hallucinations' were retrieval failures",
      "Chunk boundaries and metadata discipline dominate embedding-model choice",
      "Agents without bounded loops find creative ways to burn tokens",
    ],
    nextSteps: [
      "Publicize the eval harness and a sanitized subset of the corpus",
      "Re-run benchmarks on current models and publish the methodology",
      "Open-source the retrieval pipeline independent of API keys",
    ],
    tags: ["RAG", "Agents", "LangChain", "FAISS", "Evaluation"],
    lastUpdated: "2026-08-22",
    evidenceLinks: [],
  },
  {
    slug: "real-time-object-detection-tracking",
    title: "Real-Time Object Detection & Tracking",
    oneLineOutcome:
      "YOLOv8 detection fused with DeepSORT identity-persistent tracking on live video streams.",
    summary:
      "A real-time computer-vision pipeline pairing YOLOv8 detection with DeepSORT multi-object tracking, tuned with augmentation and Kalman-filter parameters for robustness against occlusion and noisy input. Built as part of applied CV research work at I2IT Pune.",
    role: "Solo builder — model tuning, tracker integration, robustness evaluation.",
    status: "experimental",
    featured: true,
    dates: "2025 · I2IT Pune",
    problem:
      "Detection alone forgets objects between frames. Surveillance-adjacent use cases need stable identities through occlusion, motion blur, and sensor noise — which means evaluating tracking, not just mAP.",
    whyItMattered:
      "It grounded my understanding of the detection→tracking handoff: NMS thresholds, embedding budgets, and Kalman tuning interact in non-obvious ways that only show up when you stress the pipeline with occlusion scenarios.",
    constraints: [
      "Real-time target on commodity hardware (no high-end GPU in the loop)",
      "Occlusion-heavy test scenes where pure detectors flicker identities",
      "No public dataset release from the research setting",
    ],
    approach: [
      {
        heading: "Detection",
        detail: "YOLOv8 fine-tuned for the scene's object classes.",
      },
      {
        heading: "Tracking",
        detail:
          "DeepSORT assigns persistent IDs using appearance embeddings plus Kalman-filtered motion prediction between detections.",
      },
      {
        heading: "Robustness pass",
        detail:
          "Augmented training data and tracker-parameter sweeps targeting occlusion and noise scenarios.",
      },
    ],
    architectureNotes: [
      "Frame → YOLOv8 detector → DeepSORT association → identity-stable track output",
      "Robustness evaluated on held-out degraded footage, not just clean validation splits",
    ],
    stack: ["Python", "YOLOv8", "DeepSORT", "OpenCV"],
    responsibilities: [
      "Fine-tuned YOLOv8 and managed train/val data quality",
      "Integrated and tuned DeepSORT (embedding budget, matching thresholds, Kalman noise)",
      "Ran occlusion/noise robustness passes",
    ],
    results: [
      {
        label: "Detection quality (mAP@50)",
        value: "~85%",
        methodology: "Self-reported from fine-tuning validation runs.",
        verified: false,
      },
      {
        label: "Multi-object tracking accuracy (approx.)",
        value: "~95%",
        methodology:
          "Self-reported MOTA-style estimate on internal test footage; formal MOT benchmark submission pending.",
        verified: false,
      },
      {
        label: "Robustness gain under occlusion/noise",
        value: "+15% (relative)",
        methodology:
          "Self-reported improvement after augmentation + Kalman tuning on degraded test clips.",
        verified: false,
      },
    ],
    proofState: "Private code · write-up in progress — metrics are self-reported pending a public benchmark",
    diagram: "detect-track",
    lessons: [
      "Tracker tuning is a systems problem: detector confidence thresholds shift optimal Kalman noise settings",
      "Identity switches, not missed detections, dominate perceived quality",
      "Degraded-footage evals reveal failures clean benchmarks hide",
    ],
    nextSteps: [
      "Publish code with a standard MOT dataset evaluation (MOT16/17 protocol)",
      "Add latency profiling on edge hardware",
    ],
    tags: ["Computer Vision", "YOLO", "Tracking", "OpenCV"],
    lastUpdated: "2026-08-22",
    evidenceLinks: [],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured);

