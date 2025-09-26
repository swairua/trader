import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SectionDivider } from "@/components/SectionDivider";
import { DriveStrategySection } from "@/components/DriveStrategySection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, BookOpen, Users, CheckCircle, ArrowDown, MessageCircle, Target, Shield, Brain, TrendingUp, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import educationHero from "@/assets/education-hero.jpg";
import signalsService from "@/assets/signals-service.jpg";
import forexMentorshipService from "@/assets/forex-mentorship-service.jpg";
import educationService from "@/assets/education-service.jpg";

export function Services() {
  const services = [
    {
      title: "Market Insights & Trade Ideas",
      subtitle: "Learn Institutional Trading Approaches",
      icon: LineChart,
      image: signalsService,
      features: [
        "Educational examples of Forex, Gold & Crypto market setups",
        "Step-by-step illustrations with entries, stop loss & take profit examples (for learning purposes)",
        "Risk management concepts explained with each example"
      ],
      ctaText: "Access Free Market Insights",
      ctaLink: "/signals-tools",
      imageAlt: "Educational market insights for Forex, Gold and Crypto trading"
    },
    {
      title: "101 Mentorship",
      subtitle: "Build Your Knowledge Step-by-Step",
      icon: BookOpen,
      image: forexMentorshipService,
      features: [
        "Coaching tailored to your knowledge level",
        "Institutional-inspired strategies (DRIVE & more)",
        "Psychology and mindset training"
      ],
      ctaText: "Book Your Mentorship Session",
      ctaLink: "/mentorship",
      imageAlt: "One-on-one mentorship for personalized trading education"
    },
    {
      title: "Traders in the Zone",
      subtitle: "A Global Community for Traders",
      icon: Users,
      image: educationService,
      features: [
        "Weekly Q&A sessions with mentors",
        "Training videos & guides on DRIVE framework",
        "Resources and assignments for practice"
      ],
      ctaText: "Learn With Us",
      ctaLink: "/services/learn",
      imageAlt: "Community-driven trading education and learning resources"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-subtle">
        <div className="absolute inset-0">
          <img 
            src={educationHero} 
            alt="Professional trading education environment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        
        <div className="on-hero">
          <div className="relative container px-4 text-center animate-fade-in">
            <Badge variant="outline" className="mb-6 bg-white/10 border-white/30 backdrop-blur-sm">
              Education Services
            </Badge>
            <h1 className="fluid-h1 leading-[1.1] sm:leading-[1.1] text-balance on-hero text-shadow-hero mb-6">
              <span>Our </span><span>Services</span>
            </h1>
            <p className="text-hero-body max-w-3xl mx-auto leading-relaxed text-shadow-hero mb-8">
              Your Gateway to Professional Trading Education
            </p>
            <p className="text-lg max-w-4xl mx-auto mb-8">
              Trading goes beyond luck — it requires discipline, knowledge, and continuous learning. 
              At KenneDynespot, we provide the tools, resources, and community support you need 
              to develop as a trader. Whether you're just starting out or refining your approach, we're here to guide you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
              >
                <Link to="#services" className="flex items-center gap-2">
                  Explore Services
                  <ArrowDown className="h-4 w-4" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8"
              >
                <Link to="/mentorship" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Talk to a Mentor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <main>
        {/* Services Grid */}
        <section id="services" className="py-20 bg-accent/10">
          <div className="container px-4">
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card 
                    key={service.title}
                    className="overflow-hidden shadow-card hover:shadow-elevation transition-all duration-300 animate-fade-in hover-scale group"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                        loading="lazy" 
                      />
                      <div className="absolute inset-0 bg-gradient-card-overlay opacity-60"></div>
                    </div>
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-semibold text-foreground">
                            {service.title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground font-medium">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="mb-6">
                        <p className="text-sm font-medium text-primary mb-3 flex items-center">
                          ✨ What You'll Get:
                        </p>
                        <ul className="space-y-3 list-none pl-0">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button
                      asChild
                      variant={index === 1 ? 'hero' : 'outline'}
                      size="lg"
                      className="w-full transition-transform duration-300"
                    >
                      <Link
                        to={service.ctaLink}
                        aria-label={`${service.ctaText} - ${service.title}`}
                        className="flex items-center justify-center gap-2"
                      >
                        {service.ctaText}
                      </Link>
                    </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* DRIVE Strategy Snapshot */}
        <section className="py-16 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
          <div className="container px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <h2 className="fluid-h2 text-foreground mb-4">
                  The <span className="text-primary">D.R.I.V.E</span> Strategy
                </h2>
                <p className="text-lg text-muted-foreground mb-2">
                  <strong>Direction. Range. Interest Point. Value of Risk. Entry.</strong>
                </p>
                <p className="fluid-body text-muted-foreground">
                  Our systematic 5-step methodology for institutional-level market analysis
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center justify-center p-4 bg-background/50 rounded-lg border">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm font-medium text-foreground">Simplified Smart Money Concepts</span>
                </div>
                <div className="flex items-center justify-center p-4 bg-background/50 rounded-lg border">
                  <TrendingUp className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm font-medium text-foreground">Multi-Market Application</span>
                </div>
                <div className="flex items-center justify-center p-4 bg-background/50 rounded-lg border">
                  <Shield className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm font-medium text-foreground">Risk-to-Reward Focus</span>
                </div>
              </div>

              <Button variant="default" size="lg" className="hover:scale-105 transition-transform duration-300" asChild>
                <Link to="/strategy" aria-label="Explore the complete DRIVE strategy framework">
                  Explore the Complete Framework
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Institutional-Trader */}
        <section className="py-20 bg-accent/10">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why Choose KenneDynespot?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Educational strategies inspired by institutional practices
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="text-center p-6 floating-card">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Educational Strategies</h3>
                <p className="text-sm text-muted-foreground">
                  Institutional practices adapted for educational purposes
                </p>
              </Card>
              
              <Card className="text-center p-6 floating-card">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Community Support</h3>
                <p className="text-sm text-muted-foreground">
                  Engaged community to keep you motivated and learning
                </p>
              </Card>
              
              <Card className="text-center p-6 floating-card">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Personal Mentorship</h3>
                <p className="text-sm text-muted-foreground">
                  Step-by-step guidance tailored to your learning pace
                </p>
              </Card>
              
              <Card className="text-center p-6 floating-card">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Education Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Focused on education and practice, not quick profits
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Enhanced Closing CTA Section */}
        <section className="relative py-20 bg-gradient-subtle overflow-hidden">
          <div className="absolute inset-0 bg-neutral-900/60"></div>
          <div className="absolute inset-0 forex-grid-pattern opacity-30"></div>

          <div className="relative container px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-shadow-hero">
              Your Next Step is Simple
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8 text-shadow-hero">
              Join today and start exploring institutional-level trading techniques with the right tools & guidance.
            </p>
            
            {/* Numbered Steps */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold text-sm flex-shrink-0 mt-1">
                    1
                  </div>
                  <p className="text-white/90">
                    <strong className="text-white">Choose your learning path</strong> (Trade ideas, Mentorship, Community, or Strategy).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold text-sm flex-shrink-0 mt-1">
                    2
                  </div>
                  <p className="text-white/90">
                    <strong className="text-white">Join today</strong> and start exploring institutional-level trading techniques.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold text-sm flex-shrink-0 mt-1">
                    3
                  </div>
                  <p className="text-white/90">
                    <strong className="text-white">Grow your trading knowledge</strong> with the right tools & guidance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg" className="min-w-[220px] px-8" aria-label="Start your trading journey">
                <Link to="/mentorship" className="flex items-center gap-2" aria-label="Start your trading journey link">
                  <MessageCircle className="h-4 w-4" />
                  Start Your Trading Journey
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[220px] px-8" aria-label="Explore learning resources">
                <Link to="/services/learn" aria-label="Explore learning resources link">
                  Explore Learning Resources
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
