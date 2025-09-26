import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { 
  Download, 
  TrendingUp, 
  Search, 
  Target, 
  Shield, 
  Play,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Users,
  Brain,
  BookOpen,
  BarChart3,
  MapPin,
  ChevronRight,
  Zap,
  LineChart,
  Clock
} from "lucide-react";
import traderWorkspaceHero from "@/assets/trader-workspace-hero.jpg";
import tradingProcessFlow from "@/assets/trading-process-flow.jpg";
import tradingWorkspace from "@/assets/trading-workspace.jpg";
import { driveSteps } from "@/content/drive";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const comparisonData = [
  {
    feature: "Focus",
    drive: "Structured, rule-based framework",
    indicators: "Signals from tools",
    priceAction: "Candlestick patterns",
    ict: "Institutional order flow",
    supplyDemand: "Supply & demand zones"
  },
  {
    feature: "Direction",
    drive: "Clear, rule-based guidelines",
    indicators: "May lag behind price",
    priceAction: "Often subjective",
    ict: "Strong but complex",
    supplyDemand: "Useful but may vary"
  },
  {
    feature: "Consistency",
    drive: "Designed as a repeatable framework",
    indicators: "Can be inconsistent if signals repaint",
    priceAction: "Skill dependent",
    ict: "Consistent if mastered",
    supplyDemand: "Market dependent"
  },
  {
    feature: "Risk Management",
    drive: "Built into the framework",
    indicators: "Rarely emphasized",
    priceAction: "Trader dependent",
    ict: "Strong",
    supplyDemand: "Varies"
  },
  {
    feature: "Learning Curve",
    drive: "Moderate – step by step",
    indicators: "Easy to start",
    priceAction: "Requires practice",
    ict: "Steep",
    supplyDemand: "Moderate"
  },
  {
    feature: "Best For",
    drive: "Scalper, Day trader, Swing traders seeking structured learning",
    indicators: "Beginners wanting simple tools",
    priceAction: "Experienced discretionary traders",
    ict: "Advanced learners",
    supplyDemand: "Swing traders"
  }
];

const whyChooseData = [
  {
    icon: Target,
    title: "Clear Trading Guidelines",
    description: "Learn structured approaches to improve decision-making"
  },
  {
    icon: Shield,
    title: "Risk Management Education",
    description: "Discover methods to manage exposure"
  },
  {
    icon: Brain,
    title: "Mindset Development",
    description: "Access resources that support emotional discipline"
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Join a global trader community for shared insights"
  }
];

const Strategy = () => {
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: "" });

  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const [videoEmail, setVideoEmail] = useState("");
  const [isSubmittingVideo, setIsSubmittingVideo] = useState(false);
  const [resultVideo, setResultVideo] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: "" });
  const handleDownload = () => {
    setResult({ type: null, message: "" });
    setEmail("");
    setOpenEmailDialog(true);
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setResult({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    setIsSubmitting(true);
    setResult({ type: null, message: "" });
    try {
      const { data, error } = await supabase.functions.invoke('submit-checklist-request', {
        body: {
          email,
          asset: 'drive_checklist',
          source_url: window.location.href,
        },
      });
      if (error) throw error;
      if (data?.success) {
        setResult({ type: 'success', message: 'Download link sent. Please check your email.' });
      } else {
        setResult({ type: 'error', message: 'Unexpected response. Please try again.' });
      }
    } catch (err) {
      console.error('Error requesting checklist:', err);
      setResult({ type: 'error', message: 'Failed to send download link. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoEmail || !videoEmail.includes("@")) {
      setResultVideo({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    setIsSubmittingVideo(true);
    setResultVideo({ type: null, message: "" });
    try {
      const { data, error } = await supabase.functions.invoke('submit-checklist-request', {
        body: {
          email: videoEmail,
          asset: 'drive_video',
          source_url: window.location.href,
        },
      });
      if (error) throw error;
      if (data?.success) {
        setResultVideo({ type: 'success', message: 'Video access link sent. Please check your email.' });
      } else {
        setResultVideo({ type: 'error', message: 'Unexpected response. Please try again.' });
      }
    } catch (err) {
      console.error('Error requesting video:', err);
      setResultVideo({ type: 'error', message: 'Failed to send video link. Please try again.' });
    } finally {
      setIsSubmittingVideo(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 hero-image">
            <img 
              src={traderWorkspaceHero} 
              alt="Professional trader analyzing charts on multiple monitors" 
              className="w-full h-full object-cover"
              loading="eager"
              width={1920}
              height={1080}
              onError={(e) => {
                console.warn('Hero image failed to load');
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-hero-premium grain-texture"></div>
          <div className="container px-4 relative z-20 on-hero">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 bg-white/10 border border-white/20 text-white">
                <TrendingUp className="h-4 w-4 mr-2" />
                Education Framework
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tighter text-white mb-6 leading-tight">
                The <span className="text-primary">D.R.I.V.E</span> Strategy
              </h1>
              <p className="text-hero-body text-white/90 mb-4 leading-relaxed max-w-3xl mx-auto">
                Our structured DRIVE Strategy offers rules and a clear learning path designed to help traders build stronger analysis skills and make more informed decisions in the market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button variant="hero" size="lg" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download DRIVE Checklist
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => {
                    setResultVideo({ type: null, message: "" });
                    setVideoEmail("");
                    setOpenVideoDialog(true);
                  }}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch Strategy Video
                </Button>
              </div>
              
              {/* Quick Navigation */}
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                <a href="#drive-steps" className="text-white/70 hover:text-white transition-colors border-b border-white/30 hover:border-white pb-1">
                  5 Steps
                </a>
                <span className="text-white/40">•</span>
                <a href="#comparison" className="text-white/70 hover:text-white transition-colors border-b border-white/30 hover:border-white pb-1">
                  Comparison
                </a>
                <span className="text-white/40">•</span>
                <a href="#why-choose" className="text-white/70 hover:text-white transition-colors border-b border-white/30 hover:border-white pb-1">
                  Why Choose DRIVE
                </a>
              </div>

              {/* Embedded Strategy Video (inline on Strategy page) */}
              <div className="mt-8 max-w-4xl mx-auto">
                <video
                  controls
                  preload="metadata"
                  className="w-full rounded-lg shadow-lg"
                  src="https://cdn.builder.io/o/assets%2F929a94a73a3e4246bd07aab61b8a8dc4%2F09296fea41b446e9b7766d04a5882ffb?alt=media&token=fbe80ad2-fe5e-44ae-a7ea-61d49edbd50a&apiKey=929a94a73a3e4246bd07aab61b8a8dc4"
                  poster="https://cdn.builder.io/api/v1/image/assets%2F929a94a73a3e4246bd07aab61b8a8dc4%2Fffbc7d93a7c548ed8df7d1e69e1c3eea?format=webp&width=1200"
                  aria-label="DRIVE strategy overview video"
                />
              </div>

            </div>
          </div>
        </section>

        {/* DRIVE Steps */}
        <section id="drive-steps" className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
          <div className="container px-4 relative">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="fluid-h2 text-foreground mb-6">
                  The <span className="text-primary">D.R.I.V.E</span> Strategy Framework
                </h2>
                <p className="fluid-body text-muted-foreground max-w-3xl mx-auto">
                  A systematic 5-step methodology that transforms retail traders into institutional professionals.
                </p>
              </div>

              {/* Desktop Timeline */}
              <div className="hidden lg:block relative mb-20">
                <div className="flex justify-between items-center relative">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-primary/30 via-primary to-primary/30 transform -translate-y-1/2"></div>
                  {driveSteps.map((step, index) => (
                    <div key={index} className="relative flex flex-col items-center group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg ring-4 ring-primary/20 ring-offset-4 ring-offset-background group-hover:ring-primary/40 transition-all duration-300 mb-6 relative z-10">
                        {step.letter}
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm group-hover:bg-primary/30 transition-colors duration-300"></div>
                      </div>
                      <Card className="p-6 max-w-xs glass-card group-hover:shadow-card transition-all duration-300">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-colors duration-300">
                          <step.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-display font-semibold text-foreground mb-2 text-center group-hover:text-primary transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground text-center mb-4">
                          {step.description}
                        </p>
                        <ul className="space-y-2 list-none pl-0">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start text-xs text-muted-foreground">
                              <CheckCircle className="h-3 w-3 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-6">
                {driveSteps.map((step, index) => (
                  <Card key={index} className="p-6 glass-card animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mr-4">
                        {step.letter}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Step {index + 1} of 5
                        </p>
                      </div>
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    <ul className="space-y-2 list-none pl-0">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section id="comparison" className="py-20 bg-muted/50">
          <div className="container px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="fluid-h2 text-foreground mb-6">
                  DRIVE vs Other Strategies
                </h2>
                <p className="fluid-body text-muted-foreground max-w-3xl mx-auto">
                  See how our structured framework compares to traditional trading approaches.
                </p>
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block">
                <Card className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">Feature/Approach</TableHead>
                        <TableHead className="font-semibold text-primary">DRIVE Strategy</TableHead>
                        <TableHead className="font-semibold">Indicators</TableHead>
                        <TableHead className="font-semibold">Price Action Only</TableHead>
                        <TableHead className="font-semibold">ICT</TableHead>
                        <TableHead className="font-semibold">Supply & Demand</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {comparisonData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{row.feature}</TableCell>
                          <TableCell className="bg-primary/5 font-medium text-primary">{row.drive}</TableCell>
                          <TableCell>{row.indicators}</TableCell>
                          <TableCell>{row.priceAction}</TableCell>
                          <TableCell>{row.ict}</TableCell>
                          <TableCell>{row.supplyDemand}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-6">
                {comparisonData.map((row, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center">
                      <BarChart3 className="h-5 w-5 text-primary mr-2" />
                      {row.feature}
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="font-medium text-primary text-sm mb-1">DRIVE Strategy</div>
                        <div className="text-sm text-foreground">{row.drive}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="font-medium text-muted-foreground mb-1">Indicators</div>
                          <div className="text-foreground">{row.indicators}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground mb-1">Price Action</div>
                          <div className="text-foreground">{row.priceAction}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground mb-1">ICT</div>
                          <div className="text-foreground">{row.ict}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground mb-1">Supply & Demand</div>
                          <div className="text-foreground">{row.supplyDemand}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose DRIVE */}
        <section id="why-choose" className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
          <div className="container px-4 relative">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="fluid-h2 text-foreground mb-6">
                  Why Choose <span className="text-primary">D.R.I.V.E</span>?
                </h2>
                <p className="fluid-body text-muted-foreground max-w-3xl mx-auto">
                  Discover the key advantages that make DRIVE the preferred choice for serious traders.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {whyChooseData.map((item, index) => (
                  <Card key={index} className="p-6 glass-card hover:shadow-card transition-all duration-300 hover:scale-[1.02] group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors duration-300">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Disclaimer */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-6 border border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-900/20">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Educational Framework Disclaimer
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      The DRIVE Strategy is designed for educational purposes to help you develop 
                      a structured approach to market analysis. It is not personalized investment 
                      advice. Always conduct your own research and consider your risk tolerance 
                      before making any trading decisions.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />

      <Dialog open={openVideoDialog} onOpenChange={(open) => { setOpenVideoDialog(open); if (!open) { setResultVideo({ type: null, message: "" }); setVideoEmail(""); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Strategy Video</DialogTitle>
            <DialogDescription>
              Enter your email to receive access to the strategy video.
            </DialogDescription>
          </DialogHeader>

          {resultVideo.type === 'success' ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <CheckCircle className="h-5 w-5" />
                <span>Video link sent to {videoEmail}.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitVideo} className="space-y-4">
              {resultVideo.type === 'error' && (
                <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
                  <AlertTriangle className="h-5 w-5 mt-0.5" />
                  <p className="text-sm">{resultVideo.message}</p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="videoEmail">Email address</Label>
                <Input
                  id="videoEmail"
                  type="email"
                  value={videoEmail}
                  onChange={(e) => setVideoEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpenVideoDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmittingVideo}>
                  {isSubmittingVideo ? 'Sending…' : 'Send video link'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openEmailDialog} onOpenChange={(open) => { setOpenEmailDialog(open); if (!open) { setResult({ type: null, message: "" }); setEmail(""); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get DRIVE Strategy Checklist</DialogTitle>
            <DialogDescription>
              Enter your email and we&apos;ll send you a download link.
            </DialogDescription>
          </DialogHeader>

          {result.type === 'success' ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <CheckCircle className="h-5 w-5" />
                <span>Download link sent to {email}.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitEmail} className="space-y-4">
              {result.type === 'error' && (
                <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
                  <AlertTriangle className="h-5 w-5 mt-0.5" />
                  <p className="text-sm">{result.message}</p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpenEmailDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send download link'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Strategy;
