import type { CharacterItem, SearchResult } from "@repo/types";
import { normalize, tokenize } from "./normalize";

/**
 * Compute Levenshtein distance between two strings.
 * Used for fuzzy matching. Bounded at maxDistance for performance.
 */
function levenshtein(a: string, b: string, maxDistance: number = 2): number {
  if (Math.abs(a.length - b.length) > maxDistance) return maxDistance + 1;

  const matrix: number[][] = [];

  for (let i = 0; i <= a.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    matrix[0]![j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i]![j] = Math.min(
        matrix[i - 1]![j]! + 1,
        matrix[i]![j - 1]! + 1,
        matrix[i - 1]![j - 1]! + cost
      );
      rowMin = Math.min(rowMin, matrix[i]![j]!);
    }
    if (rowMin > maxDistance) return maxDistance + 1;
  }

  return matrix[a.length]![b.length]!;
}

/**
 * Score a single item against search tokens.
 * Returns score (higher = better match) and match type.
 *
 * Ranking priority:
 * 1. Exact name match (score: 1000)
 * 2. Exact alias match (score: 900)
 * 3. Prefix match on name (score: 800)
 * 4. Keyword match (score: 600)
 * 5. Category match (score: 400)
 * 6. Fuzzy match (score: 200)
 */
function scoreItem(
  item: CharacterItem,
  query: string,
  queryTokens: string[]
): { score: number; matchType: SearchResult["matchType"] } | null {
  const normalizedName = normalize(item.name);
  const normalizedQuery = normalize(query);

  // 1. Exact name match
  if (normalizedName === normalizedQuery) {
    return { score: 1000, matchType: "exact" };
  }

  // 2. Exact alias match
  if (item.aliases) {
    for (const alias of item.aliases) {
      if (normalize(alias) === normalizedQuery) {
        return { score: 900, matchType: "exact" };
      }
    }
  }

  // 3. Prefix match on name
  if (normalizedName.startsWith(normalizedQuery)) {
    return { score: 800 + (normalizedQuery.length / normalizedName.length) * 50, matchType: "prefix" };
  }

  // Check word-level prefix matches in name
  const nameTokens = tokenize(item.name);
  let prefixMatches = 0;
  for (const qt of queryTokens) {
    for (const nt of nameTokens) {
      if (nt.startsWith(qt)) {
        prefixMatches++;
        break;
      }
    }
  }
  if (prefixMatches === queryTokens.length) {
    return {
      score: 750 + (prefixMatches / nameTokens.length) * 50,
      matchType: "prefix",
    };
  }

  // 4. Keyword match
  const normalizedKeywords: string[] = item.keywords.map((k) => normalize(k));
  let keywordMatches = 0;
  for (const qt of queryTokens) {
    for (const kw of normalizedKeywords) {
      if (kw === qt || kw.startsWith(qt)) {
        keywordMatches++;
        break;
      }
    }
  }
  if (keywordMatches > 0) {
    const keywordScore =
      600 + (keywordMatches / queryTokens.length) * 100;
    return { score: keywordScore, matchType: "keyword" };
  }

  // 5. Category match
  const normalizedCategory = normalize(item.category.replace(/-/g, " "));
  for (const qt of queryTokens) {
    if (normalizedCategory.includes(qt)) {
      return { score: 400, matchType: "category" };
    }
  }

  // 6. Fuzzy match on name (Levenshtein ≤ 2)
  for (const qt of queryTokens) {
    if (qt.length < 3) continue; // Skip fuzzy for very short queries
    for (const nt of nameTokens) {
      const dist = levenshtein(qt, nt);
      if (dist <= 2) {
        return {
          score: 200 - dist * 50,
          matchType: "fuzzy",
        };
      }
    }
  }

  return null;
}

/**
 * Search through items and return ranked results.
 */
export function search(
  items: CharacterItem[],
  query: string,
  limit: number = 50
): SearchResult[] {
  if (!query || query.trim().length === 0) return [];

  const trimmedQuery = query.trim();
  if (trimmedQuery.length > 200) return []; // Query abuse protection

  const queryTokens = tokenize(trimmedQuery);
  if (queryTokens.length === 0) return [];

  const results: SearchResult[] = [];

  for (const item of items) {
    const result = scoreItem(item, trimmedQuery, queryTokens);
    if (result) {
      results.push({
        item,
        score: result.score,
        matchType: result.matchType,
      });
    }
  }

  // Sort by score descending, then by name alphabetically for ties
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.item.name.localeCompare(b.item.name);
  });

  return results.slice(0, limit);
}
