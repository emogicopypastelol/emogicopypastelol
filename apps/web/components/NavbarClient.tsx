"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Lazy-loaded: defers the CategoryMegaMenu bundle (~11 KB) until first interaction.
const CategoryMegaMenu = dynamic(
  () => import("./CategoryMegaMenu").then((m) => ({ default: m.CategoryMegaMenu })),
  { ssr: false, loading: () => null }
);

const MAIN_LINKS = [
  { href: "/emoji", label: "Emoji" },
  { href: "/symbols", label: "Symbols" },
  { href: "/kaomoji", label: "Kaomoji" },
] as const;

/**
 * NavbarClient — interactive navigation wrapper for the navbar.
 * Handles both:
 * 1. Desktop Categories navigation & MegaMenu dropdown
 * 2. Mobile hamburger button and slide-down drawer
 * Accessible across all viewports without being trapped in hidden parents.
 */
export function NavbarClient() {
  const pathname = usePathname();

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categoriesTriggerRef = useRef<HTMLButtonElement>(null);

  const isCategoryActive =
    pathname?.startsWith("/emoji") ||
    pathname?.startsWith("/symbols") ||
    pathname?.startsWith("/kaomoji");

  useEffect(() => {
    setIsCategoriesOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop Categories Button (visible only md and up) */}
      <nav
        className="hidden md:flex items-center gap-2 mr-auto"
        style={{ marginLeft: 36 }}
        aria-label="Main Navigation"
      >
        {MAIN_LINKS.map(({ href, label }) => {
          const active = pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={cn(
                "flex h-10 items-center rounded-lg px-3 text-[15px] outline-none transition-colors",
                active
                  ? "font-semibold text-[#059669]"
                  : "font-medium text-[#65676d] hover:bg-[#f6f6f7] hover:text-[#171719]"
              )}
            >
              {label}
            </Link>
          );
        })}
        <button
          ref={categoriesTriggerRef}
          type="button"
          onClick={() => setIsCategoriesOpen((prev) => !prev)}
          aria-expanded={isCategoriesOpen}
          aria-haspopup="true"
          className={cn(
            "relative flex h-10 items-center gap-1.5 rounded-lg px-3 text-[15px] outline-none transition-colors",
            isCategoriesOpen || isCategoryActive
              ? "font-semibold text-[#059669]"
              : "font-medium text-[#65676d] hover:bg-[#f6f6f7] hover:text-[#171719]"
          )}
        >
          <span>Categories</span>
          <ChevronDown
            size={15}
            strokeWidth={2}
            className={cn(
              "transition-transform duration-200",
              isCategoriesOpen && "rotate-180"
            )}
          />
          {(isCategoriesOpen || isCategoryActive) && (
            <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#10b981]" />
          )}
        </button>
      </nav>

      {/* Mobile Hamburger Button (visible only below md) */}
      <div className="flex md:hidden items-center">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e1e1e4] bg-white text-[#55575e] transition-colors hover:bg-[#f6f6f7] hover:text-[#171719]"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Category Mega Menu (Desktop) */}
      <CategoryMegaMenu
        isOpen={isCategoriesOpen}
        onClose={() => setIsCategoriesOpen(false)}
        triggerRef={categoriesTriggerRef}
      />

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="border-t border-[#ededee] bg-white px-5 py-4 md:hidden fixed top-[68px] left-0 right-0 z-50 shadow-lg">
          <nav className="flex flex-col gap-1">
            {MAIN_LINKS.map(({ href, label }) => {
              const active = pathname?.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex h-11 items-center rounded-xl px-4 text-[15px]",
                    active
                      ? "bg-[#ecfdf5] font-semibold text-[#059669]"
                      : "font-medium text-[#55575e] hover:bg-[#f7f7f8]"
                  )}
                >
                  {label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setIsCategoriesOpen((prev) => !prev);
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "flex h-11 items-center justify-between rounded-xl px-4 text-[15px]",
                isCategoriesOpen || isCategoryActive
                  ? "bg-[#ecfdf5] font-semibold text-[#059669]"
                  : "font-medium text-[#55575e] hover:bg-[#f7f7f8]"
              )}
            >
              <span>Categories</span>
              <ChevronDown
                size={17}
                className={cn(
                  "transition-transform",
                  isCategoriesOpen && "rotate-180"
                )}
              />
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
