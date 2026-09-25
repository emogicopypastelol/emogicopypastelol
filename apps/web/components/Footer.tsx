import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Categories</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/emoji" className="hover:text-foreground transition-colors">Emoji</Link></li>
              <li><Link href="/symbols" className="hover:text-foreground transition-colors">Symbols</Link></li>
              <li><Link href="/kaomoji" className="hover:text-foreground transition-colors">Kaomoji</Link></li>
            </ul>
          </div>

          {/* Popular */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Popular</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/symbols/hearts" className="hover:text-foreground transition-colors">Heart Symbols</Link></li>
              <li><Link href="/symbols/arrows" className="hover:text-foreground transition-colors">Arrow Symbols</Link></li>
              <li><Link href="/symbols/stars" className="hover:text-foreground transition-colors">Star Symbols</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Tools</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/symbols/math" className="hover:text-foreground transition-colors">Math Symbols</Link></li>
              <li><Link href="/symbols/currency" className="hover:text-foreground transition-colors">Currency Symbols</Link></li>
              <li><Link href="/symbols/greek" className="hover:text-foreground transition-colors">Greek Letters</Link></li>
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">About</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} CopyPaste Unicode. All characters are part of the Unicode Standard.</p>
        </div>
      </div>
    </footer>
  );
}
