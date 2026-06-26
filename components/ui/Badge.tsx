import type { ReactNode } from "react";

type BadgeTone = "accent" | "success" | "blue" | "muted";

const tones: Record<BadgeTone, string> = {
  accent: "bg-[#EDA415] text-white",
  success: "bg-[#30BD57]/10 text-[#30BD57]",
  blue: "bg-[#E2F4FF] text-[#4E73C7]",
  muted: "bg-[#ACACAC]/15 text-[#ACACAC]",
};

export function Badge({
  children,
  tone = "blue",
  className = "",
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black leading-none ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
