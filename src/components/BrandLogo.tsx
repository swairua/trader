import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ className, size = "md" }: BrandLogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-baseline font-extrabold tracking-tight select-none leading-none",
        sizeClasses,
        className
      )}
      aria-label="KenneDyne spot"
    >
      <span className="text-[#0a0a0a]">Kenne</span>
      <span className="text-primary">Dyne</span>
      <span className="ml-1 lowercase text-xs text-[#0a0a0a] align-baseline">
        spot
        <sup className="ml-0.5 text-[#0a0a0a] leading-none">•</sup>
      </span>
    </span>
  );
}

export default BrandLogo;
