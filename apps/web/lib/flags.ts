/**
 * Utility functions for flag emoji rendering on Windows and other platforms.
 *
 * Windows Segoe UI Emoji does not render regional indicator flag glyphs and instead
 * displays two-letter country codes (e.g. "US", "GB").
 * We use high-performance SVGs from Twemoji CDN to render the visual flag
 * while retaining the standard Unicode flag character for clipboard copying.
 */

/**
 * Check if a character is a flag emoji.
 */
export function isFlagEmoji(char: string, category?: string): boolean {
  if (category === "flags") return true;

  // Check code points for regional indicators or flag base characters
  for (let i = 0; i < char.length; i++) {
    const cp = char.codePointAt(i);
    if (cp !== undefined) {
      // Regional indicators: 1F1E6 to 1F1FF
      if (cp >= 0x1f1e6 && cp <= 0x1f1ff) {
        return true;
      }
      // Black flag (1F3F4), White flag (1F3F3), Chequered flag (1F3C1), Triangular flag (1F6A9), Crossed flags (1F38C)
      if (
        cp === 0x1f3f4 ||
        cp === 0x1f3f3 ||
        cp === 0x1f3c1 ||
        cp === 0x1f6a9 ||
        cp === 0x1f38c
      ) {
        return true;
      }
      if (cp > 0xffff) i++;
    }
  }
  return false;
}

/**
 * Convert an emoji string to its Twemoji SVG CDN URL.
 */
export function getTwemojiUrl(char: string): string {
  const points: string[] = [];
  for (let i = 0; i < char.length; i++) {
    const cp = char.codePointAt(i);
    if (cp !== undefined) {
      points.push(cp.toString(16).toLowerCase());
      if (cp > 0xffff) i++;
    }
  }

  // If the sequence has a Zero Width Joiner (200d), keep variation selector (fe0f)
  const hasZwj = points.includes("200d");
  const filtered = hasZwj ? points : points.filter((p) => p !== "fe0f");
  let codepoints = filtered.join("-");

  // Regional territory flag aliases in Twemoji
  const FLAG_ALIASES: Record<string, string> = {
    "1f1e8-1f1f5": "1f1eb-1f1f7", // Clipperton Island -> France
    "1f1e8-1f1f6": "1f1ec-1f1ec", // Sark -> Guernsey
    "1f1e9-1f1ec": "1f1ec-1f1e7", // Diego Garcia -> UK
    "1f1ea-1f1e6": "1f1ea-1f1f8", // Ceuta & Melilla -> Spain
  };

  const alias = FLAG_ALIASES[codepoints];
  if (alias) {
    codepoints = alias;
  }

  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoints}.svg`;
}
