import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About CopyPaste Unicode — a free, privacy-first utility for searching and copying emoji, symbols, and Unicode characters. Learn how it works, where the data comes from, and what we collect.",
  alternates: {
    canonical: "https://copypaste-unicode.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">About CopyPaste Unicode</h1>

      <div className="text-sm leading-relaxed space-y-6 text-foreground">
        <p className="text-muted-foreground">
          CopyPaste Unicode is a free, fast utility for finding and copying emoji, symbols,
          and Unicode characters. No accounts, no sign-ups — just search, click, and paste.
        </p>

        <section>
          <h2 className="text-lg font-semibold mb-2">What&apos;s in the Library</h2>
          <p className="text-muted-foreground mb-3">
            The library currently contains <strong className="text-foreground">2,164 characters</strong> across three types:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-1">
            <li>
              <strong className="text-foreground">1,898 emoji</strong> — organized into 9 official Unicode categories (Smileys &amp; Emotion, People &amp; Body, Animals &amp; Nature, Food &amp; Drink, Travel &amp; Places, Activities, Objects, Symbols, and Flags), covering all characters defined in the Unicode Emoji Standard.
            </li>
            <li>
              <strong className="text-foreground">177 text symbols</strong> — including hearts, stars, arrows, mathematical operators, currency signs, Greek letters, music notation, weather symbols, technical marks, and miscellaneous glyphs, organized into 13 categories.
            </li>
            <li>
              <strong className="text-foreground">89 kaomoji</strong> — Japanese-style text emoticons (顔文字) spanning 8 emotion categories: Happy, Love, Cute, Shrug, Sad, Angry, Animals, and Action.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">How the Search Works</h2>
          <p className="text-muted-foreground">
            Search runs entirely in your browser using a custom multi-strategy matching algorithm. It supports:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-1 mt-2">
            <li><strong className="text-foreground">Exact match</strong> — direct character or name match gets the highest score.</li>
            <li><strong className="text-foreground">Prefix match</strong> — typing &ldquo;grin&rdquo; finds &ldquo;Grinning Face&rdquo; before fuzzy results.</li>
            <li><strong className="text-foreground">Keyword match</strong> — each character has curated search tags (e.g. searching &ldquo;thumbs up&rdquo; finds 👍).</li>
            <li><strong className="text-foreground">Category match</strong> — searching &ldquo;heart&rdquo; surfaces heart-category items.</li>
            <li><strong className="text-foreground">Fuzzy match</strong> — typo-tolerant fallback using edit-distance scoring.</li>
          </ul>
          <p className="text-muted-foreground mt-2">
            The search index (split into three modular JSON files) is loaded lazily the first time you focus the search box and cached for the rest of your session. No search query ever leaves your device.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Data Sources</h2>
          <p className="text-muted-foreground">
            Character data comes from two authoritative Unicode sources:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-1 mt-2">
            <li>
              <a
                href="https://unicode.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Unicode Standard
              </a>{" "}
              — names, codepoints, category classifications, and version data for all characters.
            </li>
            <li>
              <a
                href="https://cldr.unicode.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Unicode CLDR (Common Locale Data Repository)
              </a>{" "}
              — English-language search keywords and annotations used to power natural-language search (e.g. searching &ldquo;happy&rdquo; or &ldquo;birthday&rdquo;).
            </li>
            <li>
              <a
                href="https://twemoji.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Twemoji
              </a>{" "}
              — open-source SVG emoji art (CC BY 4.0) used to render regional flags and a small number of emoji with inconsistent platform rendering.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Privacy</h2>
          <p className="text-muted-foreground">
            We do not collect personal data. We do not use first-party cookies for tracking.
            All search and copy operations happen entirely in your browser — nothing is sent to any server at runtime.
            Your emoji tray and recently copied items are stored in your browser&apos;s <code>localStorage</code> and never leave your device.
          </p>
          <p className="text-muted-foreground mt-2">
            The site is funded by programmatic advertising. Ad networks may set their own cookies in accordance with their privacy policies. See our{" "}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>{" "}
            for details.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Contact &amp; Advertising</h2>
          <p className="text-muted-foreground">
            For advertising inquiries or direct sponsorship, email{" "}
            <a href="mailto:ads@copypaste-unicode.com" className="text-primary hover:underline">
              ads@copypaste-unicode.com
            </a>
            . For general questions, visit the{" "}
            <a href="/info" className="text-primary hover:underline">
              site directory
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
