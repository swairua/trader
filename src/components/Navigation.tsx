import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Send, ChevronDown, ChevronRight, Star, BookOpen, Briefcase, BarChart2, Sparkles, MapPin, Calendar, FileText } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LINKS, getExternalLinkProps, getInternalLinkProps } from "@/constants/links";
import { BrandLogo } from "@/components/BrandLogo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useI18n } from '@/i18n';


export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useSiteContent();
  const location = useLocation();
  const { language, setLanguage } = useI18n();
  const toggleLanguage = () => setLanguage(language === 'en' ? 'fr' : 'en');

  const isActive = (path: string) => location.pathname === path;

  const links = content.navigation.links || [];
  const primaryLinks = links.slice(0, 3);
  const overflowLinks = links.slice(3);

  // Hover-controlled More menu state
  const [moreOpen, setMoreOpen] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);

  const nestedIcons = [Star, BookOpen, Briefcase, BarChart2, Sparkles, MapPin, Calendar, FileText];

  return (
    <nav aria-label="Main" className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 lg:h-28 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-3" aria-label="Home">
          <BrandLogo size="lg" />
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
                  : "text-[#0a0a0a]"
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
                    <Button variant="ghost" size="sm" className="group px-3 py-2 min-h-[44px] font-medium hover:text-purple-600">
                      More <ChevronDown className={`ml-1 h-5 w-5 transition-transform duration-150 ${moreOpen ? 'rotate-180 scale-x-125' : 'rotate-0 scale-x-110'} group-hover:rotate-180`} />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="min-w-[14rem]"
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
                          <Link to={item.href} className="flex items-center hover:text-purple-600">
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
          <Button variant="outline" size="sm" onClick={toggleLanguage} aria-label="Switch language">
            {language.toUpperCase()}
          </Button>
          <ThemeToggle />
          <a
            {...getExternalLinkProps(LINKS.telegram.kenneDynespot)}
            aria-label="Open KenneDyne spot Telegram"
            className="text-[#0a0a0a] hover:text-primary transition-colors p-2 rounded-md"
          >
            <Send className="h-5 w-5" />
          </a>
          <Button variant="outline" size="sm" className="font-semibold" asChild>
            <Link to={LINKS.internal.strategy}>
              Learn DRIVE Strategy
            </Link>
          </Button>
          <Button variant="hero" size="sm" className="font-semibold" asChild>
            <a {...getExternalLinkProps(LINKS.exness.signup)}>
              Start Trading
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
              <Button variant="ghost" size="icon" className="hover:bg-accent/50">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
          <SheetContent side="right" className="w-80 glass-card border-l border-border/50">
            <div className="flex flex-col space-y-8 mt-8">
              <BrandLogo size="lg" />

              <div className="space-y-6">
                {content.navigation.links.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block text-base font-medium transition-colors hover:text-primary ${
                      isActive(item.href)
                        ? "text-primary"
                        : "text-[#0a0a0a]"
              }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              <div className="pt-6 space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link to={LINKS.internal.strategy}>
                    Learn DRIVE Strategy
                  </Link>
                </Button>
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                   <a {...getExternalLinkProps(LINKS.exness.signup)}>
                     Start Trading
                   </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </nav>
  );
}
