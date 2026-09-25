import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About CopyPaste Unicode — the fastest way to find and copy emoji and symbols.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">About CopyPaste Unicode</h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed space-y-4">
        <p>
          CopyPaste Unicode is a free, fast utility for finding and copying emoji, symbols,
          and Unicode characters. No accounts, no sign-ups — just search, click, and paste.
        </p>

        <h2 className="text-lg font-semibold mt-6">How It Works</h2>
        <p>
          All search and copy operations happen directly in your browser. Nothing is sent to any server.
          Your favorites and history are stored locally on your device.
        </p>

        <h2 className="text-lg font-semibold mt-6">Data Sources</h2>
        <p>
          Character data comes from the official Unicode Standard and the Unicode CLDR
          (Common Locale Data Repository).
        </p>

        <h2 className="text-lg font-semibold mt-6">Privacy</h2>
        <p>
          We don&apos;t collect personal data. We don&apos;t use cookies for tracking.
          Everything runs client-side.
        </p>
      </div>
    </div>
  );
}
