import Link from "next/link";
import { Copy, Info } from "lucide-react";
import { NavbarClient } from "./NavbarClient";

/**
 * Navbar — Server Component.
 * Static logo, header structure, and Info button are server-rendered (zero JS).
 * Interactive elements (mega menu, mobile menu) are in the NavbarClient boundary.
 */
export function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-[#e8e8eb]">
        <div className="w-full flex items-center justify-between h-[68px] md:h-[70px] px-4 sm:px-6 md:px-6 lg:px-8 xl:px-10 relative">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              aria-label="CopyPaste Home"
              title="CopyPaste"
              className="group flex shrink-0 items-center gap-2.5 select-none"
            >
              <div
                className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-[11px] md:rounded-[12px] bg-[#10b981] text-white shadow-[0_3px_10px_rgba(16,185,129,0.18)] transition-transform duration-150 group-hover:scale-[1.03]"
                style={{ padding: "5px" }}
              >
                <Copy size={19} strokeWidth={2.2} />
              </div>
              <span className="whitespace-nowrap text-lg md:text-[19px] font-bold leading-none tracking-[-0.025em] text-[#171719]">
                CopyPaste
              </span>
            </Link>
          </div>

          {/* Interactive Navigation (Desktop menu & Mobile drawer) */}
          <NavbarClient />
        </div>
      </header>

      {/* Floating Info Button (Bottom Right) */}
      <InfoButton />
    </>
  );
}

/**
 * Info button — Server Component.
 * Fixed floating button pointing to /info directory.
 */
function InfoButton() {
  return (
    <Link
      href="/info"
      title="Site Directory & Legal Info"
      aria-label="Site directory & legal info"
      className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#e1e1e4] bg-white text-[#10b981] shadow-[0_4px_16px_rgba(0,0,0,0.10)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.13)] active:scale-95"
    >
      <Info size={19} strokeWidth={2} />
    </Link>
  );
}