"use client";

import { EmojiTray } from "@/components/EmojiTray";
import { SearchBox } from "@/components/SearchBox";

/**
 * Client-side interactivity layer for category pages.
 * Provides global search and the self-contained interactive Copy Bar (EmojiTray).
 * Clean, fast, and fully synchronized with localStorage.
 */
export function HomePageClient() {
  return (
    <>
      {/* Global Search Input — lazy-loads search index */}
      <SearchBox className="category-tool-search" />

      {/* Copy Bar / Emoji Tray (Floatable / Sticky) */}
      <EmojiTray className="mt-3 category-tool-tray" />
    </>
  );
}
