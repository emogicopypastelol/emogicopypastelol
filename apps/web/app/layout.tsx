import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#10b981",
};

export const metadata: Metadata = {
  title: {
    default: "CopyPaste Unicode — Emoji & Symbols Copy Paste",
    template: "%s | CopyPaste Unicode",
  },
  description:
    "Search, discover, and copy emojis, symbols, Unicode characters, arrows, hearts, stars, math symbols, and more. One click to copy.",
  metadataBase: new URL("https://copypaste-unicode.com"),
  keywords: [
    "emoji copy paste",
    "symbols",
    "heart symbols",
    "arrow symbols",
    "unicode characters",
    "text symbols",
    "copy paste",
    "aesthetic symbols",
    "special characters",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CopyPaste Unicode",
    title: "CopyPaste Unicode — Emoji & Symbols Copy Paste",
    description:
      "Search, discover, and copy emojis, symbols, and Unicode characters. One click to copy and paste anywhere.",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CopyPaste Unicode — Emoji & Symbols Copy Paste",
    description:
      "Search, discover, and copy emojis, symbols, and Unicode characters. One click to copy.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://copypaste-unicode.com",
    languages: {
      en: "https://copypaste-unicode.com",
      "x-default": "https://copypaste-unicode.com",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-dvh flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "CopyPaste Unicode",
                  url: "https://copypaste-unicode.com",
                  description:
                    "Search, discover, and copy emojis, symbols, and Unicode characters.",
                },
                {
                  "@type": "WebApplication",
                  name: "CopyPaste Unicode",
                  url: "https://copypaste-unicode.com",
                  applicationCategory: "UtilityApplication",
                  operatingSystem: "All",
                  description:
                    "Free web utility to search and copy emoji, symbols, kaomoji, and Unicode characters. No sign-up required.",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                },
              ],
            }),
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
