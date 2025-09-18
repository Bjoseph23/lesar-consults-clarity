import { Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const CalendlyEmbed = () => {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Schedule a 30-minute consultation to discuss your project needs in detail.
      </p>
      
      {/* Calendly Embed Placeholder */}
      <div className="border-2 border-dashed border-border rounded-lg p-8 min-h-[400px] flex flex-col items-center justify-center bg-muted/20">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-center mb-2">
          Calendly Integration
        </h3>
        <p className="text-sm text-muted-foreground text-center mb-4 max-w-sm">
          This is where your Calendly widget will appear. The embed will allow visitors to book appointments directly.
        </p>
        
        {/* TODO: Paste your Calendly embed script or iframe here. See README for instructions. */}
        {/* 
        Example Calendly embed code:
        <div className="calendly-inline-widget" data-url="https://calendly.com/your-username/consultation" style={{minWidth:'320px',height:'630px'}}></div>
        <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
        */}
        
        {/* Fallback Link */}
        <Button 
          variant="outline" 
          asChild
          className="mt-4"
        >
          <a 
            href="https://calendly.com/lesarconsults/consultation" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Book on Calendly
          </a>
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground">
        <p className="mb-2">
          <strong>Available times:</strong> Monday-Friday 8:00 AM - 6:00 PM EAT
        </p>
        <p>
          Can't find a suitable time? Email us at lesarconsults@gmail.com
        </p>
      </div>
    </div>
  );
};

export default CalendlyEmbed;