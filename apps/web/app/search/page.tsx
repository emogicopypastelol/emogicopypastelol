import type { Metadata } from "next";
import { SearchPageClient } from "./client";

export const metadata: Metadata = {
  title: "Search",
  description: "Search for emoji, symbols, and Unicode characters.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://copypaste-unicode.com/search" },
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Characters</h1>
      <SearchPageClient />
    </div>
  );
}
