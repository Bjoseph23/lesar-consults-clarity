import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const CalendlyEmbed = () => {
  useEffect(() => {
    // TODO: Paste your Calendly embed script here
    // Example:
    // const script = document.createElement('script');
    // script.src = 'https://assets.calendly.com/assets/external/widget.js';
    // script.async = true;
    // document.body.appendChild(script);
    
    // For now, we'll show a placeholder
    console.log("Calendly embed would be initialized here");
  }, []);

  return (
    <div className="space-y-4">
      {/* Calendly Inline Widget Container */}
      <div 
        className="calendly-inline-widget" 
        data-url="https://calendly.com/YOUR_CALENDLY_LINK"
        style={{ minWidth: '320px', height: '400px' }}
      >
        {/* 
          TODO: Replace with your actual Calendly embed
          1. Sign up for Calendly and create an event
          2. Get your embed code from Calendly
          3. Replace the data-url above with your actual Calendly link
          4. Add the Calendly widget script to the useEffect above
          
          Example embed script:
          <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
        */}
        
        {/* Placeholder Content */}
        <div className="bg-muted/50 rounded-lg p-8 text-center h-full flex flex-col justify-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="font-semibold text-navy mb-2">Calendly Integration</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Calendar widget will appear here once Calendly is configured.
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            See README.md for setup instructions.
          </p>
        </div>
      </div>

      {/* Fallback Link */}
      <div className="text-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open('https://calendly.com/YOUR_CALENDLY_LINK', '_blank')}
          className="flex items-center space-x-2"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Open Calendar</span>
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Opens in a new tab if embed is unavailable
        </p>
      </div>
    </div>
  );
};

// Placeholder Calendar icon
const Calendar = ({ className, ...props }: { className?: string }) => (
  <svg 
    className={className} 
    {...props}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default CalendlyEmbed;