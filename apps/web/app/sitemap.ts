import type { MetadataRoute } from "next";
import { emojiCategories, symbolCategories } from "@repo/data";
import { getAllEmoji } from "@/lib/data";

const BASE_URL = "https://copypaste-unicode.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/emoji`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/symbols`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  // Emoji category browse pages
  const emojiCategoryPages: MetadataRoute.Sitemap = emojiCategories.map((cat) => ({
    url: `${BASE_URL}/emoji/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Symbol category browse pages
  const symbolCategoryPages: MetadataRoute.Sitemap = symbolCategories.map((cat) => ({
    url: `${BASE_URL}/symbols/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // All emoji individual detail pages (full SSG coverage)
  const allEmoji = getAllEmoji();
  const emojiDetailPages: MetadataRoute.Sitemap = allEmoji.map((item) => ({
    url: `${BASE_URL}/emoji/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...emojiCategoryPages,
    ...symbolCategoryPages,
    ...emojiDetailPages,
  ];
}
