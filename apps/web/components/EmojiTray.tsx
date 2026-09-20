"use client";

import { useState, useCallback, useEffect } from "react";
import { X, Pin, Check } from "lucide-react";
import type { TrayItem } from "@repo/types";
import { copyToClipboard } from "@/lib/clipboard";
import { getTrayItems, removeTrayItem, clearTray as clearStorageTray } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { isFlagEmoji, getTwemojiUrl } from "@/lib/flags";

/**
 * Emoji Tray — the multi-select queue / Copy Bar from the design reference.
 * Users click emojis to add them to the tray, then copy all at once.
 * Matches the reference image: [ 📌  🥶😰😃😆ℹ️...   ✕  ( copy ) ]
 *
 * Can be controlled via props OR self-manages from localStorage with real-time sync.
 */
export function EmojiTray({
  items: propItems,
  onRemove: propOnRemove,
  onClear: propOnClear,
}: {
  items?: TrayItem[];
  onRemove?: (index: number) => void;
  onClear?: () => void;
} = {}) {
  const [internalItems, setInternalItems] = useState<TrayItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync with localStorage on client mount & listen for real-time updates
  useEffect(() => {
    setMounted(true);
    setInternalItems(getTrayItems());

    const handleTrayUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<TrayItem[]>;
      if (customEvent.detail) {
        setInternalItems(customEvent.detail);
      } else {
        setInternalItems(getTrayItems());
      }
    };

    window.addEventListener("copypaste:tray-updated", handleTrayUpdate);
    return () => {
      window.removeEventListener("copypaste:tray-updated", handleTrayUpdate);
    };
  }, []);

  // Use props if explicitly controlled, otherwise use synchronized internal state
  const items = propItems !== undefined ? propItems : (mounted ? internalItems : []);

  const handleRemove = useCallback(
    (index: number) => {
      if (propOnRemove) {
        propOnRemove(index);
      } else {
        const updated = removeTrayItem(index);
        setInternalItems([...updated]);
      }
    },
    [propOnRemove]
  );

  const handleClear = useCallback(() => {
    if (propOnClear) {
      propOnClear();
    } else {
      clearStorageTray();
      setInternalItems([]);
    }
  }, [propOnClear]);

  const handleCopyAll = useCallback(async () => {
    if (items.length === 0) return;
    const text = items.map((i) => i.character).join("");
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }, [items]);

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={cn(
          "w-full max-w-2xl flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/70",
          "bg-secondary/70 dark:bg-muted/50 backdrop-blur-sm shadow-sm transition-all duration-200",
          items.length > 0 && "ring-1 ring-primary/20 border-primary/30"
        )}
      >
        {/* Pin Icon button */}
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground/80 hover:text-foreground transition-colors cursor-default"
          title="Emoji Tray / Combo Builder"
        >
          <Pin size={15} className="rotate-45" />
        </div>

        {/* Selected Emojis Queue */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-none py-1 min-h-[34px]">
          {items.length === 0 ? (
            <span className="text-xs sm:text-sm text-muted-foreground/60 select-none pl-1 italic">
              Click emojis below to build a combo...
            </span>
          ) : (
            items.map((item, index) => {
              const isFlag = isFlagEmoji(item.character);
              return (
                <button
                  key={`${item.id}-${index}`}
                  className="text-xl sm:text-2xl hover:scale-125 transition-transform duration-100 cursor-pointer emoji-char px-0.5 leading-none flex items-center justify-center"
                  onClick={() => handleRemove(index)}
                  title={`Click to remove ${item.character}`}
                  type="button"
                >
                  {isFlag ? (
                    <img
                      src={getTwemojiUrl(item.character)}
                      alt={item.character}
                      className="flag-emoji-img !w-[1.25em] !h-[0.9em]"
                      loading="lazy"
                      draggable={false}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span>{item.character}</span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Clear Tray (X) Button */}
        {items.length > 0 && (
          <button
            onClick={handleClear}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            title="Clear all"
            type="button"
            aria-label="Clear tray"
          >
            <X size={14} />
          </button>
        )}

        {/* Copy Button (Pill button with teal styling) */}
        <button
          onClick={handleCopyAll}
          disabled={items.length === 0}
          className={cn(
            "flex-shrink-0 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center gap-1 shadow-sm",
            items.length === 0
              ? "bg-muted-foreground/20 text-muted-foreground/60 cursor-not-allowed"
              : copied
              ? "bg-emerald-600 text-white scale-95 shadow-emerald-500/20"
              : "bg-[#00cba0] hover:bg-[#00b58e] text-white active:scale-95 shadow-[#00cba0]/25 hover:shadow-md"
          )}
          title="Copy all emojis in tray to clipboard"
          type="button"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copied</span>
            </>
          ) : (
            "copy"
          )}
        </button>
      </div>
    </div>
  );
}
