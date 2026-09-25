import type { MetadataRoute } from "next";
import { emojiCategories, symbolCategories, kaomojiCategories } from "@repo/data";
import { getAllEmoji } from "@/lib/data";

const BASE_URL = "https://copypaste-unicode.com";
const CONTENT_LAST_MODIFIED = new Date("2026-09-22T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = CONTENT_LAST_MODIFIED;

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/emoji`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE_URL}/symbols`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE_URL}/kaomoji`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/info`, lastModified, changeFrequency: "monthly", priority: 0.3 },
  ];

  // Emoji category browse pages
  const emojiCategoryPages: MetadataRoute.Sitemap = emojiCategories.map((cat) => ({
    url: `${BASE_URL}/emoji/${cat.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Symbol category browse pages
  const symbolCategoryPages: MetadataRoute.Sitemap = symbolCategories.map((cat) => ({
    url: `${BASE_URL}/symbols/${cat.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Kaomoji category browse pages
  const kaomojiCategoryPages: MetadataRoute.Sitemap = kaomojiCategories.map((cat) => ({
    url: `${BASE_URL}/kaomoji/${cat.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // All emoji individual detail pages (full SSG coverage)
  const allEmoji = getAllEmoji();
  const categorySlugs = new Set(emojiCategories.map((c) => c.slug));
  const emojiDetailPages: MetadataRoute.Sitemap = [];

  for (const item of allEmoji) {
    if (categorySlugs.has(item.slug)) {
      continue;
    }
    emojiDetailPages.push({
      url: `${BASE_URL}/emoji/${item.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  const allEntries = [
    ...staticPages,
    ...emojiCategoryPages,
    ...symbolCategoryPages,
    ...kaomojiCategoryPages,
    ...emojiDetailPages,
  ];

  // Guarantee strict uniqueness of sitemap URLs
  const seenUrls = new Set<string>();
  const uniqueEntries: MetadataRoute.Sitemap = [];
  for (const entry of allEntries) {
    if (!seenUrls.has(entry.url)) {
      seenUrls.add(entry.url);
      uniqueEntries.push(entry);
    }
  }

  return uniqueEntries;
}
