import type { Metadata } from "next";
import { getAllEmoji } from "@/lib/data";
import { StaticCharacterGrid } from "@/components/StaticCharacterGrid";
import { EmojiTray } from "@/components/EmojiTray";
import { AdSlot } from "@/components/AdSlot";
import { RemainingEmojiSection } from "@/components/RemainingEmojiSection";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://copypaste-unicode.com",
  },
};

/** Number of popular emoji rendered in initial SSR HTML for fast LCP & small payload */
const INITIAL_COUNT = 120;

export default function Page() {
  const allEmoji = getAllEmoji();
  const initialEmoji = allEmoji.slice(0, INITIAL_COUNT);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Popular Emoji",
      description:
        "Browse and copy over 1,800 emoji, symbols, and Unicode characters. One click to copy and paste anywhere.",
      numberOfItems: allEmoji.length,
      itemListElement: initialEmoji.slice(0, 20).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: `https://copypaste-unicode.com/emoji/${item.slug}`,
      })),
    },
  ];

  return (
    <div className="homepage-layout">
      {/* JSON-LD structured data for rich snippets */}
      {jsonLd.map((schema, index) => (
        <script
          key={`${schema["@type"]}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Left Skyscraper Ad Space */}
      <aside className="homepage-sidebar hidden lg:block sticky top-20">
        <AdSlot type="sidebar" />
      </aside>

      {/* Centered Main Content Area */}
      <div className="homepage-center">
        {/* Page Heading — keyword-optimized for emoji + symbols + unicode */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Emoji, Symbols &amp; Unicode — Copy and Paste
        </h1>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Click any emoji to copy it to your clipboard. Build combos with the tray below.
        </p>

        {/* Copy Bar / Emoji Tray (Floatable / Sticky) */}
        <EmojiTray />

        {/* Initial Emojis — Server-Rendered Static Grid (fast LCP, minimal HTML) */}
        <section className="pt-[16px]">
          <StaticCharacterGrid items={initialEmoji} gridId="all-emoji-grid" />
        </section>

        {/* Remaining Emojis — Progressively loaded on scroll/click */}
        <RemainingEmojiSection initialCount={INITIAL_COUNT} />

        {/* Bottom Banner Ad Slot */}
        <div className="mt-8">
          <AdSlot type="banner" />
        </div>
      </div>

      {/* Right Skyscraper Ad Space */}
      <aside className="homepage-sidebar hidden lg:block sticky top-20">
        <AdSlot type="sidebar" />
      </aside>
    </div>
  );
}

