import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Target } from "lucide-react";
import { LINKS, getInternalLinkProps } from "@/constants/links";

const benefits = [
  {
    icon: TrendingUp,
    title: "Systematic Approach",
    description: "Learn a structured framework that removes emotion from trading decisions"
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Master precise entry and exit strategies to protect your capital"
  },
  {
    icon: Target,
    title: "Consistent Framework",
    description: "Build sustainable trading habits with our proven methodology"
  }
];

export function DriveCallToActionSection() {
  return (
    <section className="py-16 lg:py-20 bg-muted/20 relative overflow-hidden" aria-labelledby="drive-cta-heading">
      <div className="absolute inset-0 bg-gradient-hero opacity-15"></div>
      <div className="container px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 id="drive-cta-heading" className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              Ready to Learn the{" "}
              <span className="text-primary">DRIVE Framework?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Start building systematic trading skills with our structured educational approach.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="group text-center space-y-6 animate-fade-in-up">
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-button group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  <benefit.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="hero" className="hover:scale-105 transition-transform duration-300" asChild>
              <a {...getInternalLinkProps(LINKS.internal.learn)}>
                Start Learning
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
