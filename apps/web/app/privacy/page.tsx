import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for CopyPaste Unicode.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <div className="text-sm leading-relaxed space-y-4 text-muted-foreground">
        <p><strong className="text-foreground">Last updated:</strong> <time dateTime="2026-09-22">September 22, 2026</time></p>

        <h2 className="text-base font-semibold text-foreground mt-6">Data We Collect</h2>
        <p>CopyPaste Unicode does not collect personal data. We do not require accounts, and we do not use tracking cookies.</p>

        <h2 className="text-base font-semibold text-foreground mt-6">Local Storage</h2>
        <p>Your favorites and recently copied items are stored locally in your browser using localStorage. This data never leaves your device.</p>

        <h2 className="text-base font-semibold text-foreground mt-6">Analytics</h2>
        <p>We may use privacy-respecting analytics services to understand aggregate traffic patterns. No personally identifiable information is collected.</p>

        <h2 className="text-base font-semibold text-foreground mt-6">Advertising</h2>
        <p>This site may display advertisements. Ad networks may use cookies as described in their own privacy policies.</p>

        <h2 className="text-base font-semibold text-foreground mt-6">Contact</h2>
        <p>For privacy questions, contact us through the information on our About page.</p>
      </div>
    </div>
  );
}
