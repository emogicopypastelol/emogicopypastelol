import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for doesn't exist. Browse emoji, symbols, and kaomoji on CopyPaste Unicode.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The character or page you&apos;re looking for doesn&apos;t exist. Try searching, or
        browse a section below.
      </p>

      {/* Primary actions */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <Link
          href="/"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/search"
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary-hover transition-colors"
        >
          Search Characters
        </Link>
      </div>

      {/* Helpful section links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <Link
          href="/emoji"
          className="flex flex-col items-center gap-1.5 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-card-hover transition-all"
        >
          <span className="text-2xl emoji-char">😀</span>
          <span className="font-medium">Emoji</span>
          <span className="text-muted-foreground text-xs">1,898 characters</span>
        </Link>
        <Link
          href="/symbols"
          className="flex flex-col items-center gap-1.5 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-card-hover transition-all"
        >
          <span className="text-2xl emoji-char">★</span>
          <span className="font-medium">Symbols</span>
          <span className="text-muted-foreground text-xs">177 characters</span>
        </Link>
        <Link
          href="/kaomoji"
          className="flex flex-col items-center gap-1.5 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-card-hover transition-all"
        >
          <span className="text-base">(◕‿◕✿)</span>
          <span className="font-medium">Kaomoji</span>
          <span className="text-muted-foreground text-xs">89 emoticons</span>
        </Link>
      </div>
    </div>
  );
}
