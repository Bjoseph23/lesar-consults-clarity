import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const ResourcesGrid = () => {
  const { elementRef: sectionRef, isVisible } = useScrollAnimation();
  const { elementRef: gridRef, visibleItems } = useStaggeredAnimation(3, 150);
  
  const resources = [
    {
      category: "Case Study",
      title: "Kenya National Surgical Services Strategic Plan 2025-2030",
      summary: "Comprehensive roadmap to transform surgical care delivery across all levels of the health system.",
      date: "July 2025",
      href: "#resources"
    },
    {
      category: "Report",
      title: "Nairobi County Mental Health Strategic Plan 2025-2030",
      summary: "Integrating primary health care systems for inclusive community-centered mental health services.",
      date: "June 2025",
      href: "#resources"
    },
    {
      category: "Article",
      title: "Health Systems Strengthening in East Africa",
      summary: "Evidence-based approaches to strengthening preventive and promotive service delivery systems.",
      date: "March 2024",
      href: "#resources"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Case Study":
        return "bg-accent/10 text-accent";
      case "Report":
        return "bg-primary/10 text-primary";
      case "Article":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section ref={sectionRef} id="resources" className={`py-20 bg-background transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Latest Resources
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, research findings, and strategic frameworks from our recent projects
          </p>
        </div>
        
        <div ref={gridRef as React.RefObject<HTMLDivElement>} className="grid md:grid-cols-3 gap-8 mb-12">
          {resources.map((resource, index) => (
            <article
              key={resource.title}
              className={`card-elevated group transition-all duration-1000 ${visibleItems.includes(index) ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}
            >
              <div className="mb-4">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(resource.category)}`}>
                  {resource.category}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="w-full h-32 bg-gradient-subtle rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-muted-foreground text-sm">Resource Thumbnail</div>
                </div>
              </div>
              
              <h3 className="text-lg font-serif font-semibold text-primary mb-3 group-hover:text-primary/80 transition-colors">
                {resource.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {resource.summary}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {resource.date}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary/80 p-0 h-auto font-medium group"
                  asChild
                >
                  <a href={resource.href} className="flex items-center">
                    Read more
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center">
          {/* <Button variant="outline" className="btn-secondary">
          </Button> */}
                      <Link variant="outline" className="btn-secondary" to="/resources"> View All Resources</Link>

        </div>
      </div>
    </section>
  );
};

export default ResourcesGrid;