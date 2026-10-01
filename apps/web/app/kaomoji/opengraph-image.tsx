import { ImageResponse } from "next/og";
import { kaomojiCategories, kaomoji } from "@repo/data";

export const runtime = "nodejs";
export const alt = "Kaomoji — Japanese Text Emoticons Copy and Paste";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const samples = kaomoji.slice(0, 4).map((k) => k.character).join("   ");
  const categoryNames = kaomojiCategories.map((c) => c.name);
  const subtitle = `${categoryNames.slice(0, 6).join(" · ")} — 89 Japanese text emoticons.`;

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
        {/* Logo */}
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
          <div style={{ display: "flex", fontSize: "28px", fontWeight: 700, color: "#111827" }}>
            CopyPaste Unicode
          </div>
        </div>

        {/* Main */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", fontSize: "60px", fontWeight: 800, color: "#059669" }}>
            Kaomoji Copy &amp; Paste
          </div>
          <div style={{ display: "flex", fontSize: "36px", color: "#111827", fontWeight: 500 }}>
            {samples}
          </div>
          <div style={{ display: "flex", fontSize: "24px", color: "#6b7280" }}>
            {subtitle}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            fontSize: "20px",
            color: "#9ca3af",
            borderTop: "1px solid #e5e7eb",
            paddingTop: "20px",
          }}
        >
          copypaste-unicode.com/kaomoji
        </div>
      </div>
    ),
    { ...size }
  );
}
