import { useState, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Send, ChevronDown, ChevronRight, Star, BookOpen, Briefcase, BarChart2, Sparkles, MapPin, Calendar, FileText } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LINKS, getExternalLinkProps, getInternalLinkProps } from "@/constants/links";
import { BrandLogo } from "@/components/BrandLogo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useI18n, switchLanguage } from '@/i18n';


export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useSiteContent();
  const location = useLocation();
  const { language, setLanguage, t } = useI18n();
  const toggleLanguage = () => {
    const next = language === 'en' ? 'fr' : 'en';
    try {
      switchLanguage(next);
    } catch (e) {
      // fallback to context setLanguage
      setLanguage(next);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const links = content.navigation.links || [];
  const primaryLinks = links.slice(0, 3);
  const overflowLinks = links.slice(3);

  // Hover-controlled More menu state
  const [moreOpen, setMoreOpen] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);

  const nestedIcons = [Star, BookOpen, Briefcase, BarChart2, Sparkles, MapPin, Calendar, FileText];

  return (
    <nav aria-label="Main" className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/90 dark:bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 lg:h-28 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-3" aria-label="Home">
          <BrandLogo
            size="md"
            className="h-12 lg:h-28"
            useDarkVariantInDarkMode
            darkSrc="https://cdn.builder.io/api/v1/image/assets%2Fd70b5c32436e40df8a1857905f23cae8%2F97e09281a0ad46bda113d0fd0850162f?format=webp&width=800"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-12">
          {primaryLinks.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-all duration-300 hover:text-primary relative tracking-wide px-3 py-2 min-h-[44px] flex items-center ${
                isActive(item.href)
                  ? "text-primary"
                  : "text-foreground"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.name}
              {isActive(item.href) && (
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"></div>
              )}
            </Link>
          ))}

          {overflowLinks.length > 0 && (
              <DropdownMenu open={moreOpen} onOpenChange={(open) => setMoreOpen(open)}>
                <div
                  onMouseEnter={() => {
                    if (hoverTimeoutRef.current) {
                      window.clearTimeout(hoverTimeoutRef.current);
                      hoverTimeoutRef.current = null;
                    }
                    setMoreOpen(true);
                  }}
                  onMouseLeave={() => {
                    hoverTimeoutRef.current = window.setTimeout(() => setMoreOpen(false), 150);
                  }}
                >
                  <DropdownMenuTrigger asChild>
                    <button aria-haspopup="menu" className="px-3 py-2 min-h-[44px] font-medium text-foreground bg-transparent border-0 cursor-pointer flex items-center gap-2">
                      {t('nav_more')} <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="min-w-[24rem] grid grid-cols-2 gap-2 p-2"
                    align="start"
                    onMouseEnter={() => {
                      if (hoverTimeoutRef.current) {
                        window.clearTimeout(hoverTimeoutRef.current);
                        hoverTimeoutRef.current = null;
                      }
                      setMoreOpen(true);
                    }}
                    onMouseLeave={() => {
                      hoverTimeoutRef.current = window.setTimeout(() => setMoreOpen(false), 150);
                    }}
                  >
                    {overflowLinks.map((item, idx) => {
                      const Icon = nestedIcons[idx % nestedIcons.length];
                      return (
                        <DropdownMenuItem key={item.name} asChild>
                          <Link to={item.href} className="flex items-center text-foreground">
                            <Icon className="mr-2 h-4 w-4 opacity-80" />
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </div>
              </DropdownMenu>
          )}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={toggleLanguage} aria-label="Switch language" className="min-w-[58px]">
              {language.toUpperCase()}
            </Button>
            <ThemeToggle />
          </div>
          <a
            {...getExternalLinkProps(LINKS.telegram.kenneDynespot)}
            aria-label={t('nav_open_telegram')}
            className="text-foreground hover:text-primary transition-colors p-2 rounded-md"
          >
            <Send className="h-5 w-5" />
          </a>
          <Button variant="outline" size="sm" className="font-semibold" asChild>
            <Link to={LINKS.internal.strategy}>
              {t('nav_learn_drive')}
            </Link>
          </Button>
          <Button variant="hero" size="sm" className="font-semibold" asChild>
            <a {...getExternalLinkProps(LINKS.exness.signup)}>
              {t('nav_start_trading')}
            </a>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-2 lg:hidden">
          <Button variant="outline" size="icon" onClick={toggleLanguage} aria-label="Switch language" className="text-sm font-medium">
            {language.toUpperCase()}
          </Button>
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent/50" aria-expanded={isOpen} aria-controls="mobile-menu">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
          <SheetContent side="right" id="mobile-menu" className="w-80 glass-card border-l border-border/50">
            <div className="flex flex-col space-y-6 mt-6 px-4">
              <div className="flex items-center justify-between">
                <BrandLogo
                  size="md"
                  className="h-16"
                  useDarkVariantInDarkMode
                  darkSrc="https://cdn.builder.io/api/v1/image/assets%2Fd70b5c32436e40df8a1857905f23cae8%2F97e09281a0ad46bda113d0fd0850162f?format=webp&width=800"
                />
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={toggleLanguage} aria-label="Switch language">
                    {language.toUpperCase()}
                  </Button>
                  <ThemeToggle />
                </div>
              </div>

              <div className="space-y-4 mt-2">
                {content.navigation.links.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block text-base font-medium py-2 transition-colors hover:text-primary ${
                      isActive(item.href)
                        ? "text-primary"
                        : "text-foreground"
              }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              <div className="pt-4 space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => { setIsOpen(false); }}
                  asChild
                >
                  <Link to={LINKS.internal.strategy}>
                    {t('nav_learn_drive')}
                  </Link>
                </Button>
                <Button
                  variant="hero"
                  className="w-full"
                  onClick={() => { setIsOpen(false); }}
                  asChild
                >
                   <a {...getExternalLinkProps(LINKS.exness.signup)}>
                     {t('nav_start_trading')}
                   </a>
                </Button>
                <div className="pt-4 border-t border-border/40" />
                <div className="flex items-center justify-between">
                  <a {...getExternalLinkProps(LINKS.telegram.kenneDynespot)} className="text-foreground hover:text-primary">
                    <Send className="h-5 w-5 inline-block mr-2" /> {t('nav_telegram')}
                  </a>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>{t('nav_close')}</Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </nav>
  );
}
