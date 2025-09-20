import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface CTAInlineProps {
  title?: string;
  description?: string;
  primaryButton?: {
    text: string;
    link: string;
  };
  variant?: 'default' | 'minimal' | 'accent';
}

const CTAInline = ({ 
  title = "Ready to Start Your Next Project?",
  description = "Contact us today to explore how we can collaborate on your unique needs",
  primaryButton = { text: "Talk to an Expert", link: "/contact" },
  variant = 'default'
}: CTAInlineProps) => {
  const bgClass = variant === 'accent' ? 'bg-accent text-accent-foreground' 
                  : variant === 'minimal' ? 'bg-secondary/30' 
                  : 'bg-primary text-primary-foreground';

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
          {title}
        </h2>
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center text-sm opacity-80">
            <Mail className="h-4 w-4 mr-2" />
            lesarconsults@gmail.com
          </div>
          <div className="flex items-center text-sm opacity-80">
            <Phone className="h-4 w-4 mr-2" />
            +254 710 715 132
          </div>
          <Button
            asChild
            variant={variant === 'default' ? 'secondary' : 'default'}
            className="group"
          >
            <Link to={primaryButton.link}>
              <Phone className="h-4 w-4 mr-2" />
              {primaryButton.text}
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <p className="text-sm mt-4 opacity-75">
          We usually respond within 2 business days
        </p>
      </div>
    </section>
  );
};

export default CTAInline;