import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { kaomoji, kaomojiCategories } from "@repo/data";
import { StaticCharacterGrid } from "@/components/StaticCharacterGrid";
import { HomePageClient } from "@/components/HomePage";
import { AdSlot } from "@/components/AdSlot";
import { CategoryIcon } from "@/components/CategoryIcon";

// Generate static params for all 8 kaomoji categories
export async function generateStaticParams() {
  return kaomojiCategories.map((cat) => ({ slug: cat.slug }));
}

export const dynamicParams = false;

// Generate metadata per category
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = kaomojiCategories.find((c) => c.slug === slug);
  if (!category) return {};

  const categoryKaomoji = kaomoji.filter((k) => k.category === slug);
  const preview = categoryKaomoji
    .slice(0, 3)
    .map((k) => k.character)
    .join("  ");

  const title = `${category.name} Kaomoji ${preview} — Copy and Paste`;
  const description = `${category.description}. Browse all ${categoryKaomoji.length} ${category.name.toLowerCase()} Japanese emoticons. One click to copy to clipboard.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://copypaste-unicode.com/kaomoji/${slug}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `https://copypaste-unicode.com/kaomoji/${slug}`,
    },
  };
}

export default async function KaomojiCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = kaomojiCategories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryItems = kaomoji.filter((k) => k.category === slug);
  const relatedCategories = kaomojiCategories.filter((c) => c.slug !== slug).slice(0, 4);
  const pageUrl = `https://copypaste-unicode.com/kaomoji/${slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://copypaste-unicode.com/" },
        { "@type": "ListItem", position: 2, name: "Kaomoji", item: "https://copypaste-unicode.com/kaomoji" },
        { "@type": "ListItem", position: 3, name: category.name, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${category.name} Kaomoji`,
      numberOfItems: categoryItems.length,
      itemListElement: categoryItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
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
        <Link href="/kaomoji" className="hover:text-foreground transition-colors">
          Kaomoji
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
        <h1 className="text-2xl sm:text-3xl font-bold">{category.name} Kaomoji</h1>
      </div>
      <p className="text-muted-foreground mb-6">
        {category.description}. Click any kaomoji to copy it to your clipboard instantly. {categoryItems.length} emoticons available.
      </p>
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        Kaomoji are text-based Japanese emoticons that work well in chats, profiles, captions, and notes. Copy a favorite below and keep the punctuation exactly as shown for the intended expression.
      </p>

      {/* Server-Rendered Static Grid — 100% pre-rendered HTML */}
      <StaticCharacterGrid
        items={categoryItems}
        gridId={`kaomoji-${category.slug}-grid`}
        isKaomoji={true}
      />

      {/* Ad Slot */}
      <div className="mt-8">
        <AdSlot type="banner" />
      </div>

      {/* Related Categories */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Other Kaomoji Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {relatedCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kaomoji/${cat.slug}`}
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

      {/* Kaomoji list table for SEO */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">All {category.name} Text Emoticons</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4">Kaomoji</th>
                <th className="text-left py-2 pr-4">Name</th>
                <th className="text-left py-2 pr-4">Keywords</th>
              </tr>
            </thead>
            <tbody>
              {categoryItems.map((item) => (
                <tr key={item.id} className="border-b border-border/50 hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 pr-4 text-base font-mono font-medium">{item.character}</td>
                  <td className="py-2.5 pr-4">{item.name}</td>
                  <td className="py-2.5 pr-4 text-muted-foreground text-xs">
                    {item.keywords.slice(0, 4).join(", ")}
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
