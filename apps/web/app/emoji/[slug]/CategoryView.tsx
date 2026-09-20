import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { emojiCategories } from "@repo/data";
import type { CharacterItem, Category } from "@repo/types";
import { StaticCharacterGrid } from "@/components/StaticCharacterGrid";
import { HomePageClient } from "@/components/HomePage";
import { AdSlot } from "@/components/AdSlot";

interface CategoryViewProps {
  category: Category;
  items: CharacterItem[];
}

export function CategoryView({ category: cat, items }: CategoryViewProps) {
  const relatedCategories = emojiCategories.filter(
    (c) => c.slug !== cat.slug
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Search & Interactive Copy Bar (EmojiTray) */}
      <HomePageClient />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-muted-foreground mt-5 mb-6"
      >
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <Link href="/emoji" className="hover:text-foreground transition-colors">
          Emoji
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">{cat.name}</span>
      </nav>

      {/* Page Header */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{cat.name} Emoji</h1>
      <p className="text-muted-foreground mb-6">
        {cat.description} Click any emoji to copy it instantly. {items.length}{" "}
        emoji available.
      </p>

      {/* Static Emoji Grid — pre-rendered HTML */}
      <StaticCharacterGrid
        items={items}
        gridId={`category-${cat.slug}-grid`}
      />

      {/* Ad Slot */}
      <div className="mt-8">
        <AdSlot type="banner" />
      </div>

      {/* Related Categories */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">
          Other Emoji Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {relatedCategories.map((rc) => (
            <Link
              key={rc.slug}
              href={`/emoji/${rc.slug}`}
              className="p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-card-hover transition-all text-center"
            >
              <span className="text-sm font-medium">{rc.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="mt-10 text-sm text-muted-foreground leading-relaxed space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          About {cat.name} Emoji
        </h2>
        <p>
          The <strong>{cat.name}</strong> category contains {items.length} emoji
          that are part of the Unicode Standard. These emoji work across all
          modern platforms including Apple iOS, macOS, Google Android, Windows,
          and Linux. Click any emoji above to copy it to your clipboard, then
          paste it into any text message, social media post, document, or code
          file.
        </p>
      </section>

      {/* SEO Emoji Table */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-4">
          All {cat.name} Emoji List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4">Emoji</th>
                <th className="text-left py-2 pr-4">Name</th>
                <th className="text-left py-2 pr-4">Unicode</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-border/50">
                  <td className="py-2 pr-4 text-2xl emoji-char">
                    <Link href={`/emoji/${item.slug}`}>
                      {item.character}
                    </Link>
                  </td>
                  <td className="py-2 pr-4">
                    <Link
                      href={`/emoji/${item.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono text-xs">
                    {item.unicode?.join(" ") ?? ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
