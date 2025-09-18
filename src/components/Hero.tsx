import { Button } from "@/components/ui/button";

interface HeroProps {
  onContactModalOpen: () => void;
}

const Hero = ({ onContactModalOpen }: HeroProps) => {
  const partners = [
    "USAID", "World Bank", "UNICEF", "WHO", "DFID", "Global Fund"
  ];

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-subtle pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 text-balance">
            Demystifying opinions in health systems, economics and analytics
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
            Premier data, research and analytics consultancy firm serving as a hub of innovation and excellence to deliver evidence-based solutions across East Africa and beyond.
          </p>
          
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={onContactModalOpen}
              className="btn-primary text-lg px-8 py-4"
              size="lg"
            >
              Request a Proposal
            </Button>
            <Button
              onClick={scrollToProjects}
              variant="outline"
              className="btn-secondary text-lg px-8 py-4"
              size="lg"
            >
              View Our Work
            </Button>
          </div>
          
          {/* Trust Line and Partners */}
          <div className="animate-slide-up">
            <p className="text-sm text-muted-foreground mb-6">
              Trusted by leading international organizations and government agencies
            </p>
            
            {/* Partner Logos Row */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              {partners.map((partner, index) => (
                <div
                  key={partner}
                  className="text-sm font-medium text-muted-foreground bg-card px-4 py-2 rounded-lg border border-border hover:border-primary/20 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;