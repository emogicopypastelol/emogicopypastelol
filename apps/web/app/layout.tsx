import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "CopyPaste Unicode — Emoji & Symbols Copy Paste",
    description:
      "Search, discover, and copy emojis, symbols, and Unicode characters. One click to copy.",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="min-h-dvh flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
