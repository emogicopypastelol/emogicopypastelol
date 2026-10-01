import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          // Prevent crawling of raw JSON data files (search indexes, not pages)
          "/data/search-index.json",
          "/data/emoji-index.json",
          "/data/symbols-index.json",
          "/data/kaomoji-index.json",
        ],
      },
    ],
    sitemap: "https://copypaste-unicode.com/sitemap.xml",
  };
}
