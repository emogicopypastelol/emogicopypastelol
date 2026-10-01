import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { kaomojiCategories, kaomoji } from "@repo/data";
import { CategoryIcon } from "@/components/CategoryIcon";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Kaomoji Copy and Paste ¯\\_(ツ)_/¯ (◕‿◕✿) (╯°□°)╯ — Japanese Emoticons",
  description:
    "Browse and copy cute Japanese kaomoji emoticons. Shrug, happy, love, cute, sad, angry table flip, animal bears, and cool text faces. One click to copy and paste.",
  openGraph: {
    title: "Kaomoji Copy and Paste — Japanese Emoticons",
    description:
      "Browse and copy cute Japanese kaomoji emoticons. Shrug, happy, love, cute, sad, angry table flip, animal bears, and cool text faces.",
    type: "website",
    url: "https://copypaste-unicode.com/kaomoji",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaomoji Copy and Paste — Japanese Emoticons",
    description:
      "Browse and copy cute Japanese kaomoji emoticons. Shrug, happy, love, cute, sad, angry table flip, animal bears, and cool text faces.",
  },
  alternates: {
    canonical: "https://copypaste-unicode.com/kaomoji",
  },
};

export default function KaomojiIndexPage() {
  const categoriesWithPreview = kaomojiCategories.map((cat) => {
    const items = kaomoji.filter((k) => k.category === cat.slug);
    return {
      ...cat,
      count: items.length,
      preview: items.slice(0, 4),
    };
  });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://copypaste-unicode.com/" },
        { "@type": "ListItem", position: 2, name: "Kaomoji", item: "https://copypaste-unicode.com/kaomoji" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Kaomoji Categories",
      numberOfItems: kaomojiCategories.length,
      itemListElement: kaomojiCategories.map((cat, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: cat.name,
        url: `https://copypaste-unicode.com/kaomoji/${cat.slug}`,
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
        <span className="text-foreground font-medium">Kaomoji</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        Kaomoji Copy and Paste ( Japanese Emoticons )
      </h1>
      <p className="text-muted-foreground mb-8">
        Browse authentic Japanese text emoticons (顔文字) organized by emotion and style.
        Click any category to explore and copy full sets, or click any face to copy instantly.
      </p>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {categoriesWithPreview.map((cat) => (
          <Link
            key={cat.slug}
            href={`/kaomoji/${cat.slug}`}
            className="flex flex-col justify-between p-5 rounded-xl border border-border hover:border-primary/40 hover:bg-card-hover transition-all group shadow-sm hover:shadow"
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
                    <span className="text-xs text-muted-foreground font-mono bg-muted/60 px-2 py-0.5 rounded-full shrink-0 ml-2">
                      {cat.count}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Preview kaomojis */}
            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-border/50 text-sm">
              {cat.preview.map((item) => (
                <span
                  key={item.id}
                  className="px-2.5 py-1 rounded-md bg-secondary/80 text-foreground font-sans text-xs border border-border/60"
                  title={item.name}
                >
                  {item.character}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Ad slot */}
      <div className="mt-8">
        <AdSlot type="banner" />
      </div>

      {/* SEO Explanatory Content */}
      <section className="mt-12 text-sm text-muted-foreground leading-relaxed space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          What are Kaomoji?
        </h2>
        <p>
          <strong>Kaomoji (顔文字)</strong> are popular Japanese emoticons made of Japanese characters and grammar punctuations. Unlike western emoticons which are read sideways (e.g. <code>:)</code> or <code>:D</code>), kaomoji are designed to be viewed upright and read without tilting your head.
        </p>
        <p>
          Kaomoji convey a vast range of expressions, from cute kawaii gestures like <code>(◕‿◕✿)</code> to classic internet memes like the shrug <code>¯\_(ツ)_/¯</code> and table flip <code>(╯°□°)╯︵ ┻━┻</code>.
        </p>
      </section>
    </div>
  );
}
