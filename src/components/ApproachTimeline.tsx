import { useState } from "react";
import { 
  Search, 
  PenTool, 
  Rocket, 
  BarChart, 
  TrendingUp,
  LucideIcon 
} from "lucide-react";

interface Step {
  title: string;
  description: string;
  detail: string;
  icon: string;
}

interface ApproachTimelineProps {
  title: string;
  subtitle: string;
  steps: Step[];
}

const iconMap: Record<string, LucideIcon> = {
  Search,
  PenTool,
  Rocket,
  BarChart,
  TrendingUp,
};

const ApproachTimeline = ({ title, subtitle, steps }: ApproachTimelineProps) => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>
        
        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2"></div>
            
            <div className="flex justify-between items-center relative">
              {steps.map((step, index) => {
                const IconComponent = iconMap[step.icon] || Search;
                const isHovered = hoveredStep === index;
                
                return (
                  <div 
                    key={index}
                    className="flex flex-col items-center group cursor-pointer"
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    <div className="relative mb-8">
                      <div className={`w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center transition-all duration-300 ${
                        isHovered ? 'scale-110 shadow-elegant' : 'group-hover:scale-105'
                      }`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full"></div>
                    </div>
                    
                    <div className="text-center max-w-xs">
                      <h3 className="text-lg font-serif font-semibold text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {step.description}
                      </p>
                      
                      <div className={`transition-all duration-300 overflow-hidden ${
                        isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-xs text-accent font-medium bg-card p-2 rounded-lg border">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Mobile Cards */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => {
            const IconComponent = iconMap[step.icon] || Search;
            
            return (
              <div key={index} className="card-elevated">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-semibold text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    <p className="text-xs text-accent">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ApproachTimeline;