import type { CharacterItem } from "@repo/types";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const rawEmojiGroups = require("unicode-emoji-json/data-by-group.json") as RawEmojiGroup[];

export interface RawEmoji {
  emoji: string;
  skin_tone_support: boolean;
  name: string;
  slug: string;
  unicode_version: string;
  emoji_version: string;
}

export interface RawEmojiGroup {
  name: string;
  slug: string;
  emojis: RawEmoji[];
}

// Map unicode-emoji-json group names to category slugs
export const groupSlugMap: Record<string, string> = {
  "Smileys & Emotion": "smileys-emotion",
  "People & Body": "people-body",
  "Animals & Nature": "animals-nature",
  "Food & Drink": "food-drink",
  "Travel & Places": "travel-places",
  "Activities": "activities",
  "Objects": "objects",
  "Symbols": "symbols",
  "Flags": "flags",
  "Smileys & People": "smileys-emotion",
  "Component": "people-body",
};

// Common keyword expansions for emoji names to enhance search relevance
const keywordExpansions: Record<string, string[]> = {
  face: ["emoji", "expression"],
  heart: ["love", "affection"],
  hand: ["gesture"],
  flag: ["country", "nation"],
  cat: ["animal", "pet"],
  dog: ["animal", "pet"],
  fire: ["hot", "flame", "lit"],
  star: ["sparkle", "shine"],
  sun: ["weather", "bright"],
  moon: ["night", "sky"],
  cloud: ["weather", "sky"],
  flower: ["plant", "nature"],
  tree: ["plant", "nature"],
  food: ["eat", "meal"],
  drink: ["beverage"],
  car: ["vehicle", "transport"],
  house: ["home", "building"],
  book: ["read", "study"],
  music: ["song", "sound"],
  phone: ["call", "contact"],
  clock: ["time", "hour"],
  money: ["cash", "dollar", "currency"],
};

/**
 * Convert an emoji string to Unicode code points array (e.g. ["U+1F600"]).
 */
export function getUnicodeCodePoints(char: string): string[] {
  const codePoints: string[] = [];
  for (const cp of char) {
    const code = cp.codePointAt(0);
    if (code !== undefined) {
      codePoints.push(`U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
    }
  }
  return codePoints;
}

/**
 * Generate a URL-safe slug from a name.
 */
export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Extract keywords from an emoji name.
 */
export function extractKeywords(name: string): string[] {
  const words = name.toLowerCase().split(/[\s-]+/);
  const keywords = new Set(words.filter((w) => w.length > 1));

  for (const word of words) {
    const expansions = keywordExpansions[word];
    if (expansions) {
      for (const exp of expansions) {
        keywords.add(exp);
      }
    }
  }

  return Array.from(keywords);
}

/**
 * Adapter: converts raw unicode-emoji-json groups into existing CharacterItem[].
 */
export function adaptUnicodeEmojiData(
  groups: RawEmojiGroup[] = rawEmojiGroups
): CharacterItem[] {
  const items: CharacterItem[] = [];
  const seenSlugs = new Set<string>();

  for (const group of groups) {
    const categorySlug = groupSlugMap[group.name] || nameToSlug(group.name);

    for (const raw of group.emojis) {
      // Exclude unstandardized/draft Unicode 16.0+ emojis that cannot be displayed by fonts or Twemoji (producing black border tofu boxes ▯)
      const emojiVer = parseFloat(raw.emoji_version);
      const unicodeVer = parseFloat(raw.unicode_version);
      if (emojiVer >= 16.0 || unicodeVer >= 16.0) {
        continue;
      }

      let slug = raw.slug.replace(/_/g, "-");

      if (seenSlugs.has(slug)) {
        slug = `${slug}-${categorySlug}`;
      }
      seenSlugs.add(slug);

      const name = raw.name
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      const item: CharacterItem = {
        id: slug,
        character: raw.emoji,
        name,
        slug,
        type: "emoji",
        category: categorySlug,
        keywords: extractKeywords(raw.name),
        unicode: getUnicodeCodePoints(raw.emoji),
        version: raw.emoji_version,
        skinToneSupport: raw.skin_tone_support,
      };

      items.push(item);
    }
  }

  return items;
}
