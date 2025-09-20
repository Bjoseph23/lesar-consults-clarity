import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

interface AboutHeroProps {
  headline: string;
  subhead: string;
  primaryCTA: {
    text: string;
    link: string;
  };
  secondaryCTA: {
    text: string;
    anchor: string;
  };
}

const AboutHero = ({ headline, subhead, primaryCTA, secondaryCTA }: AboutHeroProps) => {
  const scrollToSection = (anchor: string) => {
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-cream opacity-60"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%), 
                         radial-gradient(circle at 80% 20%, hsl(var(--accent)) 0%, transparent 50%)`,
        opacity: 0.1
      }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary leading-tight">
              {headline}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {subhead}
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg"
              className="btn-primary group px-8 py-4"
            >
              <Link to={primaryCTA.link}>
                <Phone className="h-5 w-5 mr-2" />
                {primaryCTA.text}
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="btn-secondary px-8 py-4"
            >
              <Link to="/team">
                Meet our Team
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
          </div>

          {/* Decorative Elements */}
          <div className="relative mt-16">
            <div className="flex justify-center items-center space-x-8">
              <div className="w-32 h-32 bg-placeholder-400 rounded-2xl opacity-40 animate-pulse"></div>
              <div className="w-40 h-40 bg-placeholder-300 rounded-3xl opacity-60 animate-pulse delay-100"></div>
              <div className="w-32 h-32 bg-placeholder-400 rounded-2xl opacity-40 animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;