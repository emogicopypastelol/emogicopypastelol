"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Copy, Info } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const isInfoPage = pathname === "/info" || pathname?.startsWith("/info/");
  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl flex h-14 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-foreground hover:opacity-80 transition-opacity">
            <Copy size={20} className="text-primary" />
            <span className="hidden sm:inline">CopyPaste</span>
          </Link>
        </div>
      </header>

      {/* Floating Information Button on Bottom Right */}
      {!isInfoPage && (
        <Link
          href="/info"
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-background/90 dark:bg-card/90 border border-border/80 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 backdrop-blur-sm transition-all duration-200 group"
          title="Site Information"
          aria-label="Site information"
        >
          <Info size={22} className="text-[#0eb780] transition-transform group-hover:scale-110" style={{ color: "#0eb780" }} />
        </Link>
      )}
    </>
  );
}
