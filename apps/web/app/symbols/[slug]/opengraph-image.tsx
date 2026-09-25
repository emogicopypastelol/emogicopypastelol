import { ImageResponse } from "next/og";
import { symbolCategories, symbols } from "@repo/data";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = symbolCategories.find((c) => c.slug === slug);
  const categorySymbols = symbols.filter((s) => s.category === slug);
  const sample = categorySymbols.slice(0, 8).map((s) => s.character).join(" ");
  const name = category?.name || slug;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          background: "#ffffff",
          color: "#111827",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "14px",
              background: "#10b981",
              color: "white",
              fontSize: "30px",
              fontWeight: 700,
            }}
          >
            C
          </div>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}>
            CopyPaste Unicode
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "56px", fontWeight: 800, color: "#059669" }}>
            {name} Symbols
          </div>
          <div style={{ fontSize: "52px", letterSpacing: "10px" }}>
            {sample}
          </div>
          <div style={{ fontSize: "24px", color: "#6b7280" }}>
            {category?.description || "Browse and copy symbols instantly."} ({categorySymbols.length} symbols)
          </div>
        </div>

        <div
          style={{
            fontSize: "20px",
            color: "#9ca3af",
            borderTop: "1px solid #e5e7eb",
            paddingTop: "20px",
          }}
        >
          copypaste-unicode.com/symbols/{slug}
        </div>
      </div>
    ),
    { ...size }
  );
}
