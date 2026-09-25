import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for CopyPaste Unicode.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <div className="text-sm leading-relaxed space-y-4 text-muted-foreground">
        <p><strong className="text-foreground">Last updated:</strong> <time dateTime="2026-09-22">September 22, 2026</time></p>

        <h2 className="text-base font-semibold text-foreground mt-6">Use of Service</h2>
        <p>CopyPaste Unicode provides Unicode character data for informational and utility purposes. You may use the service to search, browse, and copy characters for personal or commercial use.</p>

        <h2 className="text-base font-semibold text-foreground mt-6">Unicode Data</h2>
        <p>All character data is based on the Unicode Standard. Unicode is a registered trademark of Unicode, Inc. in the United States and other countries.</p>

        <h2 className="text-base font-semibold text-foreground mt-6">No Warranty</h2>
        <p>The service is provided &ldquo;as is&rdquo; without warranty of any kind. We do not guarantee uninterrupted access or the accuracy of character data.</p>

        <h2 className="text-base font-semibold text-foreground mt-6">Limitation of Liability</h2>
        <p>We are not liable for any damages arising from the use of this service.</p>
      </div>
    </div>
  );
}
