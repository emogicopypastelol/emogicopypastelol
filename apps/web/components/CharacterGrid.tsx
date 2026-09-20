"use client";

import { useState, useCallback } from "react";
import type { CharacterItem, TrayItem } from "@repo/types";
import { copyToClipboard } from "@/lib/clipboard";
import { addRecentItem, addTrayItem } from "@/lib/storage";
import { isFlagEmoji, getTwemojiUrl } from "@/lib/flags";

/**
 * A single emoji/symbol cell in the grid.
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
  const isFlag = isFlagEmoji(item.character, item.category);

  const handleClick = useCallback(async () => {
    // 1. Instant copy to clipboard with tactile feedback
    copyToClipboard(item.character);
    setCopied(true);
    addRecentItem({
      character: item.character,
      name: item.name,
      id: item.id,
    });
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
      className="character-cell emoji-char"
      onClick={handleClick}
      title={`${item.name} — Click to ${onAddToTray ? "add" : "copy"}`}
      aria-label={`${item.name}`}
      type="button"
    >
      {copied ? (
        <span className="copy-feedback">✓</span>
      ) : null}
      {isFlag && !imgError ? (
        <img
          src={getTwemojiUrl(item.character)}
          alt={item.name}
          className="flag-emoji-img"
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
 * Grid of character cells.
 */
export function CharacterGrid({
  items,
  onAddToTray,
}: {
  items: CharacterItem[];
  onAddToTray?: (item: TrayItem) => void;
}) {
  return (
    <div className="character-grid">
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
