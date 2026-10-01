import "server-only";

import { adaptUnicodeEmojiData, symbols, allCategories } from "@repo/data";
export { symbols };
import type { CharacterItem, Category } from "@repo/types";

let cachedEmoji: CharacterItem[] | null = null;
let cachedAll: CharacterItem[] | null = null;

export function getAllEmoji(): CharacterItem[] {
  if (!cachedEmoji) {
    cachedEmoji = adaptUnicodeEmojiData();
  }
  return cachedEmoji;
}

export function getAllCharacters(): CharacterItem[] {
  if (!cachedAll) {
    cachedAll = [...getAllEmoji(), ...symbols];
  }
  return cachedAll;
}

export function getCategories(): Category[] {
  return allCategories;
}

export function getEmojiBySlug(slug: string): CharacterItem | undefined {
  const emoji = getAllEmoji();
  return emoji.find((e) => e.slug === slug || e.id === slug);
}

/**
 * Returns all emoji items in a given category.
 * Used at build time by SSG category pages.
 */
export function getEmojiByCategory(category: string): CharacterItem[] {
  return getAllEmoji().filter((e) => e.category === category);
}

/**
 * Returns a single symbol by its slug (e.g. "sym-black-heart-suit").
 * Used at build time by SSG individual symbol pages.
 */
export function getSymbolBySlug(slug: string): CharacterItem | undefined {
  return symbols.find((s) => s.slug === slug);
}

/**
 * Returns all symbol items in a given category.
 */
export function getSymbolsByCategory(category: string): CharacterItem[] {
  return symbols.filter((s) => s.category === category);
}
