import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "soft";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ComponentPropsWithoutRef<"a"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[#4E73C7] text-white shadow-[0_8px_24px_rgba(78,115,199,0.32)] hover:bg-[#4E73C7]/90",
  accent: "bg-[#EDA415] text-white shadow-[0_8px_24px_rgba(237,164,21,0.32)] hover:bg-[#EDA415]/90",
  outline: "border border-[#B3D4E5] bg-white text-[#4E73C7] hover:border-[#4E73C7] hover:bg-[#E2F4FF]",
  ghost: "text-white hover:bg-white/10",
  soft: "bg-[#E2F4FF] text-[#4E73C7] hover:bg-[#E2F4FF]/70",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 gap-1.5 px-3.5 py-2 text-xs",
  md: "min-h-11 gap-2 px-5 py-3 text-sm",
  lg: "min-h-13 gap-2.5 px-7 py-3.5 text-base",
};

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-200 will-change-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EDA415] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
