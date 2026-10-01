"use client";

import { useState, useRef, useCallback, useEffect, type KeyboardEvent, type ComponentType } from "react";
import { Search, X, Loader2 } from "lucide-react";
import type { CharacterItem, SearchResult, TrayItem } from "@repo/types";
import { loadSearchIndex, getCachedSearchIndex } from "@/lib/searchIndex";

type CharacterGridComponent = ComponentType<{
  items: CharacterItem[];
  onAddToTray?: (item: TrayItem) => void;
}>;

/**
 * Global search box with client-side instant search.
 * Loads the search index only after the user
 * interacts with the input (focus or typing).
 */
export function SearchBox({
  allItems,
  onClose,
  onAddToTray,
  autoFocus = false,
  className = "",
}: {
  allItems?: CharacterItem[];
  onClose?: () => void;
  onAddToTray?: (item: TrayItem) => void;
  autoFocus?: boolean;
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoadingIndex, setIsLoadingIndex] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingQueryRef = useRef<string>("");
  const [GridComponent, setGridComponent] = useState<CharacterGridComponent | null>(null);
  const gridLoadingRef = useRef(false);
  const gridLoadedRef = useRef(false);

  // Trigger preload of search index
  const ensureIndexLoaded = useCallback(async (): Promise<CharacterItem[]> => {
    if (allItems && allItems.length > 0) return allItems;
    const cached = getCachedSearchIndex();
    if (cached) return cached;

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
    async (value: string, items: CharacterItem[]) => {
      if (value.trim().length === 0) {
        setResults([]);
        setIsLoadingSearch(false);
        return;
      }
      setIsLoadingSearch(true);
      try {
        const { search } = await import("@repo/search");
        if (pendingQueryRef.current !== value) return;
        const searchResults = search(items, value, 60);
        setResults(searchResults);
        if (searchResults.length > 0 && !gridLoadedRef.current && !gridLoadingRef.current) {
          gridLoadingRef.current = true;
          try {
            const gridModule = await import("./CharacterGrid");
            gridLoadedRef.current = true;
            setGridComponent(() => gridModule.CharacterGrid);
          } finally {
            gridLoadingRef.current = false;
          }
        }
      } catch {
        if (pendingQueryRef.current === value) setResults([]);
      } finally {
        if (pendingQueryRef.current === value) setIsLoadingSearch(false);
      }
    },
    []
  );

  const handleSearch = useCallback(
    async (value: string) => {
      setQuery(value);
      pendingQueryRef.current = value;

      if (value.trim().length === 0) {
        setResults([]);
        setIsLoadingSearch(false);
        return;
      }

      const items = allItems || getCachedSearchIndex();
      if (items && items.length > 0) {
        await performSearch(value, items);
      } else {
        const loadedItems = await ensureIndexLoaded();
        // Only run search if query hasn't changed while loading
        if (pendingQueryRef.current === value) {
          await performSearch(value, loadedItems);
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
        pendingQueryRef.current = "";
        setIsLoadingSearch(false);
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
    <div className={`w-full ${className}`}>
      <div className="search-input-wrapper relative flex items-center">
        {isLoadingIndex || isLoadingSearch ? (
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
      {results.length > 0 && GridComponent && (
        <div className="mt-4 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-3">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
          <GridComponent
            items={results.map((r) => r.item)}
            onAddToTray={onAddToTray}
          />
        </div>
      )}

      {query && results.length === 0 && !isLoadingIndex && !isLoadingSearch && (
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
