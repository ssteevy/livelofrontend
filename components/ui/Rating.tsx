import { Star } from "lucide-react";

export function Rating({
  value,
  count,
  size = 13,
  showValue = true,
}: {
  value?: number | null;
  count?: number | null;
  size?: number;
  showValue?: boolean;
}) {
  const rating = Math.max(0, Math.min(5, value ?? 0));
  const full = Math.round(rating);

  return (
    <span className="inline-flex items-center gap-1 text-[#EDA415]">
      <span className="flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            aria-hidden="true"
            size={size}
            fill={index < full ? "currentColor" : "none"}
            className={index < full ? "" : "text-[#B3D4E5]"}
          />
        ))}
      </span>
      {showValue ? (
        <span className="text-[11px] font-bold text-[#ACACAC]">
          {rating > 0 ? rating.toFixed(1) : "Nouveau"}
          {count ? ` (${count})` : ""}
        </span>
      ) : null}
    </span>
  );
}
