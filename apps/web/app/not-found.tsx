import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className="text-muted-foreground mb-6">
        The character or page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="flex gap-3 justify-center">
        <Link
          href="/"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/emoji"
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary-hover transition-colors"
        >
          Browse Emoji
        </Link>
      </div>
    </div>
  );
}
