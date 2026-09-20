import Link from "next/link";
import { getAllEmoji } from "@/lib/data";
import { emojiCategories, symbolCategories } from "@repo/data";
import { StaticCharacterGrid } from "@/components/StaticCharacterGrid";
import { HomePageClient } from "@/components/HomePage";
import { AdSlot } from "@/components/AdSlot";

// Popular emoji slugs to feature on the homepage
const FEATURED_SLUGS = [
  "grinning-face", "smiling-face-with-heart-eyes", "face-with-tears-of-joy",
  "rolling-on-the-floor-laughing", "smiling-face-with-sunglasses",
  "red-heart", "fire", "sparkles", "party-popper", "thumbs-up",
  "clapping-hands", "folded-hands", "skull", "loudly-crying-face",
  "thinking-face", "eyes", "star-struck", "hundred-points", "rocket",
  "check-mark-button", "sparkling-heart", "two-hearts",
  "winking-face", "smiling-face-with-smiling-eyes",
  "face-blowing-a-kiss", "kissing-face-with-closed-eyes",
  "relieved-face", "smiling-face-with-halo",
  "grinning-face-with-big-eyes", "grinning-squinting-face",
  "grinning-face-with-sweat", "beaming-face-with-smiling-eyes",
  "winking-face-with-tongue", "zany-face", "squinting-face-with-tongue",
  "money-mouth-face", "hugging-face", "shushing-face",
  "face-with-hand-over-mouth", "face-savoring-food",
  "smirking-face", "unamused-face", "face-with-rolling-eyes",
  "grimacing-face", "lying-face", "face-exhaling",
  "pensive-face", "sleepy-face", "drooling-face",
  "sleeping-face", "face-with-medical-mask", "face-with-thermometer",
  "nauseated-face", "sneezing-face", "hot-face", "cold-face",
  "woozy-face", "exploding-head", "cowboy-hat-face",
  "partying-face", "disguised-face", "smiling-face-with-tear",
  "nerd-face", "face-with-monocle",
  "confused-face", "worried-face", "slightly-frowning-face",
  "frowning-face", "face-with-open-mouth",
  "hushed-face", "astonished-face", "flushed-face",
  "pleading-face", "face-holding-back-tears",
  "crying-face", "persevering-face",
  "disappointed-face", "downcast-face-with-sweat",
  "weary-face", "tired-face",
  "face-screaming-in-fear", "angry-face",
  "pouting-face", "face-with-symbols-on-mouth",
  "smiling-face-with-horns", "angry-face-with-horns",
  "ogre", "goblin", "clown-face",
  "pile-of-poo", "ghost", "alien",
  "robot", "waving-hand", "raised-back-of-hand",
  "victory-hand", "crossed-fingers", "love-you-gesture",
];

export default function Page() {
  const allEmoji = getAllEmoji();

  // Build featured items from known slugs
  const emojiBySlug = new Map(allEmoji.map((e) => [e.slug, e]));
  const featuredItems = FEATURED_SLUGS
    .map((slug) => emojiBySlug.get(slug))
    .filter(Boolean) as typeof allEmoji;

  return (
    <div className="homepage-layout">
      {/* Left Skyscraper Ad Space */}
      <aside className="homepage-sidebar hidden lg:block sticky top-20">
        <AdSlot type="sidebar" />
      </aside>

      {/* Centered Main Content Area */}
      <div className="homepage-center">
        {/* Client-side interactivity: search + tray */}
        <HomePageClient />

        {/* Category Navigation */}
        <nav className="mt-5 mb-6" aria-label="Browse categories">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Emoji Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {emojiCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/emoji/${cat.slug}`}
                className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-border hover:border-primary/30 hover:bg-card-hover transition-all"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 mt-5">
            Symbol Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {symbolCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/symbols/${cat.slug}`}
                className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-border hover:border-primary/30 hover:bg-card-hover transition-all"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Featured Emoji — Server-Rendered Static Grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
              Popular Emoji
            </h2>
            <Link
              href="/emoji"
              className="text-xs text-primary hover:underline"
            >
              Browse all →
            </Link>
          </div>

          <StaticCharacterGrid items={featuredItems} gridId="featured-grid" />
        </section>

        {/* Bottom Banner Ad Slot */}
        <div className="mt-8">
          <AdSlot type="banner" />
        </div>
      </div>

      {/* Right Skyscraper Ad Space */}
      <aside className="homepage-sidebar hidden lg:block sticky top-20">
        <AdSlot type="sidebar" />
      </aside>
    </div>
  );
}
