import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const CalendlyEmbed = () => {
  return (
    <div className="flex justify-center">
      <Button 
        variant="destructive" 
        size="lg"
        onClick={() => window.open('https://calendly.com/momondi9773-stu/30min', '_blank')}
        className="btn-primary w-full hover-scale text-sm sm:text-base"
      >
        <ExternalLink className="h-4 w-4" />
        <span>Lets Talk- Book a meeting</span>
      </Button>
    </div>
  );
};

export default CalendlyEmbed;
