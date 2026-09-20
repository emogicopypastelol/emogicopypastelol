import type { CharacterItem } from "@repo/types";

/**
 * Generates CharacterItem[] from the unicode-emoji-json data-by-group format.
 * This is called at build time to produce the emoji dataset.
 */

// Map unicode-emoji-json group names to our category slugs
const groupSlugMap: Record<string, string> = {
  "Smileys & Emotion": "smileys-emotion",
  "People & Body": "people-body",
  "Animals & Nature": "animals-nature",
  "Food & Drink": "food-drink",
  "Travel & Places": "travel-places",
  "Activities": "activities",
  "Objects": "objects",
  "Symbols": "symbols",
  "Flags": "flags",
  // Handle alternative names from different data versions
  "Smileys & People": "smileys-emotion",
  "Component": "people-body",
};

// Common keyword mappings for emoji names
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
 * Convert a character to its Unicode code points string representation.
 */
function getUnicodeCodePoints(char: string): string[] {
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
function nameToSlug(name: string): string {
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
function extractKeywords(name: string): string[] {
  const words = name.toLowerCase().split(/[\s-]+/);
  const keywords = new Set(words.filter((w) => w.length > 1));

  // Add expanded keywords
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

interface RawEmojiGroup {
  name: string;
  slug: string;
  emojis: RawEmoji[];
}

interface RawEmoji {
  emoji: string;
  skin_tone_support: boolean;
  name: string;
  slug: string;
  unicode_version: string;
  emoji_version: string;
}

/**
 * Transform raw unicode-emoji-json data into CharacterItem[].
 */
export function transformEmojiData(
  rawGroups: RawEmojiGroup[]
): CharacterItem[] {
  const items: CharacterItem[] = [];
  const seenSlugs = new Set<string>();

  for (const group of rawGroups) {
    const categorySlug = groupSlugMap[group.name] || nameToSlug(group.name);

    for (const rawEmoji of group.emojis) {
      let slug = rawEmoji.slug.replace(/_/g, "-");

      // Ensure unique slug
      if (seenSlugs.has(slug)) {
        slug = `${slug}-${categorySlug}`;
      }
      seenSlugs.add(slug);

      const item: CharacterItem = {
        id: slug,
        character: rawEmoji.emoji,
        name: rawEmoji.name
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        slug,
        type: "emoji",
        category: categorySlug,
        keywords: extractKeywords(rawEmoji.name),
        unicode: getUnicodeCodePoints(rawEmoji.emoji),
        version: rawEmoji.emoji_version,
        skinToneSupport: rawEmoji.skin_tone_support,
      };

      items.push(item);
    }
  }

  return items;
}
