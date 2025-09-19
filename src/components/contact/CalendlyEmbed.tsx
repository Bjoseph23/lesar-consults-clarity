import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const CalendlyEmbed = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Button 
        variant="destructive" 
        size="lg"
        onClick={() => window.open('https://calendly.com/momondi9773-stu/30min', '_blank')}
        className="flex items-center space-x-2 hover-scale transition-all duration-300 hover:shadow-lg"
      >
        <ExternalLink className="h-4 w-4" />
        <span>Lets- Talk- Book a Meeting</span>
      </Button>
      <p className="text-xs text-muted-foreground">
        Opens in a new tab if embed is unavailable
      </p>
    </div>
  );
};

export default CalendlyEmbed;