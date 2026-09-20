// ============================================================
// Core types for the CopyPaste Unicode platform
// ============================================================

/**
 * Character types supported by the platform.
 */
export type CharacterType = "emoji" | "symbol";

/**
 * A single character item — the fundamental data unit.
 */
export interface CharacterItem {
  /** Unique identifier, e.g. "grinning-face" or "heart-symbol" */
  id: string;

  /** The actual character/emoji/symbol string */
  character: string;

  /** Human-readable name, e.g. "Grinning Face" */
  name: string;

  /** URL-safe slug, e.g. "grinning-face" */
  slug: string;

  /** Character type */
  type?: CharacterType;

  /** Primary category slug, e.g. "smileys-emotion" */
  category: string;

  /** Optional subcategory slug */
  subcategory?: string;

  /** Search keywords */
  keywords: string[];

  /** Unicode code points, e.g. ["U+1F600"] */
  unicode?: string[];

  /** Unicode/emoji version */
  version?: string;

  /** Alternative names/aliases */
  aliases?: string[];

  /** IDs of related characters */
  relatedIds?: string[];

  /** Whether skin tone modifiers are supported (emoji only) */
  skinToneSupport?: boolean;

  /** HTML entity if applicable */
  htmlEntity?: string;
}

/**
 * Category definition.
 */
export interface Category {
  /** Unique slug */
  slug: string;

  /** Display name */
  name: string;

  /** Character type this category belongs to */
  type: CharacterType;

  /** Icon identifier (for icon-based nav) */
  icon?: string;

  /** Description for SEO */
  description?: string;

  /** Number of items in this category */
  count?: number;
}

/**
 * Search result with relevance score.
 */
export interface SearchResult {
  item: CharacterItem;
  score: number;
  matchType: "exact" | "prefix" | "keyword" | "category" | "fuzzy";
}

/**
 * Search index structure (client-side).
 */
export interface SearchIndex {
  items: CharacterItem[];
  version: string;
}

/**
 * Recently copied item in localStorage.
 */
export interface RecentItem {
  character: string;
  name: string;
  id: string;
  timestamp: number;
}

/**
 * Theme options.
 */
export type Theme = "light" | "dark" | "system";

/**
 * Copy state.
 */
export type CopyState = "idle" | "copying" | "copied" | "error";

/**
 * Emoji tray item — for the multi-select queue shown in the design.
 */
export interface TrayItem {
  character: string;
  id: string;
}
