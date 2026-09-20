"use client";

import { cn } from "@/lib/utils";
import {
  Clock,
  Smile,
  PawPrint,
  Pizza,
  Globe,
  Trophy,
  Lightbulb,
  Music,
  Flag,
  Heart,
  Star,
  ArrowRight,
  Calculator,
  DollarSign,
  Square,
  Minus,
  Cloud,
  Settings,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * Category icon nav bar — matches the design reference.
 * Row of icon buttons for quick category switching.
 */

interface CategoryNavItem {
  slug: string;
  icon: LucideIcon;
  label: string;
}

const emojiCategoryIcons: CategoryNavItem[] = [
  { slug: "recent", icon: Clock, label: "Recent" },
  { slug: "smileys-emotion", icon: Smile, label: "Smileys & Emotion" },
  { slug: "animals-nature", icon: PawPrint, label: "Animals & Nature" },
  { slug: "food-drink", icon: Pizza, label: "Food & Drink" },
  { slug: "activities", icon: Trophy, label: "Activities" },
  { slug: "travel-places", icon: Globe, label: "Travel & Places" },
  { slug: "objects", icon: Lightbulb, label: "Objects" },
  { slug: "symbols", icon: Music, label: "Symbols" },
  { slug: "flags", icon: Flag, label: "Flags" },
];

const symbolCategoryIcons: CategoryNavItem[] = [
  { slug: "recent", icon: Clock, label: "Recent" },
  { slug: "hearts", icon: Heart, label: "Hearts" },
  { slug: "stars", icon: Star, label: "Stars" },
  { slug: "arrows", icon: ArrowRight, label: "Arrows" },
  { slug: "math", icon: Calculator, label: "Math" },
  { slug: "currency", icon: DollarSign, label: "Currency" },
  { slug: "shapes", icon: Square, label: "Shapes" },
  { slug: "lines", icon: Minus, label: "Lines" },
  { slug: "music", icon: Music, label: "Music" },
  { slug: "weather", icon: Cloud, label: "Weather" },
  { slug: "technical", icon: Settings, label: "Technical" },
  { slug: "miscellaneous", icon: Sparkles, label: "Misc" },
];

export function CategoryNav({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  type?: string;
}) {
  return (
    <nav className="category-nav flex items-center gap-1 overflow-x-auto scrollbar-none py-1" aria-label="Category navigation">
      {/* Emoji Categories */}
      {emojiCategoryIcons.map(({ slug, icon: Icon, label }) => (
        <button
          key={slug}
          className={cn("category-nav-item", activeCategory === slug && "active")}
          onClick={() => onCategoryChange(slug)}
          title={label}
          aria-label={label}
          aria-current={activeCategory === slug ? "true" : undefined}
          type="button"
        >
          <Icon size={18} />
        </button>
      ))}

      {/* Subtle Divider between Emojis and Symbols */}
      <div className="w-px h-5 bg-border/70 mx-1.5 flex-shrink-0" />

      {/* Symbol Categories */}
      {symbolCategoryIcons
        .filter((s) => s.slug !== "recent")
        .map(({ slug, icon: Icon, label }) => (
          <button
            key={slug}
            className={cn("category-nav-item", activeCategory === slug && "active")}
            onClick={() => onCategoryChange(slug)}
            title={label}
            aria-label={label}
            aria-current={activeCategory === slug ? "true" : undefined}
            type="button"
          >
            <Icon size={18} />
          </button>
        ))}
    </nav>
  );
}

export { emojiCategoryIcons, symbolCategoryIcons };
