import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  Award, 
  Globe, 
  TrendingUp,
  BookOpen,
  Target,
  Heart
} from "lucide-react";

const values = [
  {
    icon: BookOpen,
    title: "Education First",
    description: "We believe in building solid foundations through comprehensive education rather than quick fixes."
  },
  {
    icon: Shield,
    title: "Transparency",
    description: "Full disclosure of risks, realistic expectations, and honest communication about trading realities."
  },
  {
    icon: Target,
    title: "Discipline",
    description: "Teaching systematic approaches that remove emotion and guesswork from trading decisions."
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "No false promises, no guaranteed profits - just honest, ethical education and mentorship."
  }
];

const stats = [
  { icon: Users, label: "Active Students", value: "2,000+" },
  { icon: Globe, label: "Countries Served", value: "15+" },
  { icon: BookOpen, label: "Course Hours", value: "500+" },
  { icon: Award, label: "Years Experience", value: "8+" }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                <Shield className="h-4 w-4 mr-2" />
                CMA Compliant Education Provider
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-foreground">Building </span>
                <span className="text-blue-400">Better Traders</span>
                <span className="text-foreground"> Through </span>
                <span className="text-blue-300">Proper Education</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Founded in 2016, KenneDynespot has been dedicated to providing honest, 
                comprehensive trading education. We focus on building disciplined traders who understand 
                risk management and market structure.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-background">
          <div className="container px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="h-12 w-12 mx-auto mb-4 rounded-lg bg-gradient-professional flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  To provide world-class trading education that emphasizes proper risk management, 
                  disciplined execution, and realistic expectations. We aim to build a community 
                  of educated traders who understand that consistent profitability comes from 
                  skill, not luck.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="shadow-card">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 rounded-lg bg-gradient-professional flex items-center justify-center flex-shrink-0">
                          <value.icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                          <p className="text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory Compliance */}
        <section className="py-20 bg-accent/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Regulatory Compliance
              </h2>
              <div className="bg-background rounded-lg p-8 shadow-card">
                <div className="flex items-center justify-center mb-6">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  As an educational service provider in Kenya, we operate in full compliance 
                  with Capital Markets Authority (CMA) guidelines. We are not a licensed 
                  broker-dealer and do not handle client funds. Our focus is purely educational.
                </p>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Important:</strong> We do not guarantee trading profits or investment returns.</p>
                  <p><strong>Risk Warning:</strong> Trading involves substantial risk and is not suitable for all investors.</p>
                  <p><strong>Education Only:</strong> All content is for educational purposes and should not be considered investment advice.</p>
                </div>
                <Button variant="outline" className="mt-6">
                  View Full Compliance Disclosure
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Trading Education?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of students who have chosen the disciplined path to trading success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  Start Free Class
                </Button>
                <Button variant="professional" size="lg">
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
