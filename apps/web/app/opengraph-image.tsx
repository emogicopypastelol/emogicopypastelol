import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "CopyPaste Unicode - Emoji and Symbols Copy Paste";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "#f8fafc",
          color: "#111827",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
              background: "#10b981",
              color: "white",
              fontSize: "38px",
              fontWeight: 700,
            }}
          >
            C
          </div>
          <div style={{ fontSize: "34px", fontWeight: 700 }}>CopyPaste Unicode</div>
        </div>
        <div style={{ marginTop: "42px", fontSize: "64px", fontWeight: 700 }}>
          Emoji, symbols, and Unicode
        </div>
        <div style={{ marginTop: "18px", fontSize: "30px", color: "#4b5563" }}>
          Find it. Copy it. Paste it anywhere.
        </div>
      </div>
    ),
    { ...size }
  );
}