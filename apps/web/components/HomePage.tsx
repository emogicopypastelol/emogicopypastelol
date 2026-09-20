"use client";

import { useState, useCallback, useEffect } from "react";
import type { TrayItem } from "@repo/types";
import { EmojiTray } from "@/components/EmojiTray";
import { SearchBox } from "@/components/SearchBox";
import { getTrayItems, addTrayItem, removeTrayItem, clearTray, addRecentItem } from "@/lib/storage";

/**
 * Client-side interactivity layer for the homepage & category pages.
 * Provides global search and the interactive Copy Bar (EmojiTray).
 * Fully synchronized with localStorage and custom window events.
 */
export function HomePageClient() {
  const [trayItems, setTrayItems] = useState<TrayItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTrayItems(getTrayItems());

    const handleTrayUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<TrayItem[]>;
      if (customEvent.detail) {
        setTrayItems(customEvent.detail);
      } else {
        setTrayItems(getTrayItems());
      }
    };

    window.addEventListener("copypaste:tray-updated", handleTrayUpdate);
    return () => {
      window.removeEventListener("copypaste:tray-updated", handleTrayUpdate);
    };
  }, []);

  const handleAddToTray = useCallback((item: TrayItem) => {
    const updated = addTrayItem(item);
    setTrayItems([...updated]);
    addRecentItem({ character: item.character, name: "", id: item.id });
  }, []);

  const handleRemoveFromTray = useCallback((index: number) => {
    const updated = removeTrayItem(index);
    setTrayItems([...updated]);
  }, []);

  const handleClearTray = useCallback(() => {
    clearTray();
    setTrayItems([]);
  }, []);

  return (
    <>
      {/* Global Search Input — lazy-loads its own search index */}
      <SearchBox onAddToTray={handleAddToTray} />

      {/* Copy Bar / Emoji Tray */}
      <div className="mt-3">
        <EmojiTray
          items={mounted ? trayItems : []}
          onRemove={handleRemoveFromTray}
          onClear={handleClearTray}
        />
      </div>
    </>
  );
}
