import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { Heart, TrendingUp, BarChart3, Search } from "lucide-react";

const ServicesStrip = () => {
  const { elementRef: sectionRef, isVisible, visibleItems } = useStaggeredAnimation(6, 150);
  
  const services = [
    {
      icon: Heart,
      title: "Health Systems Strengthening",
      description: "Comprehensive health workforce development, care financing strategies, and universal health care service delivery consultancies.",
      linkto: "/services/health-systems-strengthening"
    },
    {
      icon: TrendingUp,
      title: "Financial Analysis & Economics",
      description: "Corporate financial modeling, capital raising, investment case development, and program-based budgeting solutions.",
      linkto: "/services/financial-analysis-economics"
    },
    {
      icon: BarChart3,
      title: "Monitoring & Evaluation",
      description: "Program evaluation, quality impact assessments, baseline and end-term evaluations with interactive dashboards.",
      linkto: "/services/monitoring-evaluation"
    },
    {
      icon: Search,
      title: "Customized Research & Surveys",
      description: "Epidemiological studies, risk analysis, household surveys, and publications in peer-reviewed journals.",
      linkto: "/services/customized-research-analysis-surveys"
    }
  ];

  return (
    <section ref={sectionRef} id="services-preview" className="py-20 bg-background relative overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-accent/5 to-transparent rounded-full blur-2xl"></div>
      </div>
      
      {/* Decorative dots pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 right-20 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-40 left-20 w-1 h-1 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Our Core Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Delivering competency-based services that drive impactful results across health systems, economics, and analytics
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`card-service group transition-all duration-300 flex flex-col h-full ${visibleItems.includes(index) ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-lg font-serif font-semibold text-primary mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-grow">
                  {service.description}
                </p>
                
                <div className="mt-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="btn-secondary duration-300"
                    asChild
                  >
                    <Link to={service.linkto} className="inline-flex items-center">
                      Learn more &rarr;
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesStrip;
