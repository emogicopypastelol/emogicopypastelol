import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { symbolCategories, symbols } from "@repo/data";
import { CategoryIcon } from "@/components/CategoryIcon";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Symbols Copy and Paste ♥ ★ → ∞ — All Symbols",
  description:
    "Copy and paste symbols including hearts, stars, arrows, math symbols, currency signs, shapes, music notes, and more. One click to copy.",
  openGraph: {
    title: "Symbols Copy and Paste — All Symbols",
    description:
      "Copy and paste hearts, stars, arrows, math symbols, currency signs, shapes, music notes, and more.",
    type: "website",
    url: "https://copypaste-unicode.com/symbols",
  },
  twitter: {
    card: "summary_large_image",
    title: "Symbols Copy and Paste — All Symbols",
    description:
      "Copy and paste hearts, stars, arrows, math symbols, currency signs, shapes, music notes, and more.",
  },
  alternates: {
    canonical: "https://copypaste-unicode.com/symbols",
  },
};

export default function SymbolsPage() {
  const categoriesWithPreview = symbolCategories.map((cat) => {
    const items = symbols.filter((s) => s.category === cat.slug);
    return {
      ...cat,
      count: items.length,
      preview: items.slice(0, 8),
    };
  });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://copypaste-unicode.com/" },
        { "@type": "ListItem", position: 2, name: "Symbols", item: "https://copypaste-unicode.com/symbols" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Symbol Categories",
      numberOfItems: symbolCategories.length,
      itemListElement: symbolCategories.map((cat, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: cat.name,
        url: `https://copypaste-unicode.com/symbols/${cat.slug}`,
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

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6"
      >
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">Symbols</span>
      </nav>

      <h1 className="text-2xl font-bold mb-2">Symbols Copy and Paste</h1>
      <p className="text-muted-foreground mb-8">
        Browse all symbols by category. Click any symbol to copy it instantly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoriesWithPreview.map((cat) => (
          <Link
            key={cat.slug}
            href={`/symbols/${cat.slug}`}
            className="flex flex-col justify-between p-5 rounded-xl border border-border hover:border-primary/40 hover:bg-card-hover transition-all group"
          >
            <div>
              <div className="flex items-start gap-3.5">
                <CategoryIcon
                  slug={cat.slug}
                  alt={cat.name}
                  size={44}
                  className="w-11 h-11 p-1.5 rounded-xl bg-muted/40 border border-border/60 group-hover:scale-105 group-hover:border-primary/40 transition-all"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold group-hover:text-primary transition-colors truncate">
                      {cat.name}
                    </h2>
                    <span className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-0.5 rounded-full shrink-0 ml-2">
                      {cat.count}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Preview characters rendered as static HTML */}
            <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-border/50 text-xl">
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
          About Unicode Symbols
        </h2>
        <p>
          Unicode symbols are special text characters that go beyond the standard alphabet and numbers. They include hearts (♥), stars (★), arrows (→), mathematical operators (∑ ∫ √), currency signs ($ € £ ¥), shapes (■ ● ▲), music notes (♪ ♫), and hundreds more.
        </p>
        <p>
          Unlike emoji, which are colorful images, symbols are text-based glyphs that render consistently in any font and at any size. They are ideal for headings, usernames, social media bios, documents, spreadsheets, code comments, and any context where you need a compact, universal pictograph that works across all platforms and devices.
        </p>
      </section>
    </div>
  );
}
