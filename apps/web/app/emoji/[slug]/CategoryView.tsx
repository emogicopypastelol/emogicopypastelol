import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { emojiCategories } from "@repo/data";
import type { CharacterItem, Category } from "@repo/types";
import { CategoryIcon } from "@/components/CategoryIcon";
import { StaticCharacterGrid } from "@/components/StaticCharacterGrid";
import { HomePageClient } from "@/components/HomePage";
import { AdSlot } from "@/components/AdSlot";

interface CategoryViewProps {
  category: Category;
  items: CharacterItem[];
}

const CATEGORY_GUIDANCE: Record<string, string> = {
  "smileys-emotion": "Use these faces to express mood, reactions, humor, and everyday conversation in messages and social posts.",
  "people-body": "These people and body emoji help communicate gestures, identity, accessibility, activities, and human expression.",
  "animals-nature": "Find animals, plants, weather, and natural-world emoji for captions, stories, status updates, and messages.",
  "food-drink": "Use food and drink emoji to describe meals, ingredients, restaurants, celebrations, and daily routines.",
  "travel-places": "These travel and place emoji represent transport, landmarks, maps, buildings, and destinations.",
  activities: "Browse activity emoji for sports, hobbies, events, entertainment, games, and celebrations.",
  objects: "Object emoji cover tools, technology, clothing, household items, gifts, and useful everyday things.",
  symbols: "Use these emoji symbols for signs, numbers, marks, shapes, and visual emphasis in digital text.",
  flags: "Browse national and regional flag emoji for locations, languages, events, travel, and international conversations.",
};

export function CategoryView({ category: cat, items }: CategoryViewProps) {
  const relatedCategories = emojiCategories.filter(
    (c) => c.slug !== cat.slug
  );
  const guidance = CATEGORY_GUIDANCE[cat.slug] ?? `Browse ${cat.name.toLowerCase()} emoji for messages, captions, documents, and creative text.`;
  const pageUrl = `https://copypaste-unicode.com/emoji/${cat.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://copypaste-unicode.com/" },
        { "@type": "ListItem", position: 2, name: "Emoji", item: "https://copypaste-unicode.com/emoji" },
        { "@type": "ListItem", position: 3, name: cat.name, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${cat.name} Emoji`,
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: `https://copypaste-unicode.com/emoji/${item.slug}`,
      })),
    },
  ];

  return (
    <div className="content-shell mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      {jsonLd.map((schema, index) => (
        <script
          key={`${schema["@type"]}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
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
      <header className="category-hero mt-6 mb-6 flex items-center gap-3.5 rounded-2xl border border-border bg-card px-4 py-4 sm:px-5">
        <CategoryIcon
          slug={cat.slug}
          alt={cat.name}
          size={48}
          className="w-12 h-12 p-1.5 rounded-xl bg-muted/40 border border-border/60"
        />
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{cat.name} Emoji</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {cat.description} Click any emoji to copy it instantly. {items.length} emoji available.
          </p>
        </div>
      </header>

      {/* Static Emoji Grid — pre-rendered HTML */}
      <section className="content-section" aria-labelledby="emoji-gallery-title">
        <div className="section-heading">
          <div>
            <h2 id="emoji-gallery-title">Browse {cat.name} emoji</h2>
            <p>Choose a character to copy it to your clipboard.</p>
          </div>
          <span className="section-count">{items.length} characters</span>
        </div>
        <div className="emoji-gallery">
          <StaticCharacterGrid
            items={items}
            gridId={`category-${cat.slug}-grid`}
          />
        </div>
      </section>

      {/* Ad Slot */}
      <div className="mt-8">
        <AdSlot type="banner" />
      </div>

      {/* Related Categories */}
      <section className="content-section mt-8">
        <div className="section-heading">
          <div>
            <h2>Other Emoji Categories</h2>
            <p>Explore the rest of the emoji collection.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {relatedCategories.map((rc) => (
            <Link
              key={rc.slug}
              href={`/emoji/${rc.slug}`}
              className="flex items-center gap-2.5 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-card-hover transition-all group"
            >
              <CategoryIcon
                slug={rc.slug}
                alt={rc.name}
                size={24}
                className="w-6 h-6 object-contain shrink-0"
              />
              <span className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                {rc.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="content-section mt-8 text-sm text-muted-foreground leading-relaxed space-y-3">
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
          <p>{guidance} Unicode characters may look slightly different across platforms, but the underlying character remains copyable and interoperable.</p>
      </section>

      {/* SEO Emoji Table */}
      <section className="content-section mt-8">
        <div className="section-heading">
          <div>
            <h2>
          All {cat.name} Emoji List
            </h2>
            <p>Names and Unicode code points for every character in this category.</p>
          </div>
        </div>
        <div className="emoji-table-wrap overflow-x-auto">
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
