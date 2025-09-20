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
  return;
};
export default CTAInline;