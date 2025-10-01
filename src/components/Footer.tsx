import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/BrandLogo";
import { SectionDivider } from "./SectionDivider";
import { AlertTriangle, MessageCircle, Send, Youtube, Twitter, Phone, Mail, Shield, Instagram } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AuthButton } from "@/components/AuthButton";
import { useUserRoles } from "@/hooks/useUserRoles";
import { LINKS, getExternalLinkProps } from "@/constants/links";
import { createWhatsAppLink, WHATSAPP_MESSAGES, DEFAULT_WHATSAPP_PHONE } from "@/utils/whatsapp";
import { useSiteContent } from "@/hooks/useSiteContent";

const SOCIAL_ICON_MAP: Record<string, LucideIcon> = {
  whatsapp: MessageCircle,
  telegram: Send,
  youtube: Youtube,
  x: Twitter,
  instagram: Instagram,
};

const getSocialIcon = (type?: string): LucideIcon => {
  if (!type) return MessageCircle;
  const key = type.toLowerCase();
  return SOCIAL_ICON_MAP[key] ?? MessageCircle;
};

export function Footer() {
  const { content } = useSiteContent();
  const { isAdmin } = useUserRoles();
  const { footer } = content;
  const socialLinks = footer.socials ?? [];
  const serviceItems = footer.services?.items ?? [];
  const sectionGroups = footer.sections ?? [];
  const legalLinks = footer.legalLinks ?? [];

  return (
    <footer role="contentinfo" aria-labelledby="footer-heading" className="relative bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 border-t border-border/30">
      <h2 id="footer-heading" className="sr-only">Site footer</h2>
      <SectionDivider variant="curved" className="text-background" />
      <div className="relative bg-gradient-to-b from-background to-muted/30 border-t border-border/30">
        <div className="absolute inset-0 bg-gradient-hero-premium grain-texture pointer-events-none" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-8">
            {/* Brand + Socials */}
            <div className="space-y-4 lg:col-span-2">
              <div className="block">
                <Link to="/" aria-label="Home" className="block">
                  <BrandLogo className="w-full h-auto max-h-20 md:max-h-24" />
                </Link>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {footer.description}
              </p>
              
              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-4 pt-2">
                  {socialLinks.map((social) => {
                    const Icon = getSocialIcon(social.type);
                    const label = social.name || "Social link";
                    return (
                      <a
                        key={social.href}
                        {...getExternalLinkProps(social.href)}
                        aria-label={label}
                        title={label}
                        className="text-muted-foreground hover:text-primary transition-colors hover:scale-105 transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-full p-1"
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">{label}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Contact */}
            <address className="not-italic space-y-4">
              <h3 className="text-base font-semibold text-foreground">Contact</h3>
              <div className="space-y-3 text-sm">
                {footer.email && (
                  <a
                    href={`mailto:${footer.email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors hover:translate-x-px transform duration-200"
                  >
                    <Mail className="h-4 w-4" />
                    {footer.email}
                  </a>
                )}
                {footer.phone && (
                  <a
                    href={`tel:${footer.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors hover:translate-x-px transform duration-200"
                  >
                    <Phone className="h-4 w-4" />
                    {footer.phone}
                  </a>
                )}
                <a 
                  {...getExternalLinkProps(createWhatsAppLink(DEFAULT_WHATSAPP_PHONE, WHATSAPP_MESSAGES.support))}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors hover:translate-x-px transform duration-200"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  {...getExternalLinkProps(LINKS.telegram.support)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors hover:translate-x-px transform duration-200"
                >
                  <Send className="h-4 w-4" />
                  Telegram Support
                </a>
                <a
                  {...getExternalLinkProps(LINKS.telegram.kenneDynespot)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors hover:translate-x-px transform duration-200"
                >
                  <Send className="h-4 w-4" />
                  Telegram (KenneDyne spot)
                </a>
              </div>
            </address>

            {/* Services */}
            {serviceItems.length > 0 && (
              <nav aria-label={footer.services?.title || "Services"} className="space-y-4">
                <h3 className="text-base font-semibold text-foreground">
                  {footer.services?.title || "Services"}
                </h3>
                <ul className="space-y-3 list-none pl-0">
                  {serviceItems.map((service, index) => (
                    <li key={`${service}-${index}`}>
                      <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer hover:translate-x-px transform duration-200">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Section Groups (Education, Support) */}
            {(footer.sections || []).slice(0, 2).map((section, index) => (
              <nav key={index} aria-label={section?.title || `section-${index}`} className={`space-y-4 ${index === 1 ? 'hidden xl:block' : ''}`}>
                <h3 className="text-base font-semibold text-foreground">{section?.title}</h3>
                <ul className="space-y-3 list-none pl-0">
                  {(section?.links || []).map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-px transform duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/30 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
                <p className="text-sm text-muted-foreground">
                  {footer.copyright}
                </p>
                {footer.designCredit && (
                  <p className="text-sm text-muted-foreground">
                    {footer.designCredit.text && footer.designCredit.url ? (
                      <>
                        •{" "}
                        <a 
                          href={footer.designCredit.url}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          {footer.designCredit.text}
                        </a>
                      </>
                    ) : (
                      footer.designCredit.text
                    )}
                  </p>
                )}
              </div>
              
              <div className="flex flex-wrap gap-6 justify-center md:justify-end items-center">
                <nav aria-label="Legal" className="flex flex-wrap gap-6">
                  {(footer.legalLinks || []).map((link, index) => (
                    link.href && link.href.startsWith("http") ? (
                      <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        key={index}
                        to={link.href || '#'}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    )
                  ))}
                  
                  {/* Admin link for authenticated admins */}
                  {isAdmin && (
                    <Link 
                      to="/admin"
                      className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Admin
                    </Link>
                  )}
                </nav>
                
                {/* Admin Login - discrete placement */}
                <div className="opacity-60 hover:opacity-100 transition-opacity">
                  <AuthButton />
                </div>
                
                {/* Admin Dashboard Link - only show for authenticated admins */}
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors opacity-60 hover:opacity-100"
                  >
                    <Shield className="h-3 w-3" />
                    Admin
                  </Link>
                )}
              </div>
            </div>
            
            {/* Trading Disclaimer */}
            <div className="mt-8 p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-xs text-muted-foreground text-center leading-relaxed flex items-center justify-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0" aria-hidden="true" />
                {footer.riskDisclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
