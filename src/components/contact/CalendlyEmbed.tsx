import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const CalendlyEmbed = () => {
  return (
    <div className="text-center">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => window.open('https://calendly.com/momondi9773-stu/30min', '_blank')}
        className="flex items-center space-x-2"
      >
        <ExternalLink className="h-4 w-4" />
        <span>Book a demo Meeting/ Talk with us</span>
      </Button>
      <p className="text-xs text-muted-foreground mt-2">
        Opens in a new tab if embed is unavailable
      </p>
    </div>
  );
};

export default CalendlyEmbed;