import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Users } from "lucide-react";

const CTASection = () => {
  return (
    <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center text-white">
      <h2 className="text-3xl md:text-4xl font-serif mb-4">
        Work with Lesar Consults
      </h2>
      <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        Evidence-based research & advisory services tailored to drive meaningful impact 
        in health systems, economics, and development.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          asChild
          size="lg"
          variant="secondary"
          className="bg-white text-navy hover:bg-white/90"
        >
          <Link to="/contact">
            <FileText className="mr-2 h-5 w-5" />
            Request Proposal
          </Link>
        </Button>
        
        <Button 
          asChild
          size="lg"
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-navy"
        >
          <Link to="/services">
            <Users className="mr-2 h-5 w-5" />
            Explore Our Services
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CTASection;