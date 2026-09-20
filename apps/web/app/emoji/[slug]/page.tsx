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

// Generate static params for all 9 emoji categories + all 1,914 emoji items
export async function generateStaticParams() {
  const categoryParams = emojiCategories.map((cat) => ({ slug: cat.slug }));
  const emojiParams = getAllEmoji().map((item) => ({ slug: item.slug }));
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
    return <CategoryView category={cat} items={items} />;
  }

  // 2. If emoji matches, render emoji detail SSG view
  const emoji = getEmojiBySlug(slug);
  if (!emoji) notFound();

  const all = getAllEmoji();
  const related = all
    .filter((e) => e.category === emoji.category && e.id !== emoji.id)
    .slice(0, 30);

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: `${emoji.character} ${emoji.name}`,
    description: `The ${emoji.name} emoji (${emoji.character}) categorized under ${emoji.category}.`,
    termCode: emoji.unicode?.join(" ") ?? "",
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Unicode Standard",
    },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* JSON-LD for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
    </div>
  );
}
