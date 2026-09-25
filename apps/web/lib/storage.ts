/**
 * localStorage wrapper for CopyPaste Unicode platform.
 * Bounded storage, error handling, and graceful degradation
 * for private browsing and quota limits.
 */

import type { TrayItem } from "@repo/types";

const STORAGE_PREFIX = "copypaste:";
const MAX_TRAY_ITEMS = 200;

let storageAvailable: boolean | null = null;

function isAvailable(): boolean {
  if (storageAvailable !== null) return storageAvailable;
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return false;
  }
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
  return storageAvailable;
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

// ── Emoji Tray / Copy Bar Storage ─────────────────────────────

export function getTrayItems(): TrayItem[] {
  return getItem<TrayItem[]>("tray", []);
}

export function setTrayItems(items: TrayItem[]): void {
  setItem("tray", items.slice(0, MAX_TRAY_ITEMS));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("copypaste:tray-updated", { detail: items }));
  }
}

export function addTrayItem(item: TrayItem): TrayItem[] {
  const current = getTrayItems();
  const updated = [...current, item].slice(0, MAX_TRAY_ITEMS);
  setTrayItems(updated);
  return updated;
}

export function removeTrayItem(index: number): TrayItem[] {
  const current = getTrayItems();
  const updated = current.filter((_, i) => i !== index);
  setTrayItems(updated);
  return updated;
}

export function clearTray(): void {
  setItem("tray", []);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("copypaste:tray-updated", { detail: [] }));
  }
}
