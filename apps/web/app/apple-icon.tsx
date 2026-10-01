import { ImageResponse } from "next/og";

// Next.js App Router convention: generates /apple-icon.png
export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#10b981",
          borderRadius: "36px",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "110px",
            fontWeight: 700,
            fontFamily: "sans-serif",
            lineHeight: 1,
          }}
        >
          C
        </div>
      </div>
    ),
    { ...size }
  );
}
