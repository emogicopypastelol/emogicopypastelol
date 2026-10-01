"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Code } from "lucide-react";
import type { CharacterItem } from "@repo/types";
import { copyToClipboard } from "@/lib/clipboard";
import { addTrayItem } from "@/lib/storage";

export function SymbolDetailClient({ symbol }: { symbol: CharacterItem }) {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = useCallback(
    async (text: string, type: string) => {
      copyToClipboard(text);
      setCopiedType(type);
      if (type === "char") {
        addTrayItem({ character: symbol.character, id: symbol.id });
      }
      setTimeout(() => setCopiedType(null), 1500);
    },
    [symbol]
  );

  const htmlEntity = symbol.htmlEntity ?? `&#${symbol.character.codePointAt(0)};`;
  const unicodeStr = symbol.unicode?.join(" ") ?? "";

  return (
    <div className="space-y-8">
      {/* Hero Card */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm">
        {/* Big Symbol Character Display */}
        <button
          onClick={() => handleCopy(symbol.character, "char")}
          className="relative group w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-muted/60 hover:bg-muted flex items-center justify-center text-7xl sm:text-8xl emoji-char transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          title={`Click to copy ${symbol.character}`}
          type="button"
        >
          <span>{symbol.character}</span>
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
              {symbol.name}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              <span className="font-mono">{unicodeStr}</span>
              <span className="mx-1.5 text-border">•</span>
              <span className="capitalize">{symbol.category.replace(/-/g, " ")}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1.5">
            {/* Primary Copy Button */}
            <button
              onClick={() => handleCopy(symbol.character, "char")}
              className={`h-10 px-4 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center gap-2 shadow-sm whitespace-nowrap ${
                copiedType === "char"
                  ? "bg-emerald-600 text-white scale-95"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow"
              }`}
              aria-label={`Copy ${symbol.name} symbol`}
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
                  <span>Copy Symbol</span>
                </>
              )}
            </button>

            {/* Copy Unicode Codepoint */}
            {unicodeStr && (
              <button
                onClick={() => handleCopy(unicodeStr, "unicode")}
                className="h-10 min-w-[7rem] px-3 rounded-xl border border-border bg-background hover:bg-muted text-left transition-colors flex flex-col justify-center gap-0.5"
                title={`Copy codepoint: ${unicodeStr}`}
                aria-label={`Copy Unicode codepoint ${unicodeStr}`}
                type="button"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Unicode</span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-foreground">
                  <Code size={12} />
                  {copiedType === "unicode" ? "Copied" : unicodeStr}
                </span>
              </button>
            )}

            {/* Copy HTML Entity */}
            <button
              onClick={() => handleCopy(htmlEntity, "html")}
              className="h-10 min-w-[7rem] px-3 rounded-xl border border-border bg-background hover:bg-muted text-left transition-colors flex flex-col justify-center gap-0.5"
              title={`Copy HTML entity: ${htmlEntity}`}
              aria-label={`Copy HTML entity ${htmlEntity}`}
              type="button"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">HTML Entity</span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-foreground">
                <Code size={12} />
                {copiedType === "html" ? "Copied" : htmlEntity}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-base font-semibold mb-3">Technical Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between py-1.5 border-b border-border/50">
              <span className="text-muted-foreground">Character</span>
              <span className="font-semibold text-lg emoji-char">{symbol.character}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border/50">
              <span className="text-muted-foreground">Unicode Codepoint</span>
              <span className="font-mono text-xs font-medium">{unicodeStr || "—"}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border/50">
              <span className="text-muted-foreground">Category</span>
              <span className="capitalize">{symbol.category.replace(/-/g, " ")}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between py-1.5 border-b border-border/50">
              <span className="text-muted-foreground">HTML Entity</span>
              <span className="font-mono text-xs">{htmlEntity}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border/50">
              <span className="text-muted-foreground">Type</span>
              <span>Text Symbol</span>
            </div>
            {symbol.aliases && symbol.aliases.length > 0 && (
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground">Also Known As</span>
                <span className="text-right">{symbol.aliases.slice(0, 2).join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Keywords / Tags */}
      {symbol.keywords && symbol.keywords.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground">Keywords &amp; Search Terms</h2>
          <div className="flex flex-wrap gap-1.5">
            {symbol.keywords.map((kw) => (
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
