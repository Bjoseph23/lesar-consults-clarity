import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Footer = () => {
  const navigation = {
    main: [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Team", href: "#team" },
      { name: "Services", href: "#services" },
      { name: "Resources", href: "#resources" },
      { name: "Projects", href: "#projects" },
    ],
    services: [
      { name: "Health Systems Strengthening", href: "#services" },
      { name: "Financial Analysis & Economics", href: "#services" },
      { name: "Monitoring & Evaluation", href: "#services" },
      { name: "Research & Surveys", href: "#services" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms & Conditions", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
    ]
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup functionality would be implemented here
    alert("Thank you for subscribing to our newsletter!");
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
              onClick={() => window.location.href = '/contact'}
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
                Premier data, research and analytics consultancy firm serving as a hub of innovation and excellence to demystify opinions across East Africa and beyond.
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
                    <a
                      href={item.href}
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {item.name}
                    </a>
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
                    <a
                      href={item.href}
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {item.name}
                    </a>
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
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60"
                  required
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Subscribe
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
            
            <div className="flex space-x-6">
              {navigation.legal.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-primary-foreground/60 hover:text-primary-foreground/80 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;