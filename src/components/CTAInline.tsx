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
  primaryButton = {
    text: "Talk to an Expert",
    link: "/contact"
  },
  variant = 'default'
}: CTAInlineProps) => {
  const bgClass = variant === 'accent' ? 'bg-accent text-accent-foreground' : variant === 'minimal' ? 'bg-secondary/30' : 'bg-primary text-primary-foreground';
  
  return (
    <section className={`py-16 px-4 ${bgClass}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">{description}</p>
        <Button asChild size="lg" variant={variant === 'default' ? 'secondary' : 'default'}>
          <Link to={primaryButton.link} className="inline-flex items-center gap-2">
            {primaryButton.text}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
export default CTAInline;