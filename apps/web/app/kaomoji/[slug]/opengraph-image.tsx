import { ImageResponse } from "next/og";
import { kaomojiCategories, kaomoji } from "@repo/data";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = kaomojiCategories.find((c) => c.slug === slug);
  const categoryKaomoji = kaomoji.filter((k) => k.category === slug);
  const sample = categoryKaomoji.slice(0, 3).map((k) => k.character).join("   ");
  const name = category?.name || slug;
  const title = `${name} Kaomoji`;
  const subtitle = `${category?.description || "Browse and copy Japanese emoticons."} (${categoryKaomoji.length} emoticons)`;

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
          <div style={{ display: "flex", fontSize: "28px", fontWeight: 700, color: "#111827" }}>
            CopyPaste Unicode
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", fontSize: "56px", fontWeight: 800, color: "#059669" }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: "38px", color: "#111827", fontWeight: 500 }}>
            {sample}
          </div>
          <div style={{ display: "flex", fontSize: "24px", color: "#6b7280" }}>
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "20px",
            color: "#9ca3af",
            borderTop: "1px solid #e5e7eb",
            paddingTop: "20px",
          }}
        >
          {`copypaste-unicode.com/kaomoji/${slug}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
