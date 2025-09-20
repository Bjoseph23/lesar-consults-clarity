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
    <section className="py-16 md:py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary leading-tight">
                {headline}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {subhead}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg"
                className="btn-primary group"
              >
                <Link to={primaryCTA.link}>
                  <Phone className="h-5 w-5 mr-2" />
                  {primaryCTA.text}
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                onClick={() => scrollToSection(secondaryCTA.anchor)}
                className="btn-secondary"
              >
                {secondaryCTA.text}
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-gradient-primary rounded-3xl p-8 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Lesar Consults - Data Analytics Visualization" 
                className="w-full h-full object-contain opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/20 to-dark-red/20 rounded-3xl"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-2xl opacity-80"></div>
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-secondary rounded-xl opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;