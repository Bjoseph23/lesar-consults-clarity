import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const { elementRef: heroRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in-right');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(image);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} id="home" className={`relative min-h-screen bg-gradient-subtle pt-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-16">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center lg:order-1 order-2">
            {/* Main Headline */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 text-balance transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
              Demystifying opinions in health systems, economics and analytics
            </h1>
            
            {/* Subheadline */}
            <p className={`text-xl md:text-2xl text-muted-foreground mb-8 text-balance transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
              Lesar Consults: Evidence-based research, analytics and advisory for health systems, finance, and development across Kenya and East Africa.
            </p>
            
            {/* Call-to-Action Buttons */}
            <div className={`flex flex-col gap-4 max-w-md transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
              <Button
                onClick={() => window.location.href = '/contact'}
                className="bg-dark-red hover:bg-dark-red/90 text-white text-lg px-8 py-4 w-full sm:w-auto group relative overflow-hidden cta-glisten"
                size="lg"
                aria-label="Request a proposal - navigates to contact page"
              >
                <span className="relative z-10">Request a Proposal</span>
                <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
              </Button>
              <Button
                onClick={scrollToProjects}
                variant="outline"
                className="border-navy text-navy hover:bg-navy hover:text-white text-lg px-8 py-4 w-full sm:w-auto"
                size="lg"
                aria-label="View our work - scrolls to projects section"
              >
                <Link to="/projects">
                View Our Work
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="flex justify-center lg:order-2 order-1">
            <div className="relative max-w-lg w-full">
              <img
                ref={imageRef}
                src="/placeholder.svg"
                alt="Lesar Consults team working on health systems research and analytics"
                className="w-full h-auto object-contain opacity-0 transition-all duration-700"
                style={{ maxWidth: '560px' }}
                loading="lazy"
              />
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