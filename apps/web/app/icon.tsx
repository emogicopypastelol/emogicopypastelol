import { ImageResponse } from "next/og";

// Next.js App Router convention: generates /icon.png (192×192 for manifest + PWA)
export const runtime = "nodejs";
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "38px",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "120px",
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
