import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, TrendingUp } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { trackEvent } from "@/components/GTMProvider";
import React, { useEffect, useState } from "react";
import tradingWorkspace from "@/assets/trading-workspace.jpg";
import traderWorkspaceHero from "@/assets/trader-workspace-hero.jpg";
import forexEducationHero from "@/assets/forex-education-hero.jpg";
import forexBlogHero from "@/assets/forex-blog-hero.jpg";
import forexMentorshipHero from "@/assets/forex-mentorship-hero.jpg";
import { LINKS, getInternalLinkProps } from "@/constants/links";

export function HeroSection() {
  const { content } = useSiteContent();
  const { hero } = content;

  const heroImages = React.useMemo(() => [
    tradingWorkspace,
    traderWorkspaceHero,
    forexEducationHero,
    forexBlogHero,
    forexMentorshipHero,
  ], []);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(id);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" role="banner" aria-label="Hero section">
      {/* Enhanced Background with Premium Effects */}
      <div className="absolute inset-0 z-0">
        {/* Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
        </div>

        {/* Hero Background Slider */}
        <div className="absolute inset-0">
          {heroImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Hero background image"
              className={`absolute inset-0 w-full h-full object-cover object-[center_30%] sm:object-center hero-image transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              width={1920}
              height={1080}
              aria-hidden={index !== current}
              decoding="async"
            />
          ))}
        </div>

        {/* Refined Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-hero-premium"></div>

        {/* Additional Mobile Overlay for Better Legibility */}
        <div className="absolute inset-0 bg-black/20 sm:bg-transparent"></div>

        {/* Grain Texture */}
        <div className="absolute inset-0 grain-texture opacity-[0.015]"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-24 pb-16 on-hero">
        <div className="space-y-8">
          {/* Trust Badge with Premium Animation */}
          <div className="hero-badge-enter inline-flex items-center glass-card rounded-full px-6 py-3 text-sm shadow-glass border border-white/20 backdrop-blur-md">
            <CheckCircle className="w-4 h-4 mr-2 text-primary" />
            {hero.badge}
          </div>
          
          {/* Main Headline */}
          <h1 className="hero-headline-enter fluid-h1 leading-[1.1] sm:leading-[1.1] text-balance on-hero text-shadow-hero">
            <span>Master Institutional Trading</span>{' '}
            <span>with DRIVE</span>
          </h1>
          
          {/* Subheadline */}
          <p className="hero-subheader-enter text-hero-body max-w-3xl mx-auto leading-relaxed text-shadow-hero">
            Learn systematic trading concepts, risk management, and our proven DRIVE framework to make informed trading decisions.
          </p>
          
          {/* Premium CTAs */}
          <div className="hero-ctas-enter flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Button 
              size="lg" 
              variant="hero" 
              className="min-w-[220px] group"
              onClick={() => trackEvent('hero_cta_start_learning')}
              asChild
            >
              <a {...getInternalLinkProps(LINKS.internal.learn)} className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Start Learning
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="glass" 
              className="min-w-[220px] group"
              onClick={() => trackEvent('hero_cta_explore_drive')}
              asChild
            >
              <a {...getInternalLinkProps(LINKS.internal.strategy)} className="flex items-center gap-2">
                See DRIVE Framework
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="hero-trust-enter pt-8">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <div className="rounded-xl bg-white/30 border border-white/40 backdrop-blur-md px-4 py-2 md:px-5 md:py-3 shadow-glass">
                <span className="text-sm md:text-base font-medium">5+ Years Experience</span>
              </div>
              <div className="rounded-xl bg-white/30 border border-white/40 backdrop-blur-md px-4 py-2 md:px-5 md:py-3 shadow-glass">
                <span className="text-sm md:text-base font-medium">Premium Content</span>
              </div>
              <div className="rounded-xl bg-white/30 border border-white/40 backdrop-blur-md px-4 py-2 md:px-5 md:py-3 shadow-glass">
                <span className="text-sm md:text-base font-medium">10K+ Students</span>
              </div>
            </div>
          </div>
          
          {/* Risk Disclaimer */}
          <div className="hero-disclaimer-enter pt-6">
            <p className="text-base sm:text-lg max-w-2xl mx-auto font-medium">
              {hero.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
