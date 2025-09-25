import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Footer = () => {
  const navigation = {
    main: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Team", href: "/team" },
      { name: "Services", href: "/services" },
      { name: "Resources", href: "/resources" },
      { name: "Projects", href: "/projects" },
    ],
    services: [
      { name: "Health Systems Strengthening", href: "/services/health-systems-strengthening" },
      { name: "Financial Analysis & Economics", href: "/services/financial-analysis-economics" },
      { name: "Monitoring & Evaluation", href: "/services/monitoring-evaluation" },
      { name: "Research & Surveys", href: "/services/customized-research-analysis-surveys" },
      { name: "HR & Capacity Building", href: "/services/hr-management-capacity-building" },
      { name: "Policy & Advocacy", href: "/services/policy-advocacy-development" },
      { name: "Project Management", href: "/services/project-management" }
    ]
  };

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            name: 'Newsletter Subscriber',
            email: email,
            interested_in: 'Newsletter Subscription',
            message: 'Subscribed to newsletter'
          }
        ]);

      if (error) throw error;
      
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error("Error subscribing to newsletter. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* CTA Strip */}
      <div className="bg-accent text-accent-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Contact us today to explore how we can collaborate on your unique needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2" />
              lesarconsults@gmail.com
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2" />
              +254 710 715 132
            </div>
            <Button
              onClick={() => (window.location.href = "/contact")}
              variant="secondary"
              className="bg-white text-accent hover:bg-white/90 cta-glisten"
            >
              Request a Proposal
            </Button>
          </div>
          <p className="text-sm mt-4 opacity-75">
            We usually respond within 2 business days
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <img
                src="/lesar-logoo.png"
                alt="Lesar Consults"
                className="h-8 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-sm text-primary-foreground/80 mb-6 leading-relaxed">
                Premier data, research and analytics consultancy firm serving as a hub of
                innovation and excellence to demystify opinions across East Africa and
                beyond.
              </p>

              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-primary-foreground/80">
                    <p>P.O. Box 43239-80100, Mombasa</p>
                    <p>Head Office: Tom Mboya Avenue, Nairobi</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                  <div className="text-sm text-primary-foreground/80">
                    <p>Director & CEO: +254 723 280 941</p>
                    <p>Head of Operations: +254 710 715 132</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                  <a
                    href="mailto:lesarconsults@gmail.com"
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    lesarconsults@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-lg font-serif font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-serif font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h3 className="text-lg font-serif font-semibold mb-4">Stay Updated</h3>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Subscribe to our newsletter for the latest insights and updates.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60"
                  required
                />
                <Button
                  type="submit"
                  variant="secondary"
                  disabled={isSubmitting}
                  className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 disabled:opacity-50"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-primary-foreground/60 mb-4 md:mb-0">
              © 2025 Lesar Consults Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
