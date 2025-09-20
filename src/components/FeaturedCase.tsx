import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const FeaturedCase = () => {
  const { elementRef: sectionRef, isVisible } = useScrollAnimation();
  const { elementRef: contentRef, visibleItems } = useStaggeredAnimation(4, 200);
  
  return (
    <section ref={sectionRef} id="featured-case" className={`py-20 bg-card transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef as React.RefObject<HTMLDivElement>} className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-6">
              <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                Featured Case Study
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Maternal and Child Health Initiative Project
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              World Bank-funded initiative focused on improving maternal and child health services across target regions in Kenya.
            </p>
            
            <div className="bg-background border border-border rounded-lg p-6 mb-6">
              <h3 className="text-xl font-serif font-semibold text-primary mb-4">
                Key Results Achieved
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-accent rounded-full mr-3"></div>
                  <span className="text-sm">
                    <strong>15% reduction</strong> in maternal mortality rate
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-accent rounded-full mr-3"></div>
                  <span className="text-sm">
                    <strong>95% immunization</strong> coverage achieved
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary">
                <Link to="/services/monitoring-evaluation">
                Explore Our Approach — M&E
                  </Link>
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="btn-secondary">
                <Link to="/projects">
                    View all projects
                  </Link>
              </Button>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="animate-slide-up">
            <div className="bg-gradient-primary rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold mb-4">
                  Project Timeline
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-white rounded-full mr-4"></div>
                    <div>
                      <p className="font-medium">August 2021 - February 2022</p>
                      <p className="text-sm opacity-90">8-month implementation</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-white/70 rounded-full mr-4"></div>
                    <div>
                      <p className="font-medium">Client: World Bank</p>
                      <p className="text-sm opacity-90">Maternal & child health services</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-white/50 rounded-full mr-4"></div>
                    <div>
                      <p className="font-medium">Impact: Regional Coverage</p>
                      <p className="text-sm opacity-90">Multiple target regions</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCase;