"use client";

import { useState, useRef, useEffect } from "react";

/**
 * ShowAllButton — tiny client component that reveals hidden emoji.
 * Uses IntersectionObserver to auto-reveal when user scrolls near,
 * or reveals on click. Minimal JS footprint.
 */
export function ShowAllButton({
  containerId,
}: {
  containerId: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (revealed) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          revealAll();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [revealed]);

  function revealAll() {
    setRevealed(true);
    const container = document.getElementById(containerId);
    if (container) {
      container.style.display = "";
    }
  }

  if (revealed) return null;

  return (
    <div ref={sentinelRef} className="flex justify-center pt-4 pb-2">
      <button
        type="button"
        onClick={revealAll}
        className="px-5 py-2.5 text-sm font-medium text-[#059669] bg-[#ecfdf5] hover:bg-[#d1fae5] rounded-full transition-colors"
      >
        Show all emoji
      </button>
    </div>
  );
}
