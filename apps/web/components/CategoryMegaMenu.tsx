"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ICON_MAP, FALLBACK_ICON } from "./CategoryIcon";

interface CategoryMenuItem {
  name: string;
  href: string;
  slug: string;
}

interface CategoryColumnConfig {
  title: string;
  viewAllHref: string;
  headerSlug: string;
  items: CategoryMenuItem[];
}

const EMOJI_COLUMN: CategoryColumnConfig = {
  title: "Emoji",
  viewAllHref: "/emoji",
  headerSlug: "flags",
  items: [
    { name: "Smileys & Emotion", href: "/emoji/smileys-emotion", slug: "smileys-emotion" },
    { name: "People & Body", href: "/emoji/people-body", slug: "people-body" },
    { name: "Animals & Nature", href: "/emoji/animals-nature", slug: "animals-nature" },
    { name: "Food & Drink", href: "/emoji/food-drink", slug: "food-drink" },
    { name: "Travel & Places", href: "/emoji/travel-places", slug: "travel-places" },
    { name: "Activities", href: "/emoji/activities", slug: "activities" },
    { name: "Objects", href: "/emoji/objects", slug: "objects" },
    { name: "Symbols", href: "/emoji/symbols", slug: "symbols" },
    { name: "Flags", href: "/emoji/flags", slug: "flags" },
  ],
};

const SYMBOLS_COLUMN: CategoryColumnConfig = {
  title: "Symbols",
  viewAllHref: "/symbols",
  headerSlug: "stars",
  items: [
    { name: "Hearts", href: "/symbols/hearts", slug: "hearts" },
    { name: "Stars", href: "/symbols/stars", slug: "stars" },
    { name: "Arrows", href: "/symbols/arrows", slug: "arrows" },
    { name: "Math", href: "/symbols/math", slug: "math" },
    { name: "Currency", href: "/symbols/currency", slug: "currency" },
    { name: "Shapes", href: "/symbols/shapes", slug: "shapes" },
    { name: "Line & Border", href: "/symbols/lines", slug: "lines" },
    { name: "Music", href: "/symbols/music", slug: "music" },
    { name: "Weather", href: "/symbols/weather", slug: "weather" },
    { name: "Technical", href: "/symbols/technical", slug: "technical" },
    { name: "Greek", href: "/symbols/greek", slug: "greek" },
  ],
};

const KAOMOJI_COLUMN: CategoryColumnConfig = {
  title: "Kaomoji",
  viewAllHref: "/kaomoji",
  headerSlug: "cute",
  items: [
    { name: "Happy", href: "/kaomoji/happy", slug: "happy" },
    { name: "Love", href: "/kaomoji/love", slug: "love" },
    { name: "Cute", href: "/kaomoji/cute", slug: "cute" },
    { name: "Shrug", href: "/kaomoji/shrug", slug: "shrug" },
    { name: "Sad", href: "/kaomoji/sad", slug: "sad" },
    { name: "Angry", href: "/kaomoji/angry", slug: "angry" },
    { name: "Animals", href: "/kaomoji/animals", slug: "animals" },
    { name: "Action", href: "/kaomoji/action", slug: "action" },
  ],
};

const ALL_COLUMNS = [EMOJI_COLUMN, SYMBOLS_COLUMN, KAOMOJI_COLUMN];

function getIconDef(slug: string) {
  return ICON_MAP[slug] ?? FALLBACK_ICON;
}

interface CategoryMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  secondaryTriggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function CategoryMegaMenu({
  isOpen,
  onClose,
  triggerRef,
  secondaryTriggerRef,
}: CategoryMegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [caretLeft, setCaretLeft] = React.useState<number | null>(null);
  const [menuLeft, setMenuLeft] = React.useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll with scrollbar compensation to eliminate CLS layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    // Keep the panel anchored to the Categories trigger while staying in the viewport.
    const updatePosition = () => {
      if (triggerRef.current && menuRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const menuRect = menuRef.current.getBoundingClientRect();
        const left = Math.max(
          16,
          Math.min(
            triggerRect.left - 12,
            window.innerWidth - menuRect.width - 16
          )
        );
        setMenuLeft(left);
        setCaretLeft(triggerRect.left - left + triggerRect.width / 2);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      if (
        menuRef.current?.contains(target) ||
        triggerRef.current?.contains(target) ||
        secondaryTriggerRef?.current?.contains(target)
      ) {
        return;
      }
      onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("resize", updatePosition);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef, secondaryTriggerRef]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay — visible enough to separate menu from page */}
      <div
        className="fixed inset-0 top-[70px] z-40 transition-opacity duration-200"
        style={{ backgroundColor: "rgba(148, 163, 184, 0.14)", backdropFilter: "blur(1px)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Positioning wrapper — centered under navbar */}
      <div
        className="absolute top-full left-0 right-0 z-50 flex justify-start pt-2.5"
        role="menu"
        aria-label="Category mega menu"
        style={{
          animation: "megamenu-enter 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        <div
          ref={menuRef}
          className="relative bg-white border border-[#e2e4e9]"
          style={{
            width: "900px",
            maxWidth: "calc(100vw - 32px)",
            maxHeight: "calc(100vh - 90px)",
            overflowY: "auto",
            flex: "0 1 900px",
            borderRadius: "16px",
            marginLeft: menuLeft ?? 16,
            padding: "10px 18px",
            boxShadow:
              "0 12px 40px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.03)",
          }}
        >
          {/* Caret arrow */}
          {caretLeft !== null && (
            <div
              className="absolute -top-[7px] w-[13px] h-[13px] bg-white border-t border-l border-[#e2e4e9]"
              style={{
                left: `${caretLeft}px`,
                transform: `translateX(-50%) rotate(45deg)`,
              }}
              aria-hidden="true"
            />
          )}

          {/* 3-Column layout with dividers as separate elements */}
          <div className="flex flex-col md:flex-row">
            {ALL_COLUMNS.map((column, colIdx) => {
              const headerDef = getIconDef(column.headerSlug);
              const HeaderIcon = headerDef.icon;
              return (
                <React.Fragment key={column.title}>
                  {/* Vertical divider between columns */}
                  {colIdx > 0 && (
                    <div className="hidden md:block w-px shrink-0 bg-[#f0f0f3] my-1" />
                  )}
                  {/* Mobile horizontal divider */}
                  {colIdx > 0 && (
                    <div className="md:hidden h-px bg-[#f0f0f3] my-2" />
                  )}
                  <div
                    className="flex-1 min-w-0 flex flex-col"
                    style={{ padding: "0 14px" }}
                  >
                    {/* Section Header */}
                    <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-[#f0f0f3]">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 ${headerDef.bg} ${headerDef.fg}`}
                        >
                          <HeaderIcon size={16} className="stroke-[2.2]" />
                        </div>
                        <h3 className="text-[15px] font-bold tracking-[-0.01em] text-[#111827]">
                          {column.title}
                        </h3>
                      </div>
                      <Link
                        href={column.viewAllHref}
                        onClick={onClose}
                        className="text-[12.5px] font-semibold text-[#10b981] hover:text-[#059669] transition-colors flex items-center gap-0.5 shrink-0 ml-3"
                      >
                        View all
                        <span className="text-[11px]">→</span>
                      </Link>
                    </div>

                    {/* Category List */}
                    <div className="flex flex-col">
                      {column.items.map((item) => {
                        const itemDef = getIconDef(item.slug);
                        const ItemIcon = itemDef.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center justify-between h-[30px] px-1 -mx-1 rounded-lg hover:bg-[#f5f6f8] transition-colors duration-150 group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 ${itemDef.bg} ${itemDef.fg}`}
                              >
                                <ItemIcon size={15} className="stroke-[2.2]" />
                              </div>
                              <span className="text-[14px] leading-none font-normal text-[#4b5563] group-hover:text-[#111827] transition-colors truncate">
                                {item.name}
                              </span>
                            </div>
                            <ChevronRight
                              size={14}
                              className="text-[#d1d5db] group-hover:text-[#9ca3af] group-hover:translate-x-0.5 transition-all duration-150 shrink-0 ml-2"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
