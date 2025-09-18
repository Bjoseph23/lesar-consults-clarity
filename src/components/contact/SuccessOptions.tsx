import { Button } from "@/components/ui/button";
import { FileText, Calendar, RotateCcw } from "lucide-react";
import CalendlyEmbed from "./CalendlyEmbed";

interface SuccessOptionsProps {
  onNewRequest: () => void;
}

const SuccessOptions = ({ onNewRequest }: SuccessOptionsProps) => {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-navy mb-4">
          Thank you for your request!
        </h1>
        <p className="text-lg text-muted-foreground">
          Choose your next step below
        </p>
      </div>

      {/* Two Column Options */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left Column - Resources */}
        <div className="bg-white rounded-2xl shadow-card p-8 hover:shadow-elegant transition-all duration-300">
          <div className="text-center">
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-navy" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-navy mb-4">
              Explore More Resources
            </h3>
            <p className="text-muted-foreground mb-6">
              Learn more about our services, case studies, and insights while you wait for our response.
            </p>
            <Button 
              size="lg" 
              className="btn-primary w-full hover-scale"
              onClick={() => window.location.href = '/#resources'}
            >
              Go to Resources
            </Button>
          </div>
        </div>

        {/* Right Column - Calendly */}
        <div className="bg-white rounded-2xl shadow-card p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-navy mb-2">
              Schedule a Demo Meeting
            </h3>
            <p className="text-muted-foreground mb-6">
              Book a time that works for you to discuss your project in detail.
            </p>
          </div>
          
          <CalendlyEmbed />
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center my-12 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-border"></div>
        <div className="px-4 text-muted-foreground text-sm">or</div>
        <div className="flex-1 h-px bg-border"></div>
      </div>

      {/* New Request Button */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={onNewRequest}
          className="flex items-center space-x-2 hover-scale"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Start a new request</span>
        </Button>
      </div>
    </div>
  );
};

export default SuccessOptions;