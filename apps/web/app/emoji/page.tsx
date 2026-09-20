import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { emojiCategories } from "@repo/data";
import { getEmojiByCategory } from "@/lib/data";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Emoji Copy and Paste ❤️ 😀 🔥 — All Emoji Categories",
  description:
    "Browse and copy all emoji organized by category. Smileys, hearts, animals, food, travel, activities, objects, symbols and flags. One click to copy and paste anywhere.",
  openGraph: {
    title: "Emoji Copy and Paste — All Emoji Categories",
    description:
      "Browse and copy all emoji organized by category. Smileys, hearts, animals, food, travel, activities, objects, symbols and flags.",
    type: "website",
    url: "https://copypaste-unicode.com/emoji",
  },
  alternates: {
    canonical: "https://copypaste-unicode.com/emoji",
  },
};

export default function EmojiPage() {
  const categoriesWithPreview = emojiCategories.map((cat) => {
    const items = getEmojiByCategory(cat.slug);
    return {
      ...cat,
      count: items.length,
      preview: items.slice(0, 8),
    };
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6"
      >
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">Emoji</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        Emoji Copy and Paste
      </h1>
      <p className="text-muted-foreground mb-8">
        Browse all emoji organized by category. Select a category below to view and copy all its emoji, or search for any emoji above.
      </p>

      {/* Category Cards with Preview Emojis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoriesWithPreview.map((cat) => (
          <Link
            key={cat.slug}
            href={`/emoji/${cat.slug}`}
            className="flex flex-col justify-between p-5 rounded-xl border border-border hover:border-primary/40 hover:bg-card-hover transition-all group"
          >
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold group-hover:text-primary transition-colors">
                  {cat.name}
                </h2>
                <span className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-0.5 rounded-full">
                  {cat.count}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {cat.description}
              </p>
            </div>

            {/* Preview characters rendered as static HTML */}
            <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-border/50 text-xl emoji-char">
              {cat.preview.map((item) => (
                <span key={item.id} title={item.name}>
                  {item.character}
                </span>
              ))}
              {cat.count > 8 && (
                <span className="text-xs text-muted-foreground font-sans ml-1">
                  +{cat.count - 8}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Ad slot */}
      <div className="mt-8">
        <AdSlot type="banner" />
      </div>

      {/* SEO Content */}
      <section className="mt-12 text-sm text-muted-foreground leading-relaxed space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          About Unicode Emoji
        </h2>
        <p>
          Emoji are standardized pictographs and ideograms used in electronic messages and web pages. They are part of the Unicode Standard, which ensures that an emoji sent from an iPhone or Mac appears correctly on Android devices, Windows PCs, and Linux systems.
        </p>
        <p>
          Our emoji directory organizes all modern emoji into standardized categories: Smileys &amp; Emotion, People &amp; Body, Animals &amp; Nature, Food &amp; Drink, Travel &amp; Places, Activities, Objects, Symbols, and Flags. Click on any category to explore the complete list and copy individual emoji with a single click.
        </p>
      </section>
    </div>
  );
}
