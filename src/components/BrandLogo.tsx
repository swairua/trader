import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const LOGO_URL =
  "https://cdn.builder.io/api/v1/image/assets%2F47503cb593a04fafbd97599f9b784a6d%2F8c46d28774654d78bef06b344858d079?format=webp&width=800";

export function BrandLogo({ className, size = "md" }: BrandLogoProps) {
  const sizeClasses = {
    sm: "h-10",
    md: "h-20",
    lg: "h-28",
  }[size];

  return (
    <img
      src={LOGO_URL}
      alt="KenneDyne spot logo"
      className={cn("block w-auto object-contain", sizeClasses, className)}
      aria-label="KenneDyne spot"
      loading="lazy"
      decoding="async"
    />
  );
}

export default BrandLogo;
