import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { emojiCategories } from "@repo/data";
import { getAllEmoji, getEmojiBySlug, getEmojiByCategory } from "@/lib/data";
import { EmojiDetailClient } from "./client";
import { StaticCharacterGrid } from "@/components/StaticCharacterGrid";
import { AdSlot } from "@/components/AdSlot";
import { CategoryView } from "./CategoryView";
import { EMOJI_CATEGORY_PAGE_SIZE } from "@/lib/emojiPagination";

// Generate static params for all 9 emoji categories + all 1,914 emoji items
export async function generateStaticParams() {
  const categorySlugs = new Set(emojiCategories.map((cat) => cat.slug));
  const categoryParams = emojiCategories.map((cat) => ({ slug: cat.slug }));

  // Invariant guard: ensure no emoji slug silently conflicts with an emoji category slug
  const emojiParams: { slug: string }[] = [];
  for (const item of getAllEmoji()) {
    if (categorySlugs.has(item.slug)) {
      throw new Error(
        `[Routing Invariant] Collision detected: emoji slug "${item.slug}" conflicts with category slug "${item.slug}".`
      );
    }
    emojiParams.push({ slug: item.slug });
  }

  return [...categoryParams, ...emojiParams];
}

// 404 for any slug not pre-rendered
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // 1. Check if this is a category route
  const cat = emojiCategories.find((c) => c.slug === slug);
  if (cat) {
    const items = getEmojiByCategory(slug);
    const preview = items
      .slice(0, 8)
      .map((e) => e.character)
      .join(" ");

    const title = `${cat.name} Emoji ${preview} — Copy and Paste`;
    const description = `${cat.description} Browse all ${items.length} ${cat.name.toLowerCase()} emoji. Click to copy and paste anywhere.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        url: `https://copypaste-unicode.com/emoji/${slug}`,
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
      alternates: {
        canonical: `https://copypaste-unicode.com/emoji/${slug}`,
      },
    };
  }

  // 2. Check if this is an individual emoji route
  const emoji = getEmojiBySlug(slug);
  if (!emoji) return {};

  const title = `${emoji.character} ${emoji.name} Emoji — Copy & Paste`;
  const unicodeList = emoji.unicode?.join(", ") ?? "";
  const description = `Copy and paste the ${emoji.name} emoji (${emoji.character}).${unicodeList ? ` Unicode code point: ${unicodeList},` : ""} category: ${emoji.category}. Works across iOS, Android, macOS, and Windows.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://copypaste-unicode.com/emoji/${slug}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `https://copypaste-unicode.com/emoji/${slug}`,
    },
  };
}

export default async function EmojiOrCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. If category matches, render category SSG view
  const cat = emojiCategories.find((c) => c.slug === slug);
  if (cat) {
    const items = getEmojiByCategory(slug);
    return (
      <CategoryView
        category={cat}
        items={items.slice(0, EMOJI_CATEGORY_PAGE_SIZE)}
        totalCount={items.length}
        currentPage={1}
        totalPages={Math.ceil(items.length / EMOJI_CATEGORY_PAGE_SIZE)}
        startIndex={0}
      />
    );
  }

  // 2. If emoji matches, render emoji detail SSG view
  const emoji = getEmojiBySlug(slug);
  if (!emoji) notFound();

  const all = getAllEmoji();
  const related = all
    .filter((e) => e.category === emoji.category && e.id !== emoji.id)
    .slice(0, 30);

  // Schema.org JSON-LD
  const emojiCategory = emojiCategories.find((c) => c.slug === emoji.category);
  const categoryName = emojiCategory?.name ?? emoji.category.replace(/-/g, " ");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://copypaste-unicode.com/" },
        { "@type": "ListItem", position: 2, name: "Emoji", item: "https://copypaste-unicode.com/emoji" },
        {
          "@type": "ListItem",
          position: 3,
          name: categoryName,
          item: `https://copypaste-unicode.com/emoji/${emoji.category}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: emoji.name,
          item: `https://copypaste-unicode.com/emoji/${emoji.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: `${emoji.character} ${emoji.name}`,
      description: `The ${emoji.name} emoji (${emoji.character}) categorized under ${emoji.category}.`,
      termCode: emoji.unicode?.join(" ") ?? "",
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "Unicode Standard",
      },
    },
  ];

  return (
    <div className="content-shell mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
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
        <Link href="/emoji" className="hover:text-foreground transition-colors">
          Emoji
        </Link>
        <ChevronRight size={12} />
        <Link
          href={`/emoji/${emoji.category}`}
          className="hover:text-foreground transition-colors capitalize"
        >
          {emoji.category.replace(/-/g, " ")}
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">{emoji.name}</span>
      </nav>

      {/* Main Interactive Detail Client */}
      <EmojiDetailClient emoji={emoji} />

      {/* Related Emojis — Server-Rendered Static Grid */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-3">Related Emojis</h2>
          <StaticCharacterGrid items={related} gridId="related-emoji-grid" />
        </section>
      )}

      {/* Ad slot */}
      <div className="mt-10">
        <AdSlot type="banner" />
      </div>

      {/* SEO Explanatory Content */}
      <section className="mt-10 text-sm text-muted-foreground leading-relaxed space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          About the {emoji.name} ({emoji.character}) Emoji
        </h2>
        <p>
          The <strong>{emoji.name}</strong> ({emoji.character}) was approved as part of Unicode and can be used on all major operating systems and web browsers including Apple iOS, macOS, Google Android, Windows, and Linux.
        </p>
        <p>
          To copy this emoji, click the green &ldquo;Copy Emoji&rdquo; button above or tap directly on the character. You can then paste it into any text message, social media post (X / Twitter, Instagram, TikTok), document, or code file.
        </p>
      </section>

      {/* Internal Cross-Links — distributes link equity to symbols & kaomoji sections */}
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
