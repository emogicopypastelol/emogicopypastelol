import type { CharacterItem } from "@repo/types";

// Module-level singletons for promises and in-memory parsed caches
let emojiPromise: Promise<CharacterItem[]> | null = null;
let symbolsPromise: Promise<CharacterItem[]> | null = null;
let kaomojiPromise: Promise<CharacterItem[]> | null = null;
let searchIndexPromise: Promise<CharacterItem[]> | null = null;

let cachedEmojiIndex: CharacterItem[] | null = null;
let cachedSymbolsIndex: CharacterItem[] | null = null;
let cachedKaomojiIndex: CharacterItem[] | null = null;
let cachedSearchIndex: CharacterItem[] | null = null;

async function fetchJsonIndex(url: string): Promise<CharacterItem[]> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load ${url}: HTTP ${res.status}`);
  }
  return res.json();
}

/**
 * Loads only emoji items (~278 KB).
 * Used by RemainingEmojiSection on the homepage to avoid loading symbols and kaomoji datasets.
 * Lazily fetched and cached in memory across the browser runtime.
 */
export function loadEmojiIndex(): Promise<CharacterItem[]> {
  if (cachedEmojiIndex) {
    return Promise.resolve(cachedEmojiIndex);
  }
  if (!emojiPromise) {
    emojiPromise = fetchJsonIndex("/data/emoji-index.json")
      .then((data) => {
        cachedEmojiIndex = data;
        return data;
      })
      .catch((err) => {
        console.error("Failed to load emoji index:", err);
        emojiPromise = null;
        return [];
      });
  }
  return emojiPromise;
}

/**
 * Loads symbols index (~28 KB).
 */
export function loadSymbolsIndex(): Promise<CharacterItem[]> {
  if (cachedSymbolsIndex) {
    return Promise.resolve(cachedSymbolsIndex);
  }
  if (!symbolsPromise) {
    symbolsPromise = fetchJsonIndex("/data/symbols-index.json")
      .then((data) => {
        cachedSymbolsIndex = data;
        return data;
      })
      .catch((err) => {
        console.error("Failed to load symbols index:", err);
        symbolsPromise = null;
        return [];
      });
  }
  return symbolsPromise;
}

/**
 * Loads kaomoji index (~14 KB).
 */
export function loadKaomojiIndex(): Promise<CharacterItem[]> {
  if (cachedKaomojiIndex) {
    return Promise.resolve(cachedKaomojiIndex);
  }
  if (!kaomojiPromise) {
    kaomojiPromise = fetchJsonIndex("/data/kaomoji-index.json")
      .then((data) => {
        cachedKaomojiIndex = data;
        return data;
      })
      .catch((err) => {
        console.error("Failed to load kaomoji index:", err);
        kaomojiPromise = null;
        return [];
      });
  }
  return kaomojiPromise;
}

/**
 * Loads the complete search index across all types (emoji, symbols, kaomoji).
 * Reuses emoji data if already loaded or in-flight, downloading symbols and kaomoji in parallel.
 * Falls back to combined search-index.json if modular fetch fails.
 * Cached in memory and shared across all consumers.
 */
export function loadSearchIndex(): Promise<CharacterItem[]> {
  if (cachedSearchIndex) {
    return Promise.resolve(cachedSearchIndex);
  }
  if (!searchIndexPromise) {
    searchIndexPromise = Promise.all([
      loadEmojiIndex(),
      loadSymbolsIndex(),
      loadKaomojiIndex(),
    ])
      .then(([emojis, syms, kaos]) => {
        // The individual loaders log and return [] on a failed request so their
        // callers can degrade gracefully. Search must not cache a partial index:
        // an empty type means the modular load failed, so use the combined file.
        if (emojis.length === 0 || syms.length === 0 || kaos.length === 0) {
          throw new Error("One or more modular search indexes are empty");
        }

        const combined = [...emojis, ...syms, ...kaos];
        cachedSearchIndex = combined;
        return combined;
      })
      .catch(async (err) => {
        console.warn("Modular search index fetch failed, falling back to combined search-index.json:", err);
        try {
          const fallback = await fetchJsonIndex("/data/search-index.json");
          cachedSearchIndex = fallback;
          return fallback;
        } catch (fallbackErr) {
          console.error("Failed to load search index:", fallbackErr);
          searchIndexPromise = null;
          return [];
        }
      });
  }
  return searchIndexPromise;
}

/**
 * Synchronous accessor for search index if already loaded in memory.
 */
export function getCachedSearchIndex(): CharacterItem[] | null {
  return cachedSearchIndex;
}

/**
 * Synchronous accessor for emoji index if already loaded in memory.
 */
export function getCachedEmojiIndex(): CharacterItem[] | null {
  return cachedEmojiIndex;
}
