/**
 * localStorage wrapper with bounded storage, error handling,
 * and graceful degradation for private browsing / quota exceeded.
 */

import type { RecentItem, TrayItem } from "@repo/types";

const STORAGE_PREFIX = "copypaste:";
const MAX_RECENT = 100;
const MAX_FAVORITES = 500;

function isAvailable(): boolean {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function getItem<T>(key: string, fallback: T): T {
  if (!isAvailable()) return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (!isAvailable()) return;
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    // Quota exceeded — silently fail
  }
}

// ── Recent Items ──────────────────────────────────────────────

export function getRecentItems(): RecentItem[] {
  return getItem<RecentItem[]>("recent", []);
}

export function addRecentItem(item: Omit<RecentItem, "timestamp">): void {
  const recent = getRecentItems();
  // Remove existing duplicate
  const filtered = recent.filter((r) => r.id !== item.id);
  // Add to front
  filtered.unshift({ ...item, timestamp: Date.now() });
  // Trim to max
  setItem("recent", filtered.slice(0, MAX_RECENT));
}

export function clearRecentItems(): void {
  setItem("recent", []);
}

// ── Favorites ─────────────────────────────────────────────────

export function getFavorites(): string[] {
  return getItem<string[]>("favorites", []);
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: string): boolean {
  const favorites = getFavorites();
  const index = favorites.indexOf(id);

  if (index >= 0) {
    favorites.splice(index, 1);
    setItem("favorites", favorites);
    return false; // Removed
  } else {
    if (favorites.length >= MAX_FAVORITES) {
      favorites.pop(); // Remove oldest
    }
    favorites.unshift(id);
    setItem("favorites", favorites);
    return true; // Added
  }
}

// ── Emoji Tray ────────────────────────────────────────────────

export function getTrayItems(): TrayItem[] {
  return getItem<TrayItem[]>("tray", []);
}

export function setTrayItems(items: TrayItem[]): void {
  setItem("tray", items);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("copypaste:tray-updated", { detail: items }));
  }
}

export function addTrayItem(item: TrayItem): TrayItem[] {
  const tray = getTrayItems();
  tray.push(item);
  setItem("tray", tray);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("copypaste:tray-updated", { detail: tray }));
  }
  return tray;
}

export function removeTrayItem(index: number): TrayItem[] {
  const tray = getTrayItems();
  tray.splice(index, 1);
  setItem("tray", tray);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("copypaste:tray-updated", { detail: tray }));
  }
  return tray;
}

export function clearTray(): void {
  setItem("tray", []);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("copypaste:tray-updated", { detail: [] }));
  }
}

// ── Theme ─────────────────────────────────────────────────────

export function getStoredTheme(): string {
  return getItem<string>("theme", "system");
}

export function setStoredTheme(theme: string): void {
  setItem("theme", theme);
}
