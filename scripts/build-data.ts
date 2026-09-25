/**
 * Build script — generates the final JSON data files for the web app.
 *
 * Usage: npx tsx scripts/build-data.ts
 *
 * Outputs:
 *   apps/web/public/data/search-index.json  — Minimal search index (lazy-loaded by client)
 *   apps/web/public/data/categories.json    — Category metadata with counts
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.resolve(ROOT, "apps/web/public/data");

interface CharacterItem {
  id: string;
  character: string;
  name: string;
  slug: string;
  type: "emoji" | "symbol" | "kaomoji";
  category: string;
  subcategory?: string;
  keywords: string[];
  unicode?: string[];
  version?: string;
  aliases?: string[];
  relatedIds?: string[];
  skinToneSupport?: boolean;
  htmlEntity?: string;
}

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

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  // Ensure output dir exists
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // ── Load emoji data from unicode-emoji-json package ──────────
  console.log("📦 Loading emoji data from unicode-emoji-json package...");

  const { adaptUnicodeEmojiData } = await import("../packages/data/src/adapter.ts");
  const emojiItems = adaptUnicodeEmojiData();

  console.log(`   ✓ ${emojiItems.length} emoji items adapted from unicode-emoji-json package`);

  // ── Import symbols from packages/data ─────────────────────────
  console.log("📦 Loading symbols data...");

  const { symbols } = await import("../packages/data/src/symbols.ts");
  const { kaomoji } = await import("../packages/data/src/kaomoji.ts");
  const { allCategories, emojiCategories } = await import("../packages/data/src/categories.ts");

  console.log(`   ✓ ${symbols.length} symbol items`);
  console.log(`   ✓ ${kaomoji.length} kaomoji items`);

  // ── Validation ────────────────────────────────────────────────
  console.log("🔍 Validating data...");

  const allItems = [...emojiItems, ...symbols, ...kaomoji];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const emojiCategorySlugs = new Set(emojiCategories.map((c: any) => c.slug));
  let errors = 0;

  for (const item of allItems) {
    if (ids.has(item.id)) {
      console.error(`   ✗ Duplicate ID: ${item.id}`);
      errors++;
    }
    ids.add(item.id);

    if (slugs.has(item.slug)) {
      console.error(`   ✗ Duplicate slug: ${item.slug}`);
      errors++;
    }
    slugs.add(item.slug);

    if (!item.name || item.name.trim().length === 0) {
      console.error(`   ✗ Missing name for ID: ${item.id}`);
      errors++;
    }

    if (!item.character || item.character.trim().length === 0) {
      console.error(`   ✗ Missing character for ID: ${item.id}`);
      errors++;
    }
  }

  // Check for routing collisions: no emoji slug may collide with an emoji category slug
  for (const item of emojiItems) {
    if (emojiCategorySlugs.has(item.slug)) {
      console.error(`   ✗ Routing collision: emoji slug "${item.slug}" matches category slug!`);
      errors++;
    }
  }

  if (errors > 0) {
    console.error(`\n❌ ${errors} validation errors found. Failing build.`);
    process.exit(1);
  } else {
    console.log(`   ✓ All ${allItems.length} items validated successfully (0 routing collisions)`);
  }

  // ── Update category counts ────────────────────────────────────
  const categoryCounts: Record<string, number> = {};
  for (const item of allItems) {
    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
  }

  const categoriesWithCounts = allCategories.map((cat: any) => ({
    ...cat,
    count: categoryCounts[cat.slug] || 0,
  }));

  // ── Clean up legacy files ─────────────────────────────────────
  const redundantFiles = ["emoji.json", "symbols.json", "all-characters.json"];
  for (const file of redundantFiles) {
    const filePath = path.join(OUT_DIR, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`   🗑️  Removed redundant file: ${file}`);
    }
  }

  // ── Write search indexes (split by type for minimal client payloads) ─
  console.log("💾 Writing search indexes (split by type + combined)...");

  // Minimal search payload: only fields required for local search
  const toSearchPayload = (item: CharacterItem) => ({
    id: item.id,
    character: item.character,
    name: item.name,
    slug: item.slug,
    category: item.category,
    keywords: item.keywords,
  });

  const emojiIndex = emojiItems.map(toSearchPayload);
  const symbolsIndex = symbols.map(toSearchPayload);
  const kaomojiIndex = kaomoji.map(toSearchPayload);
  const searchIndex = allItems.map(toSearchPayload);

  const emojiJson = JSON.stringify(emojiIndex);
  const symbolsJson = JSON.stringify(symbolsIndex);
  const kaomojiJson = JSON.stringify(kaomojiIndex);
  const searchJson = JSON.stringify(searchIndex);

  fs.writeFileSync(path.join(OUT_DIR, "emoji-index.json"), emojiJson, "utf-8");
  fs.writeFileSync(path.join(OUT_DIR, "symbols-index.json"), symbolsJson, "utf-8");
  fs.writeFileSync(path.join(OUT_DIR, "kaomoji-index.json"), kaomojiJson, "utf-8");
  fs.writeFileSync(path.join(OUT_DIR, "search-index.json"), searchJson, "utf-8");

  console.log(
    `   ✓ emoji-index.json (${(Buffer.byteLength(emojiJson) / 1024).toFixed(1)} KB — lazy-loaded by homepage)`
  );
  console.log(
    `   ✓ symbols-index.json (${(Buffer.byteLength(symbolsJson) / 1024).toFixed(1)} KB)`
  );
  console.log(
    `   ✓ kaomoji-index.json (${(Buffer.byteLength(kaomojiJson) / 1024).toFixed(1)} KB)`
  );
  console.log(
    `   ✓ search-index.json (${(Buffer.byteLength(searchJson) / 1024).toFixed(1)} KB — combined)`
  );

  // ── Write categories ──────────────────────────────────────────
  fs.writeFileSync(
    path.join(OUT_DIR, "categories.json"),
    JSON.stringify(categoriesWithCounts, null, 2),
    "utf-8"
  );
  console.log(`   ✓ categories.json`);

  console.log(`\n✅ Data build complete! ${allItems.length} total characters.`);
  console.log(`   📄 search-index.json: ${(Buffer.byteLength(searchJson) / 1024).toFixed(1)} KB (lazy-loaded by client on search)`);
  console.log(`   📄 categories.json: category metadata`);
  console.log(`   🚫 all-characters.json: REMOVED (browsing is now static HTML)`);
}

main().catch((err) => {
  console.error("Fatal build error:", err);
  process.exit(1);
});
