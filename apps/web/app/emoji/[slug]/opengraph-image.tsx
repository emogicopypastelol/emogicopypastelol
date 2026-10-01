import { ImageResponse } from "next/og";
import { emojiCategories } from "@repo/data";
import { getEmojiBySlug, getEmojiByCategory } from "@/lib/data";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

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

  // 1. Check if category route
  const category = emojiCategories.find((c) => c.slug === slug);
  if (category) {
    const items = getEmojiByCategory(slug);
    const sample = items.slice(0, 7).map((i) => i.character).join(" ");
    const categoryTitle = `${category.name} Emojis`;
    const subtitle = `${category.description} (${items.length} emojis)`;

    return new ImageResponse(
      (
        <div style={sharedWrapper}>
          {Logo}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", fontSize: "56px", fontWeight: 800, color: "#059669" }}>
              {categoryTitle}
            </div>
            <div style={{ display: "flex", fontSize: "52px", letterSpacing: "8px" }}>
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
            {`copypaste-unicode.com/emoji/${slug}`}
          </div>
        </div>
      ),
      { ...size }
    );
  }

  // 2. Individual Emoji Detail route
  const emoji = getEmojiBySlug(slug);
  const char = emoji?.character || "✨";
  const name = emoji?.name || slug;
  const unicode = emoji?.unicode?.join(" ") || "";
  const emojiTitle = `${char} Emoji — Copy & Paste`;

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
              {emojiTitle}
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
          {`copypaste-unicode.com/emoji/${slug}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
