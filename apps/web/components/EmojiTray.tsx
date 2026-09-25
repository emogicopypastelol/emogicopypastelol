"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { X, Pin, Check } from "lucide-react";
import type { TrayItem } from "@repo/types";
import { copyToClipboard } from "@/lib/clipboard";
import { getTrayItems, removeTrayItem, clearTray as clearStorageTray } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { isFlagEmoji, shouldRenderTwemoji, getTwemojiUrl } from "@/lib/flags";

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
  className,
}: {
  items?: TrayItem[];
  onRemove?: (index: number) => void;
  onClear?: () => void;
  className?: string;
} = {}) {
  const [internalItems, setInternalItems] = useState<TrayItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const queueRef = useRef<HTMLDivElement>(null);

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

  // Auto-scroll queue when new items are added so the latest emoji is always fully visible
  useEffect(() => {
    if (queueRef.current && items.length > 0) {
      queueRef.current.scrollTo({
        left: queueRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [items.length]);

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
    <div
      className={cn(
        "w-full flex items-center justify-center sticky top-[72px] sm:top-[76px] z-30 py-1 pointer-events-none transition-all duration-200",
        className
      )}
    >
      <div
        className={cn(
          "w-full max-w-2xl h-[52px] flex items-center gap-0 rounded-full border transition-all duration-200 pointer-events-auto",
          "bg-white backdrop-blur-md border-[#d8d8dc]",
          "shadow-[0_4px_20px_rgba(0,0,0,0.10),0_1px_6px_rgba(0,0,0,0.06)]",
          items.length > 0 && "ring-1 ring-black/5"
        )}
      >
        {/* Pin Icon — #FFDE34 yellow circle background */}
        <div
          className="flex-shrink-0 w-[52px] h-[52px] -ml-[1px] rounded-full flex items-center justify-center cursor-default shadow-sm"
          style={{ backgroundColor: "#FFDE34" }}
          title="Emoji Tray / Combo Builder"
        >
          <Pin size={20} className="rotate-45 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]" />
        </div>

        {/* Selected Emojis Queue */}
        <div
          ref={queueRef}
          className="flex-1 h-full flex items-center gap-1 overflow-x-auto scrollbar-none px-3 min-w-0"
        >
          {items.length === 0 ? (
            <span className="text-xs sm:text-sm text-muted-foreground/50 select-none whitespace-nowrap italic">
              Click emojis to build a combo…
            </span>
          ) : (
            items.map((item, index) => {
              const isFlag = isFlagEmoji(item.character);
              const useSvg = shouldRenderTwemoji(item.character);
              return (
                <button
                  key={`${item.id}-${index}`}
                  className="h-10 min-w-[36px] px-0.5 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 hover:scale-110 active:scale-95 transition-all duration-100 cursor-pointer emoji-char flex-shrink-0"
                  onClick={() => handleRemove(index)}
                  title={`Click to remove ${item.character}`}
                  type="button"
                >
                  {useSvg ? (
                    <img
                      src={getTwemojiUrl(item.character)}
                      alt={item.character}
                      className={isFlag ? "flag-emoji-img !w-[1.25em] !h-[0.9em]" : "twemoji-emoji-img !w-[1.35em] !h-[1.35em] object-contain"}
                      width={isFlag ? 20 : 22}
                      height={isFlag ? 14 : 22}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-2xl sm:text-[26px] leading-normal flex items-center justify-center select-none">
                      {item.character}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Clear Tray (×) Button */}
        {items.length > 0 && (
          <button
            onClick={handleClear}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors mr-1 cursor-pointer"
            title="Clear all"
            type="button"
            aria-label="Clear tray"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        )}

        {/* Copy Button — rounded green pill matching reference */}
        <button
          onClick={handleCopyAll}
          disabled={items.length === 0}
          className={cn(
            "flex-shrink-0 h-[52px]  w-[82px] px-5 rounded-full text-sm font-bold transition-all duration-150 flex items-center justify-center gap-1.5 mr-[5px] shadow-sm",
            items.length === 0
              ? "bg-[#d0d0d5] dark:bg-[#3a3a3e] text-white/70 cursor-not-allowed"
              : copied
                ? "bg-emerald-600 text-white scale-95 shadow-emerald-500/20"
                : "bg-[#00cba0] hover:bg-[#00b58e] active:scale-95 text-white shadow-[#00cba0]/25"
          )}
          title="Copy all emojis in tray to clipboard"
          type="button"
        >
          {copied ? (
            <>
              <Check size={16} strokeWidth={2.5} />
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
