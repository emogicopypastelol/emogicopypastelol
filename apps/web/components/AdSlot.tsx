/**
 * AdSlot — Reserved-dimension ad container.
 * Reserved dimensions prevent CLS (Cumulative Layout Shift).
 * Gracefully handles ad network absence without breaking the page layout.
 */
export function AdSlot({
  type = "banner",
  className = "",
}: {
  type?: "banner" | "sidebar" | "rectangle";
  className?: string;
}) {
  const typeClass =
    type === "sidebar"
      ? "ad-slot-sidebar"
      : type === "rectangle"
        ? "ad-slot-rectangle"
        : "ad-slot-banner";

  return (
    <div
      className={`ad-slot ${typeClass} ${className}`}
      role="complementary"
      aria-label="Advertisement Space"
    >
      <div className="flex flex-col items-center justify-center gap-1 opacity-30 select-none pointer-events-none p-3 text-center">
        <span className="text-[10px] uppercase font-medium tracking-widest text-muted-foreground">Advertisement</span>
      </div>
    </div>
  );
}
