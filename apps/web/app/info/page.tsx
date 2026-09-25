import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Site Information & Directory",
  description:
    "Complete directory, site map, legal information, and advertising details for CopyPaste Unicode.",
  alternates: {
    canonical: "/info",
  },
};

export default function InfoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-foreground font-sans leading-normal">
      {/* Document Header */}
      <header className="border-b border-border pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          CopyPaste Unicode — Site Information &amp; Directory
        </h1>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          A fast, SEO-first utility platform to search, browse, discover, and copy emojis,
          symbols, and Unicode characters for use in any document or application.
        </p>
      </header>

      {/* Directory & Navigation */}
      <section className="space-y-8 mb-10">
        <div>
          <h2 className="text-lg font-semibold border-b border-border pb-1 mb-3">
            Categories
          </h2>
          <ul className="list-disc list-inside space-y-1.5 text-sm">
            <li>
              <Link href="/emoji" className="text-primary hover:underline font-medium">
                Emoji
              </Link>
              <span className="text-muted-foreground"> — Comprehensive directory of emojis organized by official Unicode categories.</span>
            </li>
            <li>
              <Link href="/symbols" className="text-primary hover:underline font-medium">
                Symbols
              </Link>
              <span className="text-muted-foreground"> — Complete collection of text symbols, glyphs, and special characters.</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold border-b border-border pb-1 mb-3">
            Popular
          </h2>
          <ul className="list-disc list-inside space-y-1.5 text-sm">
            <li>
              <Link href="/symbols/hearts" className="text-primary hover:underline font-medium">
                Heart Symbols
              </Link>
              <span className="text-muted-foreground"> — Heart icons, emoji, and decorative text symbols.</span>
            </li>
            <li>
              <Link href="/symbols/arrows" className="text-primary hover:underline font-medium">
                Arrow Symbols
              </Link>
              <span className="text-muted-foreground"> — Directional, pointer, and flowchart arrows.</span>
            </li>
            <li>
              <Link href="/symbols/stars" className="text-primary hover:underline font-medium">
                Star Symbols
              </Link>
              <span className="text-muted-foreground"> — Star glyphs, asterisks, and rating stars.</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold border-b border-border pb-1 mb-3">
            Tools
          </h2>
          <ul className="list-disc list-inside space-y-1.5 text-sm">
            <li>
              <Link href="/symbols/math" className="text-primary hover:underline font-medium">
                Math Symbols
              </Link>
              <span className="text-muted-foreground"> — Arithmetic, calculus, logic, set theory, and mathematical operators.</span>
            </li>
            <li>
              <Link href="/symbols/currency" className="text-primary hover:underline font-medium">
                Currency Symbols
              </Link>
              <span className="text-muted-foreground"> — Global fiat and digital monetary signs.</span>
            </li>
            <li>
              <Link href="/symbols/greek" className="text-primary hover:underline font-medium">
                Greek Letters
              </Link>
              <span className="text-muted-foreground"> — Classical Greek alphabet characters for academic and scientific notation.</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold border-b border-border pb-1 mb-3">
            About &amp; Legal
          </h2>
          <ul className="list-disc list-inside space-y-1.5 text-sm">
            <li>
              <Link href="/about" className="text-primary hover:underline font-medium">
                About
              </Link>
              <span className="text-muted-foreground"> — Mission, architecture, client-side execution, and project background.</span>
            </li>
            <li>
              <Link href="/privacy" className="text-primary hover:underline font-medium">
                Privacy Policy
              </Link>
              <span className="text-muted-foreground"> — Information on data retention, local browser storage, and third-party advertising cookies.</span>
            </li>
            <li>
              <Link href="/terms" className="text-primary hover:underline font-medium">
                Terms of Service
              </Link>
              <span className="text-muted-foreground"> — Usage terms, disclaimer of warranties, and permitted use guidelines.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Advertising & Promotion */}
      <section className="border-t border-border pt-6 mb-8">
        <h2 className="text-lg font-semibold mb-3">
          Advertising &amp; Promotion
        </h2>
        <div className="text-sm space-y-3 text-muted-foreground leading-relaxed">
          <p>
            CopyPaste Unicode is an independent, free utility platform funded by programmatic
            and direct advertising partnerships.
          </p>
          <p>
            Our audience consists of digital creators, software developers, technical writers,
            social media marketers, and students seeking instant access to Unicode character sets.
          </p>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Standard Placements Available:</h3>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Desktop Left &amp; Right Sidebar Skyscraper units (160×600)</li>
              <li>Responsive Leaderboard Banner units (728×90 / 320×50)</li>
              <li>In-content high-visibility rectangle placements (300×250)</li>
            </ul>
          </div>
          <p>
            For direct sponsorship, brand partnerships, or advertising inquiries, please email{" "}
            <a
              href="mailto:ads@copypaste-unicode.com"
              className="text-primary hover:underline font-medium"
            >
              ads@copypaste-unicode.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* Data & Standards */}
      <section className="border-t border-border pt-6 mb-8">
        <h2 className="text-lg font-semibold mb-3">
          Data Sources &amp; Standards
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All character names, codepoints, and classification data are derived from the official{" "}
          <a
            href="https://unicode.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Unicode Standard
          </a>{" "}
          and the{" "}
          <a
            href="https://cldr.unicode.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Unicode Common Locale Data Repository (CLDR)
          </a>
          . Territorial flag renderings utilize the Twemoji open-source vector library,
          licensed under CC-BY 4.0. Unicode is a registered trademark of Unicode, Inc.
        </p>
      </section>

      {/* Copyright footnote */}
      <div className="border-t border-border pt-6 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} CopyPaste Unicode. All characters are part of the Unicode Standard.</p>
      </div>
    </div>
  );
}
