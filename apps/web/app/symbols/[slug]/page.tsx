import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { symbols } from "@repo/data";
import { symbolCategories } from "@repo/data";
import { SymbolCategoryClient } from "./client";
import { HomePageClient } from "@/components/HomePage";
import Link from "next/link";

// Generate static params for all symbol categories
export async function generateStaticParams() {
  return symbolCategories.map((cat) => ({ slug: cat.slug }));
}

// Generate metadata per category
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = symbolCategories.find((c) => c.slug === slug);
  if (!category) return {};

  const categorySymbols = symbols.filter((s) => s.category === slug);
  const preview = categorySymbols
    .slice(0, 6)
    .map((s) => s.character)
    .join(" ");

  return {
    title: `${category.name} ${preview} — Copy and Paste`,
    description: category.description,
  };
}

export default async function SymbolCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = symbolCategories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categorySymbols = symbols.filter((s) => s.category === slug);

  // Find related categories (exclude current)
  const relatedCategories = symbolCategories.filter((c) => c.slug !== slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Search & Copy Bar (EmojiTray) */}
      <HomePageClient />

      <h1 className="text-2xl font-bold mb-2 mt-6">{category.name}</h1>
      <p className="text-muted-foreground mb-6">{category.description}</p>

      {/* Client component for interactive grid */}
      <SymbolCategoryClient items={categorySymbols} />

      {/* Related Categories */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Related Symbol Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {relatedCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/symbols/${cat.slug}`}
              className="p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-card-hover transition-all text-center"
            >
              <span className="text-sm font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Symbol table for SEO */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">All {category.name}</h2>
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
                <tr key={item.id} className="border-b border-border/50">
                  <td className="py-2 pr-4 text-2xl emoji-char">{item.character}</td>
                  <td className="py-2 pr-4">{item.name}</td>
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
