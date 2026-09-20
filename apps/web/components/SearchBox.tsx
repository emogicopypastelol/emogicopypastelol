"use client";

import { useState, useRef, useCallback, useEffect, type KeyboardEvent } from "react";
import { Search, X, Loader2 } from "lucide-react";
import type { CharacterItem, SearchResult, TrayItem } from "@repo/types";
import { search } from "@repo/search";
import { CharacterGrid } from "./CharacterGrid";

// In-memory module cache for lazy-loaded search index
let cachedSearchIndex: CharacterItem[] | null = null;
let fetchPromise: Promise<CharacterItem[]> | null = null;

async function loadSearchIndex(): Promise<CharacterItem[]> {
  if (cachedSearchIndex) return cachedSearchIndex;
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch("/data/search-index.json")
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load search index: ${res.status}`);
      return res.json();
    })
    .then((data: CharacterItem[]) => {
      cachedSearchIndex = data;
      return data;
    })
    .catch((err) => {
      console.error("Error loading search index:", err);
      fetchPromise = null;
      return [];
    });

  return fetchPromise;
}

/**
 * Global search box with client-side instant search.
 * Lazy-loads the minimal search index (~80 KB) only when the user
 * interacts with the input (focus or typing).
 */
export function SearchBox({
  allItems,
  onClose,
  onAddToTray,
  autoFocus = false,
}: {
  allItems?: CharacterItem[];
  onClose?: () => void;
  onAddToTray?: (item: TrayItem) => void;
  autoFocus?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoadingIndex, setIsLoadingIndex] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingQueryRef = useRef<string>("");

  // Trigger preload of search index
  const ensureIndexLoaded = useCallback(async (): Promise<CharacterItem[]> => {
    if (allItems && allItems.length > 0) return allItems;
    if (cachedSearchIndex) return cachedSearchIndex;

    setIsLoadingIndex(true);
    try {
      const data = await loadSearchIndex();
      return data;
    } finally {
      setIsLoadingIndex(false);
    }
  }, [allItems]);

  // If autoFocus requested, focus and warm up the index
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
      ensureIndexLoaded();
    }
  }, [autoFocus, ensureIndexLoaded]);

  const performSearch = useCallback(
    (value: string, items: CharacterItem[]) => {
      if (value.trim().length === 0) {
        setResults([]);
        return;
      }
      const searchResults = search(items, value, 60);
      setResults(searchResults);
    },
    []
  );

  const handleSearch = useCallback(
    async (value: string) => {
      setQuery(value);
      pendingQueryRef.current = value;

      if (value.trim().length === 0) {
        setResults([]);
        return;
      }

      const items = allItems || cachedSearchIndex;
      if (items && items.length > 0) {
        performSearch(value, items);
      } else {
        const loadedItems = await ensureIndexLoaded();
        // Only run search if query hasn't changed while loading
        if (pendingQueryRef.current === value) {
          performSearch(value, loadedItems);
        }
      }
    },
    [allItems, ensureIndexLoaded, performSearch]
  );

  const handleFocus = useCallback(() => {
    ensureIndexLoaded();
  }, [ensureIndexLoaded]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      if (query) {
        setQuery("");
        setResults([]);
      } else {
        onClose?.();
      }
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    pendingQueryRef.current = "";
    inputRef.current?.focus();
  };

  return (
    <div className="w-full">
      <div className="search-input-wrapper relative flex items-center">
        {isLoadingIndex ? (
          <Loader2 className="search-icon animate-spin text-muted-foreground" size={18} />
        ) : (
          <Search className="search-icon" size={18} />
        )}
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search Emoji, Symbols..."
          value={query}
          onFocus={handleFocus}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={200}
          autoComplete="off"
          spellCheck={false}
          id="global-search"
          aria-label="Search characters"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
            type="button"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-4 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-3">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
          <CharacterGrid
            items={results.map((r) => r.item)}
            onAddToTray={onAddToTray}
          />
        </div>
      )}

      {query && results.length === 0 && !isLoadingIndex && (
        <div className="mt-6 text-center animate-fade-in">
          <p className="text-muted-foreground text-sm">
            No results for &ldquo;{query}&rdquo;
          </p>
          <p className="text-muted-foreground/60 text-xs mt-1">
            Try searching for &ldquo;heart&rdquo;, &ldquo;star&rdquo;, &ldquo;arrow&rdquo;, or &ldquo;smile&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
