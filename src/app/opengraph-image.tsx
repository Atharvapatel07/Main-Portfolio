import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Atharva A. Patel — AI/ML Engineer";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #F7FAFF 0%, #E8F1FF 55%, #F3EFFF 100%)",
          padding: 96,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: "#091A35", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700 }}>AP</div>
          <div style={{ fontSize: 34, color: "#2563EB", letterSpacing: 4, textTransform: "uppercase" }}>
            AI/ML Engineer · Pune, India
          </div>
        </div>
        <div style={{ fontSize: 88, fontWeight: 800, color: "#091A35", lineHeight: 1.05, marginTop: 40 }}>
          Atharva A. Patel
        </div>
        <div style={{ fontSize: 36, color: "#3C4C66", marginTop: 24, maxWidth: 980 }}>
          Reliable LLM systems, agents, and real-time vision — evaluated first.
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 44 }}>
          {["transformers from scratch", "RAG + agents", "detection & tracking"].map((chip) => (
            <div key={chip} style={{ border: "2px solid #93B8F5", borderRadius: 999, padding: "10px 22px", fontSize: 24, color: "#2563EB" }}>
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
