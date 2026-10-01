import Link from "next/link";
import {
  ArrowRight,
  Flag,
  Gift,
  Gamepad2,
  Globe,
  Heart,
  PawPrint,
  Shapes,
  Smile,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { emojiCategories } from "@repo/data";

const CATEGORY_STYLE: Record<
  string,
  { icon: LucideIcon; background: string; foreground: string }
> = {
  "smileys-emotion": { icon: Smile, background: "#fff0f1", foreground: "#d84f5d" },
  "people-body": { icon: Heart, background: "#edf4ff", foreground: "#3978d4" },
  "animals-nature": { icon: PawPrint, background: "#e9f7f2", foreground: "#15966d" },
  "food-drink": { icon: Utensils, background: "#fff5df", foreground: "#c58a22" },
  activities: { icon: Gamepad2, background: "#f4efff", foreground: "#8954c8" },
  "travel-places": { icon: Globe, background: "#eaf7fa", foreground: "#168c9e" },
  objects: { icon: Gift, background: "#fceef5", foreground: "#ca4c8a" },
  symbols: { icon: Shapes, background: "#f0f1fb", foreground: "#6875a8" },
  flags: { icon: Flag, background: "#eef1f8", foreground: "#65728e" },
};

/** Small, crawlable category shortcuts displayed directly below the main navbar. */
export function EmojiCategoryPillNav() {
  return (
    <div className="emoji-category-strip">
      <nav className="emoji-category-strip__scroll" aria-label="Emoji categories">
        <div className="emoji-category-strip__items">
          {emojiCategories.map((category) => {
            const style = CATEGORY_STYLE[category.slug];
            const Icon = style.icon;

            return (
              <Link
                key={category.slug}
                href={`/emoji/${category.slug}`}
                className="emoji-category-pill"
                style={{
                  backgroundColor: style.background,
                  color: style.foreground,
                }}
              >
                <Icon size={19} strokeWidth={2.15} aria-hidden="true" />
                <span>{category.name}</span>
              </Link>
            );
          })}
          <Link
            href="/emoji"
            className="emoji-category-pill emoji-category-pill--all"
          >
            <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            <span>View all</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
