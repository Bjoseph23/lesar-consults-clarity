import { Button } from "@/components/ui/button";
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { Heart, TrendingUp, BarChart3, Search } from "lucide-react";

const ServicesStrip = () => {
  const { elementRef: sectionRef, isVisible, visibleItems } = useStaggeredAnimation(6, 150);
  
  const services = [
    {
      icon: Heart,
      title: "Health Systems Strengthening",
      description: "Comprehensive health workforce development, care financing strategies, and universal health care service delivery consultancies.",
      href: "#services"
    },
    {
      icon: TrendingUp,
      title: "Financial Analysis & Economics",
      description: "Corporate financial modeling, capital raising, investment case development, and program-based budgeting solutions.",
      href: "#services"
    },
    {
      icon: BarChart3,
      title: "Monitoring & Evaluation",
      description: "Program evaluation, quality impact assessments, baseline and end-term evaluations with interactive dashboards.",
      href: "#services"
    },
    {
      icon: Search,
      title: "Customized Research & Surveys",
      description: "Epidemiological studies, risk analysis, household surveys, and publications in peer-reviewed journals.",
      href: "#services"
    }
  ];

  return (
    <section ref={sectionRef} id="services-preview" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            return (
              <div
                key={service.title}
                className={`card-service group transition-all duration-1000 ${visibleItems.includes(index) ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-lg font-serif font-semibold text-primary mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-white hover:bg-primary px-3 py-2 h-auto font-medium transition-all duration-300"
                  asChild
                >
                  <a href={service.href}>
                    Learn more →
                  </a>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesStrip;