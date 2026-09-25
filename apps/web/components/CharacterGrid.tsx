"use client";

import { useState, useCallback } from "react";
import type { CharacterItem, TrayItem } from "@repo/types";
import { copyToClipboard } from "@/lib/clipboard";
import { addTrayItem } from "@/lib/storage";
import { isFlagEmoji, shouldRenderTwemoji, getTwemojiUrl } from "@/lib/flags";

/**
 * A single emoji/symbol/kaomoji cell in the grid.
 * One click copies OR adds to tray depending on mode.
 * Shows brief "✓" feedback on copy.
 */
export function CharacterCell({
  item,
  onAddToTray,
}: {
  item: CharacterItem;
  onAddToTray?: (item: TrayItem) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isKaomoji = item.type === "kaomoji";
  const isFlag = isFlagEmoji(item.character, item.category);
  const useSvg = shouldRenderTwemoji(item.character, item.category);

  const handleClick = useCallback(async () => {
    // 1. Instant copy to clipboard with tactile feedback
    copyToClipboard(item.character);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);

    // 2. Also append to tray for combo building
    if (onAddToTray) {
      onAddToTray({ character: item.character, id: item.id });
    } else {
      addTrayItem({ character: item.character, id: item.id });
    }
  }, [item, onAddToTray]);

  return (
    <button
      className={isKaomoji ? "kaomoji-cell" : "character-cell emoji-char"}
      onClick={handleClick}
      title={`${item.name} — Click to ${onAddToTray ? "add" : "copy"}`}
      aria-label={`${item.name}`}
      type="button"
    >
      {copied ? (
        <span className="copy-feedback">✓</span>
      ) : null}
      {useSvg && !imgError ? (
        <img
          src={getTwemojiUrl(item.character)}
          alt={item.name}
          className={isFlag ? "flag-emoji-img" : "twemoji-emoji-img"}
          loading="lazy"
          draggable={false}
          onError={() => setImgError(true)}
        />
      ) : (
        <span>{item.character}</span>
      )}
    </button>
  );
}

/**
 * Grid of character cells (responsive: 15 per row on desktop for emojis, wide for kaomojis).
 */
export function CharacterGrid({
  items,
  onAddToTray,
  isKaomoji,
}: {
  items: CharacterItem[];
  onAddToTray?: (item: TrayItem) => void;
  isKaomoji?: boolean;
}) {
  const isKaomojiGrid = isKaomoji || items.some((i) => i.type === "kaomoji");

  return (
    <div className={isKaomojiGrid ? "kaomoji-grid" : "character-grid"}>
      {items.map((item) => (
        <CharacterCell
          key={item.id}
          item={item}
          onAddToTray={onAddToTray}
        />
      ))}
    </div>
  );
}
