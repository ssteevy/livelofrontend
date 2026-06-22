import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "accent" | "outline" | "ghost";

interface ButtonProps extends ComponentPropsWithoutRef<"a"> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[#4E73C7] text-white hover:bg-[#4E73C7]/90",
  accent: "bg-[#EDA415] text-white hover:bg-[#EDA415]/90",
  outline: "border border-[#B3D4E5] bg-white text-[#4E73C7] hover:bg-[#E2F4FF]",
  ghost: "text-white hover:bg-white/10",
};

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <a
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EDA415] ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
