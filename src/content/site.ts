import type { Achievement } from "./schema";

export const proofStrip = [
  {
    label: "B.E. Information Technology",
    detail: "I2IT, Pune · 2023 – 2027",
  },
  {
    label: "AI/ML Student Researcher",
    detail: "I2IT Pune · May – Sep 2025",
  },
  {
    label: "Public AI systems repo",
    detail: "MiniGPT — transformer from scratch",
  },
  {
    label: "Current focus",
    detail: "LLM serving, agent reliability, evaluation",
  },
];

export const capabilityGroups = [
  {
    title: "LLM & Agents",
    skills: [
      { name: "RAG pipelines", usedIn: "autonomous-research-agent-rag" },
      { name: "LangChain", usedIn: "autonomous-research-agent-rag" },
      { name: "FAISS", usedIn: "autonomous-research-agent-rag" },
      { name: "Transformers (from scratch)", usedIn: "minigpt-from-scratch" },
      { name: "Evaluation harnesses", usedIn: "autonomous-research-agent-rag" },
    ],
  },
  {
    title: "ML & Deep Learning",
    skills: [
      { name: "PyTorch", usedIn: "minigpt-from-scratch" },
      { name: "Training loops & scheduling", usedIn: "minigpt-from-scratch" },
      { name: "TensorFlow / Keras", usedIn: null },
      { name: "scikit-learn", usedIn: null },
      { name: "spaCy / NLTK", usedIn: null },
    ],
  },
  {
    title: "Computer Vision",
    skills: [
      { name: "YOLOv8", usedIn: "real-time-object-detection-tracking" },
      { name: "DeepSORT tracking", usedIn: "real-time-object-detection-tracking" },
      { name: "OpenCV", usedIn: "real-time-object-detection-tracking" },
      { name: "CNNs", usedIn: null },
    ],
  },
  {
    title: "Backend & Systems",
    skills: [
      { name: "FastAPI + WebSocket streaming", usedIn: "minigpt-from-scratch" },
      { name: "Docker", usedIn: "minigpt-from-scratch" },
      { name: "Python", usedIn: null },
      { name: "PostgreSQL / MySQL / SQLite", usedIn: null },
      { name: "Git", usedIn: null },
    ],
  },
  {
    title: "Cloud & Delivery",
    skills: [
      { name: "AWS / GCP (coursework)", usedIn: null },
      { name: "Linux", usedIn: null },
      { name: "Streamlit", usedIn: "autonomous-research-agent-rag" },
      { name: "Kubernetes (studying)", usedIn: null },
    ],
  },
] as const;

export const experience = [
  {
    role: "AI/ML Student Researcher",
    org: "I2IT Pune",
    kind: "On-campus research",
    period: "May 2025 – Sep 2025",
    points: [
      "Independent research on AI agents, ML models, and intelligent automation",
      "Built autonomous AI applications and real-time computer-vision prototypes with modern deep-learning frameworks",
      "Designed evaluation harnesses for retrieval accuracy and hallucination rates",
    ],
    links: [],
  },
];

export const education = {
  degree: "B.E. Information Technology",
  school: "International Institute of Information Technology (I2IT), Pune",
  period: "July 2023 – June 2027",
  gpa: "7.27",
  courses: [
    "Operating Systems",
    "Data Structures",
    "Analysis of Algorithms",
    "Artificial Intelligence",
    "Machine Learning",
    "Networking",
    "Databases",
  ],
};

export const achievements: Achievement[] = [
  // Verified entries render prominently; everything else is restrained or omitted.
];

export const reportedHighlights = [
  {
    title: "DataCamp instructor",
    description:
      "Project course and RL tutorial published via DataCamp; taken by 250+ learners at ~4.65 average rating per résumé records.",
    note: "",
  },
  {
    title: "Kaggle contributor",
    description:
      "Participation in ML competitions; résumé reports top-15% finishes among 2,500+ participants.",
    note: "",
  },
  {
    title: "Hackathon finalist",
    description: "AI tool built within a 24-hour hackathon window.",
    note: "",
  },
];

export const principles = [
  {
    title: "Evaluate before you trust",
    body: "Retrieval hit-rate before generation quality; degraded footage before clean demos. Numbers drive architecture decisions, not vibes.",
    exampleSlug: "autonomous-research-agent-rag",
  },
  {
    title: "Reproducibility is a feature",
    body: "Config-as-data, pinned environments, checkpoints that carry their own metadata — every run should answer 'which experiment was this?'",
    exampleSlug: "minigpt-from-scratch",
  },
  {
    title: "Measure honestly, label uncertainty",
    body: "Self-reported numbers say so on the page. Placeholders from résumés never become public claims.",
    exampleSlug: null,
  },
  {
    title: "Systems thinking over demos",
    body: "Streaming protocols, failure modes, latency budgets — the parts users actually feel are systems decisions, not model choices alone.",
    exampleSlug: "minigpt-from-scratch",
  },
];

export const about = {
  headline: "Engineer first, enthusiast second.",
  body: [
    "I'm a pre-final-year Information Technology student at I2IT Pune who likes the unglamorous middle of AI systems: the retrieval layer nobody demos, the eval harness nobody screenshots, the WebSocket loop that makes generation feel instant.",
    "When I'm not training something, I'm running — long-distance athletics taught me that pacing beats sprinting, which is basically also my take on training curves. I follow F1 closely enough to have opinions about pit strategy, and I unwind with esports.",
    "The problems I want next: LLM inference efficiency, agent reliability engineering, and making evaluation rigorous enough that 'it seems better' becomes a sentence I never say again.",
  ],
};

export const lastUpdated = "2026-08-22";
