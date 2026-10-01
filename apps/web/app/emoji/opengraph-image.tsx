import { ImageResponse } from "next/og";
import { emojiCategories } from "@repo/data";

export const runtime = "nodejs";
export const alt = "Emoji — Copy and Paste";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const categoryNames = emojiCategories.map((c) => c.name).slice(0, 9);
  const subtitle = `${categoryNames.join(" · ")} — 1,898 emoji, one click to copy.`;

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
          <div style={{ display: "flex", fontSize: "64px", fontWeight: 800, color: "#059669" }}>
            Emoji Copy &amp; Paste
          </div>
          <div style={{ display: "flex", fontSize: "52px", letterSpacing: "8px" }}>
            😀 ❤️ 🎉 🔥 👍 ✨ 🌟 🎊
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
          copypaste-unicode.com/emoji
        </div>
      </div>
    ),
    { ...size }
  );
}
