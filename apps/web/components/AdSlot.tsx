/**
 * AdSlot — Reserved-dimension ad container.
 * Gracefully handles ad network failures without breaking the UI.
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
      <div className="flex flex-col items-center justify-center gap-1 opacity-40 select-none pointer-events-none p-2 text-center">
        <span className="text-[10px] uppercase font-semibold tracking-wider">Advertisement</span>
        <span className="text-[9px]">Space for Ad</span>
      </div>
    </div>
  );
}
