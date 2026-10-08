import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "CopyPaste Unicode — Search and copy emoji, symbols, and Unicode characters";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  // Curated grid of popular characters shown on the root OG image
  const sampleChars = ["😀", "❤️", "★", "→", "∞", "✓", "🎉", "♥", "©", "€", "√", "☀"];

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
        {/* Logo row */}
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

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", fontSize: "60px", fontWeight: 800, color: "#059669", lineHeight: 1.1 }}>
            Emoji, Symbols &amp; Unicode
          </div>

          {/* Character grid */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              fontSize: "44px",
              letterSpacing: "4px",
            }}
          >
            {sampleChars.map((char) => (
              <div
                key={char}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "68px",
                  height: "68px",
                  background: "#f0fdf4",
                  borderRadius: "14px",
                }}
              >
                {char}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", fontSize: "26px", color: "#4b5563" }}>
            Find it. Copy it. Paste it anywhere. — Free, no sign-up.
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
          emogilol.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}