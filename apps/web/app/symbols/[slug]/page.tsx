import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { symbols, symbolCategories } from "@repo/data";
import { StaticCharacterGrid } from "@/components/StaticCharacterGrid";
import { SearchAndTrayBar } from "@/components/SearchAndTrayBar";
import { AdSlot } from "@/components/AdSlot";
import { CategoryIcon } from "@/components/CategoryIcon";
import { SymbolDetailClient } from "./client";

// Generate static params for all symbol categories + all individual symbols
export async function generateStaticParams() {
  const categoryParams = symbolCategories.map((cat) => ({ slug: cat.slug }));
  const symbolParams = symbols.map((s) => ({ slug: s.slug }));

  // Guard: individual symbol slugs must not collide with category slugs
  const categorySlugs = new Set(symbolCategories.map((c) => c.slug));
  for (const sym of symbols) {
    if (categorySlugs.has(sym.slug)) {
      throw new Error(
        `[Routing Invariant] Symbol slug "${sym.slug}" collides with category slug "${sym.slug}". Fix the symbol slug.`
      );
    }
  }

  return [...categoryParams, ...symbolParams];
}

// 404 for any slug not pre-rendered
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // 1. Category route
  const category = symbolCategories.find((c) => c.slug === slug);
  if (category) {
    const categorySymbols = symbols.filter((s) => s.category === slug);
    const preview = categorySymbols
      .slice(0, 6)
      .map((s) => s.character)
      .join(" ");

    const title = `${category.name} ${preview} — Copy and Paste`;
    const description = `${category.description} Browse and copy all ${categorySymbols.length} ${category.name.toLowerCase()}. One click to copy to clipboard.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        url: `https://copypaste-unicode.com/symbols/${slug}`,
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
      alternates: {
        canonical: `https://copypaste-unicode.com/symbols/${slug}`,
      },
    };
  }

  // 2. Individual symbol route
  const symbol = symbols.find((s) => s.slug === slug);
  if (!symbol) return {};

  const unicodeList = symbol.unicode?.join(", ") ?? "";
  const title = `${symbol.character} ${symbol.name} Symbol — Copy & Paste`;
  const description = `Copy and paste the ${symbol.name} symbol (${symbol.character}).${unicodeList ? ` Unicode: ${unicodeList}.` : ""} Category: ${symbol.category}. Works on all devices and platforms.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://copypaste-unicode.com/symbols/${slug}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `https://copypaste-unicode.com/symbols/${slug}`,
    },
  };
}

export default async function SymbolCategoryOrDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ── 1. Category page ──────────────────────────────────────────
  const category = symbolCategories.find((c) => c.slug === slug);
  if (category) {
    const categorySymbols = symbols.filter((s) => s.category === slug);
    const relatedCategories = symbolCategories.filter((c) => c.slug !== slug).slice(0, 4);
    const pageUrl = `https://copypaste-unicode.com/symbols/${slug}`;
    const jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://copypaste-unicode.com/" },
          { "@type": "ListItem", position: 2, name: "Symbols", item: "https://copypaste-unicode.com/symbols" },
          { "@type": "ListItem", position: 3, name: category.name, item: pageUrl },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${category.name} Symbols`,
        numberOfItems: categorySymbols.length,
        itemListElement: categorySymbols.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          url: `https://copypaste-unicode.com/symbols/${item.slug}`,
        })),
      },
    ];

    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        {jsonLd.map((schema, index) => (
          <script
            key={`${schema["@type"]}-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {/* Search & Copy Bar (EmojiTray) */}
        <SearchAndTrayBar />

        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-muted-foreground mt-5 mb-6"
        >
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/symbols" className="hover:text-foreground transition-colors">
            Symbols
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">{category.name}</span>
        </nav>

        {/* Page Header */}
        <div className="flex items-center gap-3.5 mb-2">
          <CategoryIcon
            slug={category.slug}
            alt={category.name}
            size={48}
            className="w-12 h-12 p-1.5 rounded-xl bg-muted/40 border border-border/60"
          />
          <h1 className="text-2xl sm:text-3xl font-bold">{category.name}</h1>
        </div>
        <p className="text-muted-foreground mb-6">
          {category.description} Click any symbol to copy it instantly. {categorySymbols.length} symbols available.
        </p>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          These {category.name.toLowerCase()} symbols are useful in usernames, headings, messages, documents, and code comments. They are Unicode characters, so you can copy them once and paste them across compatible apps and platforms.
        </p>

        {/* Server-Rendered Static Grid — 100% pre-rendered HTML */}
        <StaticCharacterGrid
          items={categorySymbols}
          gridId={`symbols-${category.slug}-grid`}
        />

        {/* Ad Slot */}
        <div className="mt-8">
          <AdSlot type="banner" />
        </div>

        {/* Related Categories */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Related Symbol Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/symbols/${cat.slug}`}
                className="flex items-center gap-2.5 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-card-hover transition-all group"
              >
                <CategoryIcon
                  slug={cat.slug}
                  alt={cat.name}
                  size={24}
                  className="w-6 h-6 object-contain shrink-0"
                />
                <span className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Symbol table for SEO */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-4">All {category.name} Unicode Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4">Symbol</th>
                  <th className="text-left py-2 pr-4">Name</th>
                  <th className="text-left py-2 pr-4">Unicode</th>
                </tr>
              </thead>
              <tbody>
                {categorySymbols.map((item) => (
                  <tr key={item.id} className="border-b border-border/50 hover:bg-muted/40 transition-colors">
                    <td className="py-2 pr-4 text-2xl emoji-char font-normal">
                      <Link href={`/symbols/${item.slug}`} className="hover:text-primary transition-colors" title={`${item.name} — view details`}>
                        {item.character}
                      </Link>
                    </td>
                    <td className="py-2 pr-4 font-medium">
                      <Link href={`/symbols/${item.slug}`} className="hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground font-mono text-xs">
                      {item.unicode?.join(" ") ?? "—"}
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

  // ── 2. Individual symbol detail page ─────────────────────────
  const symbol = symbols.find((s) => s.slug === slug);
  if (!symbol) notFound();

  const symbolCategory = symbolCategories.find((c) => c.slug === symbol.category);
  const categoryName = symbolCategory?.name ?? symbol.category.replace(/-/g, " ");

  // Related: same category, excluding self, up to 30
  const related = symbols
    .filter((s) => s.category === symbol.category && s.slug !== symbol.slug)
    .slice(0, 30);

  const unicodeStr = symbol.unicode?.join(" ") ?? "";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://copypaste-unicode.com/" },
        { "@type": "ListItem", position: 2, name: "Symbols", item: "https://copypaste-unicode.com/symbols" },
        {
          "@type": "ListItem",
          position: 3,
          name: categoryName,
          item: `https://copypaste-unicode.com/symbols/${symbol.category}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: symbol.name,
          item: `https://copypaste-unicode.com/symbols/${symbol.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: `${symbol.character} ${symbol.name}`,
      description: `The ${symbol.name} symbol (${symbol.character}) is a Unicode text character categorized under ${categoryName}.`,
      termCode: unicodeStr,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "Unicode Standard",
      },
    },
  ];

  return (
    <div className="content-shell mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      {/* JSON-LD for rich snippets */}
      {jsonLd.map((schema, index) => (
        <script
          key={`${schema["@type"]}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6"
      >
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <Link href="/symbols" className="hover:text-foreground transition-colors">
          Symbols
        </Link>
        <ChevronRight size={12} />
        <Link
          href={`/symbols/${symbol.category}`}
          className="hover:text-foreground transition-colors capitalize"
        >
          {categoryName}
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">{symbol.name}</span>
      </nav>

      {/* Main Interactive Detail Client */}
      <SymbolDetailClient symbol={symbol} />

      {/* Related Symbols — Server-Rendered Static Grid */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-3">Related {categoryName}</h2>
          <StaticCharacterGrid items={related} gridId="related-symbols-grid" />
        </section>
      )}

      {/* Ad slot */}
      <div className="mt-10">
        <AdSlot type="banner" />
      </div>

      {/* SEO Explanatory Content */}
      <section className="mt-10 text-sm text-muted-foreground leading-relaxed space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          About the {symbol.name} ({symbol.character}) Symbol
        </h2>
        <p>
          The <strong>{symbol.name}</strong> ({symbol.character}) is a Unicode text symbol
          {unicodeStr ? ` with code point ${unicodeStr}` : ""}, classified under{" "}
          {categoryName}. Unlike emoji, this is a plain text character that renders consistently
          in any font and at any size across all operating systems, browsers, and apps.
        </p>
        <p>
          To copy this symbol, click the green &ldquo;Copy Symbol&rdquo; button above or click
          directly on the character. You can then paste it anywhere — usernames, social media
          bios, documents, code comments, or any plain-text field.
        </p>
        {symbol.htmlEntity && (
          <p>
            In HTML, you can also use the entity <code>{symbol.htmlEntity}</code> to render
            this character.
          </p>
        )}
      </section>

      {/* Internal cross-links */}
      <nav className="mt-10 pt-6 border-t border-border" aria-label="Explore more character categories">
        <h2 className="text-base font-semibold text-foreground mb-3">Explore More</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          <Link href="/symbols/hearts" className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border hover:border-primary/40 hover:bg-card-hover transition-all text-sm font-medium">
            <span className="emoji-char text-lg">♥</span> Heart Symbols
          </Link>
          <Link href="/symbols/stars" className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border hover:border-primary/40 hover:bg-card-hover transition-all text-sm font-medium">
            <span className="emoji-char text-lg">★</span> Star Symbols
          </Link>
          <Link href="/symbols/arrows" className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border hover:border-primary/40 hover:bg-card-hover transition-all text-sm font-medium">
            <span className="emoji-char text-lg">→</span> Arrow Symbols
          </Link>
          <Link href="/kaomoji" className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border hover:border-primary/40 hover:bg-card-hover transition-all text-sm font-medium">
            <span className="text-base">ʕ•ᴥ•ʔ</span> Kaomoji
          </Link>
          <Link href="/symbols" className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border hover:border-primary/40 hover:bg-card-hover transition-all text-sm font-medium">
            <span className="emoji-char text-lg">∑</span> All Symbols
          </Link>
          <Link href="/emoji" className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border hover:border-primary/40 hover:bg-card-hover transition-all text-sm font-medium">
            <span className="emoji-char text-lg">😀</span> All Emoji
          </Link>
        </div>
      </nav>
    </div>
  );
}
