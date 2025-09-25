import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const LOGO_URL =
  "https://cdn.builder.io/api/v1/image/assets%2F851ef20a44bf452c9745cb39ca720956%2Fd72842c5e54a40f1a3d828c496c0d47f?format=webp&width=800";

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
