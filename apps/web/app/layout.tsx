import type { Metadata } from "next";
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
              "@type": "WebSite",
              name: "CopyPaste Unicode",
              url: "https://copypaste-unicode.com",
              description:
                "Search, discover, and copy emojis, symbols, and Unicode characters.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://copypaste-unicode.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
