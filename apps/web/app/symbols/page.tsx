import type { Metadata } from "next";
import Link from "next/link";
import { symbolCategories } from "@repo/data";

export const metadata: Metadata = {
  title: "Symbols Copy and Paste ♥ ★ → ∞ — All Symbols",
  description:
    "Copy and paste symbols including hearts, stars, arrows, math symbols, currency signs, shapes, music notes, and more. One click to copy.",
};

export default function SymbolsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Symbols Copy and Paste</h1>
      <p className="text-muted-foreground mb-8">
        Browse all symbols by category. Click any symbol to copy it instantly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {symbolCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/symbols/${cat.slug}`}
            className="flex flex-col p-5 rounded-xl border border-border hover:border-primary/30 hover:bg-card-hover transition-all group"
          >
            <h2 className="text-base font-semibold group-hover:text-primary transition-colors">
              {cat.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {cat.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
