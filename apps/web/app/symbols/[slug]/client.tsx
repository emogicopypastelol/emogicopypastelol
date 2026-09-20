"use client";

import type { CharacterItem } from "@repo/types";
import { CharacterGrid } from "@/components/CharacterGrid";

export function SymbolCategoryClient({ items }: { items: CharacterItem[] }) {
  return <CharacterGrid items={items} />;
}
