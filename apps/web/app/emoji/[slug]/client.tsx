"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Code } from "lucide-react";
import type { CharacterItem } from "@repo/types";
import { copyToClipboard } from "@/lib/clipboard";
import { addTrayItem } from "@/lib/storage";
import { isFlagEmoji, shouldRenderTwemoji, getTwemojiUrl } from "@/lib/flags";

export function EmojiDetailClient({
  emoji,
}: {
  emoji: CharacterItem;
}) {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = useCallback(
    async (text: string, type: string) => {
      copyToClipboard(text);
      setCopiedType(type);
      if (type === "char") {
        addTrayItem({ character: emoji.character, id: emoji.id });
      }
      setTimeout(() => setCopiedType(null), 1500);
    },
    [emoji]
  );

  const htmlEntity = `&#${emoji.character.codePointAt(0)};`;
  const unicodeStr = emoji.unicode?.join(" ") ?? "";
  const shortcode = `:${emoji.slug.replace(/-/g, "_")}:`;
  const isFlag = isFlagEmoji(emoji.character, emoji.category);
  const useSvg = shouldRenderTwemoji(emoji.character, emoji.category);

  return (
    <div className="space-y-8">
      {/* Hero Card */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm">
        {/* Big Emoji Character Display */}
        <button
          onClick={() => handleCopy(emoji.character, "char")}
          className="relative group w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-muted/60 hover:bg-muted flex items-center justify-center text-7xl sm:text-8xl emoji-char transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          title={`Click to copy ${emoji.character}`}
          type="button"
        >
          {useSvg ? (
            <img
              src={getTwemojiUrl(emoji.character)}
              alt={emoji.name}
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain pointer-events-none"
              draggable={false}
            />
          ) : (
            <span>{emoji.character}</span>
          )}
          {copiedType === "char" && (
            <div className="absolute top-3 right-3 text-[#0eb780] animate-fade-in">
              <Check size={24} strokeWidth={3} />
            </div>
          )}
        </button>

        {/* Info & Copy Buttons */}
        <div className="flex-1 text-center sm:text-left space-y-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {emoji.name}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              <span className="font-mono">{unicodeStr}</span>
              <span className="mx-1.5 text-border">•</span>
              <span className="capitalize">{emoji.category.replace(/-/g, " ")}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1.5">
            {/* Primary Copy Button */}
            <button
              onClick={() => handleCopy(emoji.character, "char")}
              className={`h-10 px-4 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center gap-2 shadow-sm whitespace-nowrap ${
                copiedType === "char"
                  ? "bg-emerald-600 text-white scale-95"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow"
              }`}
              aria-label={`Copy ${emoji.name} emoji`}
              type="button"
            >
              {copiedType === "char" ? (
                <>
                  <Check size={16} />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy Emoji</span>
                </>
              )}
            </button>

            {/* Copy Shortcode */}
            <button
              onClick={() => handleCopy(shortcode, "shortcode")}
              className="h-10 min-w-33 px-3 rounded-xl border border-border bg-background hover:bg-muted text-left transition-colors flex flex-col justify-center gap-0.5"
              title={`Copy shortcode: ${shortcode}`}
              aria-label={`Copy shortcode ${shortcode}`}
              type="button"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Shortcode</span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-foreground">
                <Code size={12} />
                {copiedType === "shortcode" ? "Copied" : shortcode}
              </span>
            </button>

            {/* Copy Codepoint */}
            <button
              onClick={() => handleCopy(unicodeStr, "unicode")}
              className="h-10 min-w-29 px-3 rounded-xl border border-border bg-background hover:bg-muted text-left transition-colors flex flex-col justify-center gap-0.5"
              title={`Copy codepoint: ${unicodeStr}`}
              aria-label={`Copy Unicode codepoint ${unicodeStr}`}
              type="button"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Unicode</span>
              <span className="text-xs font-mono text-foreground">
                {copiedType === "unicode" ? "Copied" : unicodeStr}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Technical Specifications Table */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-base font-semibold mb-3">Technical Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between py-1.5 border-b border-border/50">
              <span className="text-muted-foreground">Character</span>
              <span className="font-semibold text-lg emoji-char inline-flex items-center gap-2">
                {isFlag ? (
                  <img
                    src={getTwemojiUrl(emoji.character)}
                    alt={emoji.name}
                    className="w-6 h-6 object-contain pointer-events-none"
                    draggable={false}
                  />
                ) : null}
                <span>{emoji.character}</span>
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border/50">
              <span className="text-muted-foreground">Unicode Codepoint</span>
              <span className="font-mono text-xs font-medium">{unicodeStr}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border/50">
              <span className="text-muted-foreground">Category</span>
              <span className="capitalize">{emoji.category.replace(/-/g, " ")}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between py-1.5 border-b border-border/50">
              <span className="text-muted-foreground">HTML Entity (Decimal)</span>
              <span className="font-mono text-xs">{htmlEntity}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border/50">
              <span className="text-muted-foreground">Emoji Version</span>
              <span>{emoji.version ? `Emoji ${emoji.version}` : "Unicode 1.0+"}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border/50">
              <span className="text-muted-foreground">Skin Tone Modifiers</span>
              <span>{emoji.skinToneSupport ? "Supported" : "Not supported"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Keywords / Tags */}
      {emoji.keywords && emoji.keywords.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground">Keywords & Search Terms</h2>
          <div className="flex flex-wrap gap-1.5">
            {emoji.keywords.map((kw) => (
              <span
                key={kw}
                className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
