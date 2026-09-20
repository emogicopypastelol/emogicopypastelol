import type { CharacterItem } from "@repo/types";
import { isFlagEmoji, getTwemojiUrl } from "@/lib/flags";
import { CopyHandler } from "./CopyHandler";

/**
 * Server-rendered character grid — outputs pure static HTML buttons.
 * Each button embeds data-* attributes for the CopyHandler client component.
 * Beautifully renders flags across all operating systems using Twemoji SVG.
 * No "use client" directive — this is a Server Component.
 */
export function StaticCharacterGrid({
  items,
  gridId = "static-character-grid",
}: {
  items: CharacterItem[];
  gridId?: string;
}) {
  return (
    <>
      <div id={gridId} className="character-grid">
        {items.map((item) => {
          const isFlag = isFlagEmoji(item.character, item.category);
          return (
            <button
              key={item.id}
              className="character-cell emoji-char"
              data-char={item.character}
              data-name={item.name}
              data-id={item.id}
              title={`${item.name} — Click to copy`}
              aria-label={item.name}
              type="button"
            >
              {isFlag ? (
                <img
                  src={getTwemojiUrl(item.character)}
                  alt={item.name}
                  className="flag-emoji-img"
                  loading="lazy"
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
