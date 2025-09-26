import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  lightSrc?: string;
  darkSrc?: string;
  useDarkVariantInDarkMode?: boolean;
}

const DEFAULT_LIGHT_LOGO =
  "https://cdn.builder.io/api/v1/image/assets%2F47503cb593a04fafbd97599f9b784a6d%2F8c46d28774654d78bef06b344858d079?format=webp&width=800";

export function BrandLogo({
  className,
  size = "md",
  lightSrc = DEFAULT_LIGHT_LOGO,
  darkSrc,
  useDarkVariantInDarkMode = false,
}: BrandLogoProps) {
  const sizeClasses = {
    sm: "h-10",
    md: "h-20",
    lg: "h-28",
  }[size];

  if (useDarkVariantInDarkMode && darkSrc) {
    return (
      <>
        <img
          src={lightSrc}
          alt="KenneDyne spot logo"
          className={cn("block dark:hidden w-auto object-contain", sizeClasses, className)}
          aria-label="KenneDyne spot"
          loading="lazy"
          decoding="async"
        />
        <img
          src={darkSrc}
          alt="KenneDyne spot logo"
          className={cn("hidden dark:block w-auto object-contain", sizeClasses, className)}
          aria-label="KenneDyne spot"
          loading="lazy"
          decoding="async"
        />
      </>
    );
  }

  return (
    <img
      src={lightSrc}
      alt="KenneDyne spot logo"
      className={cn("block w-auto object-contain", sizeClasses, className)}
      aria-label="KenneDyne spot"
      loading="lazy"
      decoding="async"
    />
  );
}

export default BrandLogo;
