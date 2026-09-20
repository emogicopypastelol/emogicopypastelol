/**
 * Text normalization for search queries and indexed content.
 * Handles diacritics, casing, whitespace, and common substitutions.
 */

/**
 * Normalize a string for search comparison.
 */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Strip diacritics
    .replace(/[^a-z0-9\s]/g, " ") // Non-alphanumeric → space
    .replace(/\s+/g, " ") // Collapse whitespace
    .trim();
}

/**
 * Tokenize a normalized string into individual terms.
 */
export function tokenize(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((t) => t.length > 0);
}
