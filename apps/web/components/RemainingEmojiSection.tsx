"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { CharacterItem } from "@repo/types";
import { CharacterGrid } from "./CharacterGrid";
import { Loader2 } from "lucide-react";

import { loadEmojiIndex } from "@/lib/searchIndex";

export function RemainingEmojiSection({
  initialCount = 120,
}: {
  initialCount?: number;
}) {
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remainingItems, setRemainingItems] = useState<CharacterItem[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const inFlightRef = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadRemaining = useCallback(async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setLoading(true);
    try {
      const all = await loadEmojiIndex();
      const rest = all.slice(initialCount);
      if (isMountedRef.current) {
        setRemainingItems(rest);
        setRevealed(true);
      }
    } finally {
      inFlightRef.current = false;
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [initialCount]);

  useEffect(() => {
    if (revealed) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadRemaining();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
    };
  }, [revealed, loadRemaining]);

  if (revealed && remainingItems.length > 0) {
    return (
      <section className="pt-2 animate-fade-in" aria-label="Additional emojis">
        <CharacterGrid items={remainingItems} />
      </section>
    );
  }

  return (
    <div ref={sentinelRef} className="flex flex-col items-center justify-center py-6">
      {!revealed && (
        <button
          type="button"
          onClick={loadRemaining}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-[#059669] bg-[#ecfdf5] hover:bg-[#d1fae5] active:scale-95 rounded-full transition-all shadow-sm"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Loading all emojis…</span>
            </>
          ) : (
            <span>Show all emoji (1,800+)</span>
          )}
        </button>
      )}
    </div>
  );
}
