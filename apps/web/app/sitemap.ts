import type { MetadataRoute } from "next";
import {
  emojiCategories,
  symbolCategories,
  kaomojiCategories,
  symbols,
} from "@repo/data";
import { getAllEmoji, getEmojiByCategory } from "@/lib/data";
import {
  EMOJI_CATEGORY_PAGE_SIZE,
  emojiCategoryPagePath,
} from "@/lib/emojiPagination";

const BASE_URL = "https://copypaste-unicode.com";
const configuredUpdatedAt = process.env.CONTENT_UPDATED_AT;
const configuredLastModified = configuredUpdatedAt
  ? new Date(configuredUpdatedAt)
  : undefined;

if (configuredLastModified && Number.isNaN(configuredLastModified.getTime())) {
  throw new Error("CONTENT_UPDATED_AT must be a valid ISO 8601 timestamp.");
}

const lastModifiedFields = configuredLastModified
  ? { lastModified: configuredLastModified }
  : {};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, ...lastModifiedFields, changeFrequency: "weekly", priority: 1.0 },
    { url: BASE_URL + "/emoji", ...lastModifiedFields, changeFrequency: "weekly", priority: 0.95 },
    { url: BASE_URL + "/symbols", ...lastModifiedFields, changeFrequency: "weekly", priority: 0.95 },
    { url: BASE_URL + "/kaomoji", ...lastModifiedFields, changeFrequency: "weekly", priority: 0.95 },
    { url: BASE_URL + "/about", ...lastModifiedFields, changeFrequency: "monthly", priority: 0.4 },
    { url: BASE_URL + "/info", ...lastModifiedFields, changeFrequency: "monthly", priority: 0.3 },
  ];

  const emojiCategoryPages: MetadataRoute.Sitemap = emojiCategories.map((category) => ({
    url: BASE_URL + "/emoji/" + category.slug,
    ...lastModifiedFields,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const emojiCategoryPaginationPages: MetadataRoute.Sitemap = emojiCategories.flatMap((category) => {
    const pageCount = Math.ceil(
      getEmojiByCategory(category.slug).length / EMOJI_CATEGORY_PAGE_SIZE
    );
    return Array.from({ length: Math.max(0, pageCount - 1) }, (_, index) => {
      const pageNumber = index + 2;
      return {
        url: BASE_URL + emojiCategoryPagePath(category.slug, pageNumber),
        ...lastModifiedFields,
        changeFrequency: "weekly" as const,
        priority: 0.75,
      };
    });
  });

  const symbolCategoryPages: MetadataRoute.Sitemap = symbolCategories.map((category) => ({
    url: BASE_URL + "/symbols/" + category.slug,
    ...lastModifiedFields,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const symbolCategorySlugs = new Set(symbolCategories.map((category) => category.slug));
  const symbolDetailPages: MetadataRoute.Sitemap = symbols
    .filter((symbol) => !symbolCategorySlugs.has(symbol.slug))
    .map((symbol) => ({
      url: BASE_URL + "/symbols/" + symbol.slug,
      ...lastModifiedFields,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const kaomojiCategoryPages: MetadataRoute.Sitemap = kaomojiCategories.map((category) => ({
    url: BASE_URL + "/kaomoji/" + category.slug,
    ...lastModifiedFields,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const allEmoji = getAllEmoji();
  const emojiCategorySlugs = new Set(emojiCategories.map((category) => category.slug));
  const emojiDetailPages: MetadataRoute.Sitemap = allEmoji
    .filter((item) => !emojiCategorySlugs.has(item.slug))
    .map((item) => ({
      url: BASE_URL + "/emoji/" + item.slug,
      ...lastModifiedFields,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const allEntries = [
    ...staticPages,
    ...emojiCategoryPages,
    ...emojiCategoryPaginationPages,
    ...symbolCategoryPages,
    ...symbolDetailPages,
    ...kaomojiCategoryPages,
    ...emojiDetailPages,
  ];

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