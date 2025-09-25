import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const LOGO_URL =
  "https://cdn.builder.io/api/v1/image/assets%2F929a94a73a3e4246bd07aab61b8a8dc4%2F94f709052d8549bf805dfd59e4d106df?format=webp&width=1200";

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
