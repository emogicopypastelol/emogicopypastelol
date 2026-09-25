import type { CharacterItem } from "@repo/types";
import { isFlagEmoji, shouldRenderTwemoji, getTwemojiUrl } from "@/lib/flags";
import { CopyHandler } from "./CopyHandler";

/**
 * Server-rendered character grid — outputs pure static HTML buttons.
 * Each button embeds data-* attributes for the CopyHandler client component.
 * Beautifully renders flags and Windows-unsupported emojis using Twemoji SVG.
 * Supports standard emojis (12 per row on desktop), symbols, and wide-format Kaomojis.
 * No "use client" directive — this is a Server Component.
 */
export function StaticCharacterGrid({
  items,
  gridId = "static-character-grid",
  isKaomoji = false,
}: {
  items: CharacterItem[];
  gridId?: string;
  isKaomoji?: boolean;
}) {
  const isKaomojiGrid = isKaomoji || items.some((i) => i.type === "kaomoji");

  return (
    <>
      <div id={gridId} className={isKaomojiGrid ? "kaomoji-grid" : "character-grid"}>
        {items.map((item) => {
          const itemIsKaomoji = isKaomojiGrid || item.type === "kaomoji";
          const isFlag = isFlagEmoji(item.character, item.category);
          const useSvg = shouldRenderTwemoji(item.character, item.category);

          return (
            <button
              key={item.id}
              className={itemIsKaomoji ? "kaomoji-cell" : "character-cell emoji-char"}
              data-char={item.character}
              data-name={item.name}
              data-id={item.id}
              title={`${item.name} — Click to copy`}
              aria-label={item.name}
              type="button"
            >
              {useSvg ? (
                <img
                  src={getTwemojiUrl(item.character)}
                  alt={item.name}
                  className={isFlag ? "flag-emoji-img" : "twemoji-emoji-img"}
                  width={isFlag ? 23 : 22}
                  height={isFlag ? 17 : 22}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              ) : (
                <span>{item.character}</span>
              )}
            </button>
          );
        })}
      </div>
      <CopyHandler gridRef={gridId} />
    </>
  );
}
