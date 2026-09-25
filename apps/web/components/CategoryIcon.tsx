import {
  Smile,
  User,
  PawPrint,
  Utensils,
  Globe,
  Gamepad2,
  Gift,
  LayoutGrid,
  Flag,
  Heart,
  Star,
  ArrowUpRight,
  Sigma,
  DollarSign,
  Diamond,
  Equal,
  Music,
  CloudSun,
  Settings,
  Sparkles,
  Frown,
  Flame,
  Glasses,
  HelpCircle,
  Omega,
  type LucideIcon,
} from "lucide-react";

/**
 * Central registry – every category slug maps to a Lucide icon
 * plus a vibrant bg / text colour pair for its circular badge.
 */
export interface IconDef {
  icon: LucideIcon;
  bg: string;   // Tailwind bg colour class
  fg: string;   // Tailwind text colour class
}

export const ICON_MAP: Record<string, IconDef> = {
  /* ── Emoji categories ────────────────────────── */
  "smileys-emotion": { icon: Smile,      bg: "bg-[#fef3c7]", fg: "text-[#d97706]" },
  "people-body":     { icon: User,       bg: "bg-[#dbeafe]", fg: "text-[#2563eb]" },
  "animals-nature":  { icon: PawPrint,   bg: "bg-[#d1fae5]", fg: "text-[#059669]" },
  "food-drink":      { icon: Utensils,   bg: "bg-[#ffedd5]", fg: "text-[#ea580c]" },
  "travel-places":   { icon: Globe,      bg: "bg-[#e0f2fe]", fg: "text-[#0284c7]" },
  "activities":      { icon: Gamepad2,   bg: "bg-[#f3e8ff]", fg: "text-[#9333ea]" },
  "objects":         { icon: Gift,       bg: "bg-[#ffe4e6]", fg: "text-[#e11d48]" },
  "symbols":         { icon: LayoutGrid, bg: "bg-[#ede9fe]", fg: "text-[#6366f1]" },
  "flags":           { icon: Flag,       bg: "bg-[#fee2e2]", fg: "text-[#ef4444]" },

  /* ── Symbol categories ───────────────────────── */
  "hearts":          { icon: Heart,      bg: "bg-[#ffe4e6]", fg: "text-[#e11d48]" },
  "stars":           { icon: Star,       bg: "bg-[#fef9c3]", fg: "text-[#ca8a04]" },
  "arrows":          { icon: ArrowUpRight, bg: "bg-[#ccfbf1]", fg: "text-[#0d9488]" },
  "math":            { icon: Sigma,      bg: "bg-[#f3e8ff]", fg: "text-[#7c3aed]" },
  "currency":        { icon: DollarSign, bg: "bg-[#fef3c7]", fg: "text-[#d97706]" },
  "shapes":          { icon: Diamond,    bg: "bg-[#dbeafe]", fg: "text-[#2563eb]" },
  "lines":           { icon: Equal,      bg: "bg-[#f1f5f9]", fg: "text-[#475569]" },
  "music":           { icon: Music,      bg: "bg-[#fce7f3]", fg: "text-[#db2777]" },
  "weather":         { icon: CloudSun,   bg: "bg-[#fef3c7]", fg: "text-[#f59e0b]" },
  "technical":       { icon: Settings,   bg: "bg-[#e2e8f0]", fg: "text-[#334155]" },
  "greek":           { icon: Omega,      bg: "bg-[#ede9fe]", fg: "text-[#7c3aed]" },
  "latin":           { icon: Sparkles,   bg: "bg-[#dbeafe]", fg: "text-[#3b82f6]" },
  "miscellaneous":   { icon: Sparkles,   bg: "bg-[#e0f2fe]", fg: "text-[#0ea5e9]" },

  /* ── Kaomoji categories ──────────────────────── */
  "happy":           { icon: Smile,      bg: "bg-[#fef08a]", fg: "text-[#ca8a04]" },
  "love":            { icon: Heart,      bg: "bg-[#fbcfe8]", fg: "text-[#db2777]" },
  "cute":            { icon: Sparkles,   bg: "bg-[#e9d5ff]", fg: "text-[#9333ea]" },
  "shrug":           { icon: HelpCircle, bg: "bg-[#a5f3fc]", fg: "text-[#0891b2]" },
  "sad":             { icon: Frown,      bg: "bg-[#bfdbfe]", fg: "text-[#2563eb]" },
  "angry":           { icon: Flame,      bg: "bg-[#fecaca]", fg: "text-[#dc2626]" },
  "animals":         { icon: PawPrint,   bg: "bg-[#fed7aa]", fg: "text-[#9a3412]" },
  "action":          { icon: Glasses,    bg: "bg-[#a7f3d0]", fg: "text-[#059669]" },
};

/* Fallback for unknown slugs */
export const FALLBACK_ICON: IconDef = { icon: LayoutGrid, bg: "bg-[#f1f5f9]", fg: "text-[#64748b]" };

interface CategoryIconProps {
  slug: string;
  alt?: string;
  /** The outer badge size in pixels (default 28). */
  size?: number;
  className?: string;
}

export function CategoryIcon({
  slug,
  alt = "",
  size = 28,
  className = "",
}: CategoryIconProps) {
  const def = ICON_MAP[slug] ?? FALLBACK_ICON;
  const Icon = def.icon;
  // Icon stroke scales with badge — cap at a reasonable size
  const iconSize = Math.round(size * 0.54);

  return (
    <span
      role="img"
      aria-label={alt}
      className={`inline-flex items-center justify-center rounded-full shrink-0 ${def.bg} ${def.fg} ${className}`}
      style={{ width: size, height: size }}
    >
      <Icon size={iconSize} strokeWidth={2.2} />
    </span>
  );
}
