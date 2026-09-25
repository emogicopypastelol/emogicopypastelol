"use client";

import { useCallback, useEffect } from "react";
import { copyToClipboard } from "@/lib/clipboard";
import { addTrayItem } from "@/lib/storage";

/**
 * Client-side copy handler that attaches to a StaticCharacterGrid
 * via event delegation. No data prop needed — reads data-* attributes
 * from the clicked button element.
 *
 * Copies character to clipboard, appends to the Copy Bar (EmojiTray),
 * updates recent items in localStorage, and displays a tactile checkmark.
 */
export function CopyHandler({
  gridRef,
}: {
  gridRef: string;
}) {
  const handleClick = useCallback(async (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const button = target.closest<HTMLButtonElement>("button[data-char]");
    if (!button) return;

    const char = button.dataset.char;
    if (!char) return;

    const name = button.dataset.name || "";
    const id = button.dataset.id || char;

    // 1. Instant copy to clipboard
    copyToClipboard(char);

    // 2. Add to Copy Bar / Tray (dispatches 'copypaste:tray-updated')
    addTrayItem({ character: char, id });

    // 4. Tactile visual feedback: show checkmark badge
    const existing = button.querySelector(".copy-feedback");
    if (existing) existing.remove();

    const badge = document.createElement("span");
    badge.className = "copy-feedback";
    badge.textContent = "✓";
    button.appendChild(badge);

    setTimeout(() => {
      badge.remove();
    }, 900);
  }, []);

  useEffect(() => {
    // Attach to the specific grid container if available
    const container = document.getElementById(gridRef);
    if (container) {
      container.addEventListener("click", handleClick);
      return () => container.removeEventListener("click", handleClick);
    }

    // Global image fallback handler if an SVG fails to load
    const handleImgError = (e: Event) => {
      const img = e.target as HTMLImageElement | null;
      if (img && img.tagName === "IMG" && (img.classList.contains("twemoji-emoji-img") || img.classList.contains("flag-emoji-img"))) {
        const parent = img.parentElement;
        if (parent) {
          img.style.display = "none";
          const char = parent.getAttribute("data-char");
          if (char) {
            let fallback = parent.querySelector(".twemoji-fallback") as HTMLElement;
            if (!fallback) {
              fallback = document.createElement("span");
              fallback.className = "twemoji-fallback";
              fallback.textContent = char;
              parent.appendChild(fallback);
            }
          }
        }
      }
    };

    window.addEventListener("error", handleImgError, true);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("error", handleImgError, true);
    };
  }, [gridRef, handleClick]);

  return null;
}
