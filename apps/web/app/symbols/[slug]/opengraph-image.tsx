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

  // Shared logo block used in both variants
  const Logo = (
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
  );

  const sharedWrapper = {
    width: "100%",
    height: "100%",
    display: "flex" as const,
    flexDirection: "column" as const,
    justifyContent: "space-between" as const,
    padding: "60px 70px",
    background: "#ffffff",
    color: "#111827",
    fontFamily: "sans-serif",
  };

  // 1. Symbol category page OG image
  const category = symbolCategories.find((c) => c.slug === slug);
  if (category) {
    const categorySymbols = symbols.filter((s) => s.category === slug);
    const sample = categorySymbols.slice(0, 8).map((s) => s.character).join(" ");
    const subtitle = `${category.description || "Browse and copy symbols instantly."} (${categorySymbols.length} symbols)`;

    return new ImageResponse(
      (
        <div style={sharedWrapper}>
          {Logo}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", fontSize: "56px", fontWeight: 800, color: "#059669" }}>
              {category.name}
            </div>
            <div style={{ display: "flex", fontSize: "52px", letterSpacing: "10px" }}>
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
            {`copypaste-unicode.com/symbols/${slug}`}
          </div>
        </div>
      ),
      { ...size }
    );
  }

  // 2. Individual symbol detail OG image
  const symbol = symbols.find((s) => s.slug === slug);
  const char = symbol?.character || "∑";
  const name = symbol?.name || slug;
  const unicode = symbol?.unicode?.join(" ") || "";
  const symbolHeading = `${char} Symbol — Copy & Paste`;

  return new ImageResponse(
    (
      <div style={sharedWrapper}>
        {Logo}
        <div style={{ display: "flex", alignItems: "center", gap: "48px" }}>
          <div
            style={{
              fontSize: "128px",
              lineHeight: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "160px",
              height: "160px",
              background: "#f0fdf4",
              borderRadius: "32px",
              border: "2px solid #bbf7d0",
            }}
          >
            {char}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", fontSize: "52px", fontWeight: 800, color: "#111827" }}>
              {name}
            </div>
            <div style={{ display: "flex", fontSize: "26px", color: "#059669", fontWeight: 600 }}>
              {symbolHeading}
            </div>
            {unicode ? (
              <div style={{ display: "flex", fontSize: "20px", color: "#6b7280", fontFamily: "monospace" }}>
                {`Unicode: ${unicode}`}
              </div>
            ) : null}
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
          {`copypaste-unicode.com/symbols/${slug}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
