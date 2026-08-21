import type { Project } from "@/content/schema";

/**
 * Hand-built SVG architecture diagrams. Each is server-rendered,
 * has a text alternative via role="img" + aria-label + <title>/<desc>,
 * and animates data-flow only through stroke-dashoffset (reduced-motion safe).
 */

function DiagramFrame({
  label,
  children,
  viewBox,
}: {
  label: string;
  viewBox: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="not-prose">
      <svg
        role="img"
        aria-label={label}
        viewBox={viewBox}
        className="h-auto w-full"
        fontFamily="var(--font-mono)"
      >
        <title>{label}</title>
        {children}
      </svg>
    </figure>
  );
}

const box = "fill-white stroke-[#2563EB] stroke-[1.5]";
const softBox = "fill-[#E8F1FF] stroke-[#93B8F5] stroke-[1]";
const flow = "stroke-[#7C3AED] stroke-[1.5] fill-none";
const flowing = "flowing-dash";

export function TransformerDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <DiagramFrame
      viewBox="0 0 640 300"
      label="Architecture: token stream flows through embeddings, six pre-LayerNorm transformer blocks with causal multi-head attention, and a tied output head producing logits."
    >
      <desc>MiniGPT pipeline: tokens in, causal attention blocks, logits out.</desc>
      {/* input tokens */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={20 + i * 34} y={30} width={26} height={26} rx={4} className={softBox} />
      ))}
      <text x={20} y={76} fontSize={11} fill="#64748B">tokens · cl100k</text>
      {/* embedding */}
      <rect x={200} y={22} width={110} height={40} rx={8} className={box} />
      <text x={255} y={46} fontSize={11} textAnchor="middle" fill="#091A35">embedding</text>
      <path d={`M192 42 H 196`} className={`${flow} ${flowing}`} />
      {/* attention detail */}
      <g transform="translate(370,14)">
        <rect width={230} height={56} rx={10} className="fill-[#F3EFFF] stroke-[#7C3AED] stroke-[1.5]" />
        <text x={115} y={22} fontSize={11} textAnchor="middle" fill="#091A35">causal multi-head self-attention</text>
        <text x={115} y={40} fontSize={10} textAnchor="middle" fill="#7C3AED">fused QKV · flash SDPA · mask buffer</text>
      </g>
      <path d="M310 42 C 340 42, 340 42, 366 42" className={`${flow} ${flowing}`} />
      {/* blocks */}
      {compact
        ? null
        : [0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} transform={`translate(${28 + i * 96},120)`}>
              <rect width={84} height={64} rx={10} className={box} />
              <text x={42} y={24} fontSize={11} textAnchor="middle" fill="#091A35">block {i + 1}</text>
              <text x={42} y={42} fontSize={9} textAnchor="middle" fill="#64748B">pre-LN</text>
              <text x={42} y={55} fontSize={9} textAnchor="middle" fill="#64748B">GELU FFN ×4</text>
              {i < 5 && (
                <path d={`M84 32 H 96`} className={`${flow} ${flowing}`} markerEnd="" />
              )}
            </g>
          ))}
      {compact && (
        <g transform="translate(28,120)">
          <rect width={560} height={64} rx={10} className={box} />
          <text x={280} y={28} fontSize={12} textAnchor="middle" fill="#091A35">6 × pre-LayerNorm transformer blocks</text>
          <text x={280} y={48} fontSize={10} textAnchor="middle" fill="#64748B">causal MHSA → residual → LN → GELU FFN → residual</text>
        </g>
      )}
      {/* output head */}
      <path d="M320 184 V 214" className={`${flow} ${flowing}`} />
      <g transform="translate(180,218)">
        <rect width={280} height={48} rx={10} className={box} />
        <text x={140} y={21} fontSize={11} textAnchor="middle" fill="#091A35">tied output head (weight-tied)</text>
        <text x={140} y={38} fontSize={10} textAnchor="middle" fill="#64748B">logits over 100,277 tokens</text>
      </g>
      {/* streaming */}
      <g transform="translate(480,232)">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={i * 30} y={0} width={22} height={18} rx={3} className={`${softBox} ${flowing}`} style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
        <text x={30} y={34} fontSize={10} fill="#64748B">WebSocket token stream → demo UI</text>
      </g>
    </DiagramFrame>
  );
}

export function RagDiagram() {
  const sources = ["papers", "notes", "web pages"];
  return (
    <DiagramFrame
      viewBox="0 0 640 300"
      label="RAG architecture: a research question goes to a planning agent, which queries a FAISS index built from papers, notes and web pages; chunks are re-ranked before synthesis produces a cited answer."
    >
      <desc>Agentic RAG pipeline with re-ranking and citations.</desc>
      <g transform="translate(16,24)">
        <rect width={150} height={52} rx={10} className={box} />
        <text x={75} y={23} fontSize={11} textAnchor="middle" fill="#091A35">research question</text>
        <text x={75} y={40} fontSize={9} textAnchor="middle" fill="#64748B">decomposed by planner</text>
      </g>
      <path d="M166 50 H 206" className={`${flow} ${flowing}`} />
      <g transform="translate(208,24)">
        <rect width={130} height={52} rx={10} className="fill-[#FEF9E7] stroke-[#D97706] stroke-[1.5]" />
        <text x={65} y={31} fontSize={11} textAnchor="middle" fill="#091A35">planning agent</text>
      </g>
      <path d="M338 50 C 368 50, 368 90, 396 90" className={`${flow} ${flowing}`} />
      {/* index */}
      <g transform="translate(398,60)">
        <rect width={190} height={92} rx={12} className="fill-[#E8F1FF] stroke-[#2563EB] stroke-[1.5]" />
        <text x={95} y={22} fontSize={11} textAnchor="middle" fill="#091A35">FAISS vector index</text>
        {sources.map((s, i) => (
          <g key={s}>
            <circle cx={40 + i * 55} cy={54} r={13} className="fill-white stroke-[#2563EB]" />
            <text x={40 + i * 55} y={58} fontSize={7.5} textAnchor="middle" fill="#2563EB">{s.split(" ")[0]}</text>
          </g>
        ))}
        <text x={95} y={82} fontSize={9} textAnchor="middle" fill="#3C4C66">chunked · embedded · cached</text>
      </g>
      {/* re-rank */}
      <path d="M493 152 V 182" className={`${flow} ${flowing}`} />
      <g transform="translate(380,186)">
        <rect width={210} height={44} rx={10} className={box} />
        <text x={105} y={27} fontSize={11} textAnchor="middle" fill="#091A35">chunk-level re-rank</text>
      </g>
      <path d="M380 208 C 330 208, 330 240, 296 240" className={`${flow} ${flowing}`} />
      {/* synthesis */}
      <g transform="translate(96,216)">
        <rect width={198} height={52} rx={10} className="fill-[#ECFDF5] stroke-[#059669] stroke-[1.5]" />
        <text x={99} y={23} fontSize={11} textAnchor="middle" fill="#064E3B">synthesis + citations</text>
        <text x={99} y={40} fontSize={9} textAnchor="middle" fill="#047857">evaluated against labeled queries</text>
      </g>
      {/* eval side-channel */}
      <g transform="translate(96,132)">
        <rect width={198} height={40} rx={10} className="fill-white stroke-dasharray-4 stroke-[#94A3B8]" />
        <text x={99} y={25} fontSize={10} textAnchor="middle" fill="#64748B">offline eval harness → accuracy</text>
      </g>
      <path d="M195 172 V 212" className="stroke-[#94A3B8] stroke-[1.2] stroke-dasharray-4 fill-none" />
    </DiagramFrame>
  );
}

export function DetectTrackDiagram() {
  // three frames with boxes + id trail
  const frames = [
    { x: 16, ids: [{ x: 30, y: 40 }, { x: 96, y: 70 }] },
    { x: 232, ids: [{ x: 44, y: 46 }, { x: 104, y: 74 }] },
    { x: 448, ids: [{ x: 58, y: 52 }, { x: 112, y: 78 }] },
  ];
  const colors = ["#2563EB", "#D97706"];
  return (
    <DiagramFrame
      viewBox="0 0 640 260"
      label="Detect-and-track pipeline: YOLOv8 proposes detections per frame; DeepSORT associates them into persistent identities across frames using appearance embeddings and Kalman-predicted motion."
    >
      <desc>YOLOv8 detections become persistent tracked IDs across frames.</desc>
      {frames.map((f, fi) => (
        <g key={fi} transform={`translate(${f.x},24)`}>
          <rect width={176} height={176} rx={12} className="fill-[#F1F5FB] stroke-[#CBD8EA] stroke-[1.2]" />
          <text x={10} y={168} fontSize={9} fill="#64748B">frame t{fi > 0 ? `+${fi}` : ""}</text>
          {fi < 2 && (
            <path d="M178 88 H 214" className={`${flow} ${flowing}`} />
          )}
          {f.ids.map((b, bi) => (
            <g key={bi}>
              <rect
                x={b.x}
                y={b.y}
                width={44}
                height={34}
                rx={4}
                fill="none"
                stroke={colors[bi]}
                strokeWidth={2}
                strokeDasharray={fi === 2 ? undefined : "none"}
              />
              <rect x={b.x - 2} y={b.y - 14} width={26} height={13} rx={3} fill={colors[bi]} />
              <text x={b.x + 11} y={b.y - 4} fontSize={9} textAnchor="middle" fill="#fff">
                ID{bi + 1}
              </text>
            </g>
          ))}
        </g>
      ))}
      <g transform="translate(16,222)">
        <text fontSize={10} fill="#3C4C66">
          YOLOv8 detector → DeepSORT association (appearance embeddings + Kalman motion prediction)
        </text>
      </g>
    </DiagramFrame>
  );
}

export function ProjectDiagram({ kind }: { kind: Project["diagram"] }) {
  if (kind === "transformer") return <TransformerDiagram />;
  if (kind === "rag") return <RagDiagram />;
  if (kind === "detect-track") return <DetectTrackDiagram />;
  return null;
}
