/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/types", "@repo/data", "@repo/search"],
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  headers: async () => [
    {
      source: "/:all*(svg|jpg|png|webp|woff|woff2|ico)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/data/:path*",
      headers: [
        {
          key: "Cache-Control",
          // These JSON files use stable URLs and are replaced during deploys.
          // Revalidate cached copies so clients don't retain an old index for days.
          value: "public, max-age=0, must-revalidate",
        },
      ],
    },
  ],
};

export default nextConfig;
