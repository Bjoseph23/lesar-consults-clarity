import { Button } from "@/components/ui/button";
import { FileText, Calendar, RotateCcw, ArrowLeft, ExternalLink } from "lucide-react";

interface SuccessOptionsProps {
  onNewRequest: () => void;
}

const SuccessOptions = ({ onNewRequest }: SuccessOptionsProps) => {
  return (
    <div className="animate-fade-in min-h-screen w-full px-4 py-8 sm:py-12">
      {/* Back to Home Button */}
      <div className="flex justify-start mb-6">
        <Button
          variant="ghost"
          onClick={() => (window.location.href = "/")}
          className="group flex items-center space-x-2 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
          <span className="group-hover:text-white transition-colors">
            Back to Home
          </span>
        </Button>
      </div>

      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-navy mb-3 sm:mb-4">
          Thank you for your request!
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Choose your next step below
        </p>
      </div>

      {/* Two Column Options */}
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto lg:divide-x lg:divide-border">
        {/* Left Column - Schedule Demo */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-card p-6 sm:p-8 lg:pr-12 flex flex-col justify-center">
          <div className="text-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-semibold text-navy mb-2">
              Schedule a Demo Meeting
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Book a time that works for you to discuss your project in detail.
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={() =>
                window.open("https://calendly.com/momondi9773-stu/30min", "_blank")
              }
              className="w-full hover-scale text-sm sm:text-base bg-[#8B1E1E] text-white hover:bg-[#731818] hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Let's Talk - Book a  Virtual meeting</span>
            </Button>
          </div>
        </div>

        {/* Right Column - Resources */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-card p-6 sm:p-8 hover:shadow-elegant transition-all duration-300 lg:pl-12 flex flex-col justify-center">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-navy" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-semibold text-navy mb-3 sm:mb-4">
              Explore More Resources
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Learn more about our case studies, articles and insights while you
              wait for our response.
            </p>
            <Button
              size="lg"
              className="btn-primary w-full hover-scale text-sm sm:text-base"
              onClick={() => (window.location.href = "/resources")}
            >
              Go to Resources
            </Button>
          </div>
        </div>
      </div>

      {/* New Request Button */}
      <div className="text-center mt-8 sm:mt-12">
        <Button
          variant="outline"
          onClick={onNewRequest}
          className="flex items-center space-x-2 hover-scale text-sm sm:text-base"
          size="lg"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Start a new request</span>
        </Button>
      </div>
    </div>
  );
};

export default SuccessOptions;
