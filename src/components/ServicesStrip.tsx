import { Button } from "@/components/ui/button";
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const ServicesStrip = () => {
  const { elementRef: sectionRef, isVisible, visibleItems } = useStaggeredAnimation(6, 150);
  
  const services = [
    {
      title: "Health Systems Strengthening",
      description: "Comprehensive health workforce development, care financing strategies, and universal health care service delivery consultancies.",
      href: "#services"
    },
    {
      title: "Financial Analysis & Economics",
      description: "Corporate financial modeling, capital raising, investment case development, and program-based budgeting solutions.",
      href: "#services"
    },
    {
      title: "Monitoring & Evaluation",
      description: "Program evaluation, quality impact assessments, baseline and end-term evaluations with interactive dashboards.",
      href: "#services"
    },
    {
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
                
                <h3 className="text-lg font-serif font-semibold text-primary mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
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