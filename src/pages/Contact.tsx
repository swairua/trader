import { useState } from "react";
import { Link } from "react-router-dom";
import { useContactForm } from "@/hooks/useContactForm";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SectionDivider } from "@/components/SectionDivider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LINKS, getExternalLinkProps } from "@/constants/links";
import { createWhatsAppLink, WHATSAPP_MESSAGES, DEFAULT_WHATSAPP_PHONE } from "@/utils/whatsapp";
import { 
  Mail, 
  MessageCircle, 
  MapPin, 
  Phone,
  Clock,
  Send,
  LineChart,
  HelpCircle,
  BookOpen,
  ArrowRight
} from "lucide-react";
import contactHero from "@/assets/contact-hero.jpg";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const { submitContactForm, isSubmitting } = useContactForm();
  const whatsappUrl = createWhatsAppLink(DEFAULT_WHATSAPP_PHONE, WHATSAPP_MESSAGES.support);

  const [showWhatsAppSuccess, setShowWhatsAppSuccess] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const supportEmail = 'hello@institutionaltrader.ke';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await submitContactForm(formData);
    
    if (result.success) {
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      // Show WhatsApp success button
      if (result.showWhatsApp) {
        setShowWhatsAppSuccess(true);
        // Hide after 10 seconds
        setTimeout(() => setShowWhatsAppSuccess(false), 10000);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 hero-image">
            <img 
              src={contactHero} 
              alt="Professional customer support center" 
              className="w-full h-full object-cover"
              loading="eager"
              
              width={1600}
              height={900}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-hero-premium grain-texture" />
          <div className="container px-4 relative z-20 on-hero">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="fluid-h1 text-white mb-6">
                <span>Get</span> in <span>Touch</span>
              </h1>
              <p className="text-hero-body text-white/90 mb-8 max-w-3xl mx-auto">
                Have questions about our educational programs? Need support? We're here to help you on your trading education journey.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <Button variant="hero" size="lg" onClick={() => {
                  const subject = 'Contact from website';
                  const body = 'Hi KenneDyne spot team,\n\nI would like to get in touch regarding...';
                  const mailto = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  window.location.href = mailto;
                  setTimeout(async () => {
                    if (document.hasFocus()) {
                      try {
                        if (navigator.clipboard && 'writeText' in navigator.clipboard) {
                          await navigator.clipboard.writeText(supportEmail);
                          setEmailCopied(true);
                        }
                      } catch {
                        setEmailCopied(false);
                      }
                      setIsEmailModalOpen(true);
                    }
                  }, 1200);
                }}>
                  <Mail className="h-4 w-4 mr-2" /> Email Us
                </Button>
                <Button asChild variant="glass" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <a {...getExternalLinkProps(whatsappUrl)}>
                    <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <Card className="p-8 border border-border">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          required 
                          placeholder="Your full name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email}
                          onChange={handleChange}
                          required 
                          placeholder="your.email@example.com"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+254 7XX XXX XXX"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input 
                          id="subject" 
                          name="subject" 
                          value={formData.subject}
                          onChange={handleChange}
                          required 
                          placeholder="What's this about?"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        value={formData.message}
                        onChange={handleChange}
                        required 
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        className="mt-1"
                      />
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>

                    {showWhatsAppSuccess && (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <p className="text-green-700 dark:text-green-300 text-sm mb-3">
                          Message sent successfully! For faster response, you can also contact us directly via WhatsApp:
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const whatsappUrl = createWhatsAppLink(
                              DEFAULT_WHATSAPP_PHONE, 
                              `Hi! I just submitted a contact form about "${formData.subject || 'general inquiry'}". Looking forward to your response!`
                            );
                            window.open(whatsappUrl, '_blank');
                          }}
                          className="w-full border-green-500/30 text-green-700 dark:text-green-300 hover:bg-green-500/20"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp us now
                        </Button>
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24-48 hours during business days.
                    </p>
                  </form>
                </Card>

                {/* Contact Information */}
                <div className="space-y-8">
                  <Card className="p-6 border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Email</p>
                          <a href="mailto:hello@institutionaltrader.ke" className="text-primary hover:underline">
                            hello@institutionaltrader.ke
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">WhatsApp</p>
                          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            +254 101 316 169
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Location</p>
                          <p className="text-muted-foreground">Nairobi, Kenya</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Response Time</p>
                          <p className="text-muted-foreground">24-48 hours (business days)</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-between" asChild>
                        <Link to="/strategy">
                          <span className="flex items-center">
                            <LineChart className="h-4 w-4 mr-2" /> Learn About DRIVE Strategy
                          </span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-between" asChild>
                        <Link to="/faqs">
                          <span className="flex items-center">
                            <HelpCircle className="h-4 w-4 mr-2" /> View FAQs
                          </span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-between" asChild>
                        <Link to="/blog">
                          <span className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2" /> Read Our Blog
                          </span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 border border-border bg-accent/50">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Important Notice</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        <strong>Educational Support Only:</strong> We provide educational support and answer questions about our learning materials.
                      </p>
                      <p>
                        <strong>Not Financial Advice:</strong> We do not provide personalized investment advice or trading recommendations.
                      </p>
                      <p>
                        <strong>No Trading Support:</strong> We cannot help with broker issues, platform problems, or trade execution support.
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider variant="wave" className="text-muted" />

        {/* Social Links */}
        <section className="py-20 near-footer-contrast grain-texture">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Follow Our Educational Content
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Stay updated with our latest educational content and market insights
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="lg">
                  Telegram Channel
                </Button>
                <Button variant="outline" size="lg">
                  YouTube
                </Button>
                <Button variant="outline" size="lg">
                  Twitter/X
                </Button>
                <Button variant="outline" size="lg">
                  Instagram
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                All social content is educational only. Trading involves risk.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />

      <Dialog open={isEmailModalOpen} onOpenChange={(open) => { setIsEmailModalOpen(open); if (!open) setEmailCopied(false); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact us by email</DialogTitle>
            <DialogDescription>
              If your email app didn’t open, you can copy our address or try again.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="rounded-md bg-muted/40 p-3 text-sm">
              <span className="font-medium">Email:</span> <a href={`mailto:${supportEmail}`} className="text-primary hover:underline">{supportEmail}</a>
            </div>
            {emailCopied ? (
              <p className="text-sm text-green-600 dark:text-green-400">Copied to clipboard.</p>
            ) : null}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={async () => {
              try {
                await navigator.clipboard.writeText(supportEmail);
                setEmailCopied(true);
              } catch {
                setEmailCopied(false);
              }
            }}>
              Copy email
            </Button>
            <Button onClick={() => {
              const subject = 'Contact from website';
              const body = 'Hi KenneDyne spot team,\n\nI would like to get in touch regarding...';
              const mailto = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              window.location.href = mailto;
            }}>
              <Mail className="h-4 w-4 mr-2" /> Open mail app
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
