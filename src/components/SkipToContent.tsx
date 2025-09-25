export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium transition-all duration-200 focus:shadow-lg"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}