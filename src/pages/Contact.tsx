import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/contact/ContactForm";
import CalendlyEmbed from "@/components/contact/CalendlyEmbed";
import ContactSummary from "@/components/contact/ContactSummary";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, Phone, Mail, MapPin } from "lucide-react";

interface ContactData {
  fullName: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  services: string[];
  description: string;
  budget: string;
  timeframe: string;
  file: File | null;
  consent: boolean;
}

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactData | null>(null);
  const { toast } = useToast();

  // SEO optimization
  useEffect(() => {
    document.title = "Contact Us - Lesar Consults Ltd | Request a Proposal";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact Lesar Consults for professional health systems, economics and analytics consulting services. Request a customized proposal for your project needs.');
    }
  }, []);

  const handleFormSubmit = async (data: ContactData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmittedData(data);
    setIsSuccess(true);
    setIsSubmitting(false);
    
    toast({
      title: "Success!",
      description: "Thanks — we received your request. We'll be in touch within 2 business days.",
    });

    // Auto-redirect to home after 4 seconds
    setTimeout(() => {
      window.location.href = "/";
    }, 4000);
  };

  const partnerLogos = [
    { src: "/logos/ministry-of-health-logo.png", alt: "Ministry of Health" },
    { src: "/logos/unicef-logo.png", alt: "UNICEF" },
    { src: "/logos/usaid-logo.png", alt: "USAID" },
    { src: "/logos/worldbank-logo.png", alt: "World Bank" },
  ];

  if (isSuccess && submittedData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onContactModalOpen={() => {}} />
        <main className="pt-20 pb-16">
          <ContactSummary data={submittedData} />
        </main>
        <Footer onContactModalOpen={() => {}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar onContactModalOpen={() => {}} />

      {/* Main Content */}
      <main className="pt-20" id="main-content">
        {/* Hero Section */}
        <section className="relative bg-gradient-subtle py-16 overflow-hidden">
          {/* Background Graphics */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-10 w-32 h-32 border border-primary/10 rounded-full"></div>
            <div className="absolute bottom-20 left-10 w-24 h-24 bg-accent/5 rounded-full"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-secondary/20 rotate-45"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6">
                Let's Discuss Your Project
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Tell us about your needs and we'll get back within 2 business days.
              </p>
              
              {/* Trust Line */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground mb-12">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  lesarconsults@gmail.com
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +254 710 715 132
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Button
                  variant="outline"
                  className="bg-white border-primary/20 hover:bg-primary/5"
                  asChild
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    Download Firm Profile (PDF)
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="bg-white border-primary/20 hover:bg-primary/5"
                  asChild
                >
                  <a href="/#projects">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Our Case Studies
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl shadow-elegant p-8">
                  <h2 className="text-2xl font-serif font-semibold text-primary mb-6">
                    Request a Proposal
                  </h2>
                  <ContactForm
                    onSubmit={handleFormSubmit}
                    isSubmitting={isSubmitting}
                    prefillService={searchParams.get('service') || ''}
                    prefillSource={searchParams.get('source') || ''}
                  />
                </div>
              </div>

              {/* Calendly Embed */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-2xl shadow-elegant p-8">
                  <h2 className="text-2xl font-serif font-semibold text-primary mb-6">
                    Book a Demo
                  </h2>
                  <CalendlyEmbed />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alternate Contact Options & Trust */}
        <section className="py-16 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-serif font-semibold text-primary mb-4">
                    Get in Touch
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-accent" />
                      <span>+254 710 715 132</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-accent" />
                      <span>lesarconsults@gmail.com</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-accent mt-1" />
                      <span>P.O. Box 43239-80100<br />Mombasa, Kenya</span>
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div>
                  <h3 className="text-lg font-serif font-semibold text-primary mb-4">
                    Office Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>Monday - Friday: 8:00 AM - 6:00 PM EAT</div>
                    <div>Saturday: 9:00 AM - 1:00 PM EAT</div>
                    <div>Sunday: Closed</div>
                    <div className="text-muted-foreground mt-3">
                      We usually respond within 2 business days
                    </div>
                  </div>
                </div>

                {/* Partner Logos */}
                <div>
                  <h3 className="text-lg font-serif font-semibold text-primary mb-4">
                    Trusted Partners
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {partnerLogos.map((logo, index) => (
                      <div key={index} className="flex items-center justify-center p-2 bg-gray-50 rounded-lg">
                        <img 
                          src={logo.src} 
                          alt={logo.alt}
                          className="h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Privacy Note */}
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Your privacy is important to us. We collect and process your personal data solely for responding to your inquiry. 
                  Read our <a href="#" className="text-primary hover:underline">privacy policy</a> for more details.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onContactModalOpen={() => {}} />
    </div>
  );
};

export default Contact;