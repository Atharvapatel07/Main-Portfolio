import { ImageResponse } from "next/og";
import { getProject } from "@/content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project case study preview";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #F7FAFF 0%, #E8F1FF 55%, #F3EFFF 100%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#091A35", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700 }}>AP</div>
          <div style={{ fontSize: 26, color: "#3C4C66" }}>Atharva A. Patel · AI/ML Engineer</div>
        </div>
        <div>
          <div style={{ fontSize: 22, letterSpacing: 2, textTransform: "uppercase", color: "#2563EB", marginBottom: 18 }}>
            {(project?.status ?? "case study").toUpperCase()}
          </div>
          <div style={{ fontSize: 62, fontWeight: 800, color: "#091A35", lineHeight: 1.1, maxWidth: 980 }}>
            {project?.title ?? "AI/ML Case Study"}
          </div>
          <div style={{ fontSize: 30, color: "#3C4C66", marginTop: 20, maxWidth: 900 }}>
            {project?.oneLineOutcome ?? ""}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
