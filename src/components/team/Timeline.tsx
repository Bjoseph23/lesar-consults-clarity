import { useState } from "react";
import { Building, Globe, Shield, Map, Cpu, Handshake } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: string;
}

interface TimelineProps {
  milestones: Milestone[];
}

const iconMap = {
  building: Building,
  globe: Globe,
  shield: Shield,
  map: Map,
  cpu: Cpu,
  handshake: Handshake,
};

const Timeline = ({ milestones }: TimelineProps) => {
  const { elementRef, isVisible } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div ref={elementRef as React.RefObject<HTMLDivElement>}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
          Journey Through the Years
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Key milestones that have shaped our growth and impact in the consulting industry.
        </p>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2" />
          
          {/* Timeline Items */}
          <div className="relative flex justify-between items-center">
            {milestones.map((milestone, index) => {
              const Icon = iconMap[milestone.icon as keyof typeof iconMap] || Building;
              
              return (
                <div
                  key={index}
                  className={`relative transition-all duration-300 ${
                    isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Timeline Node */}
                  <div className="w-12 h-12 rounded-full border-4 border-primary bg-primary text-primary-foreground flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Year Label */}
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                    <span className="text-sm font-medium px-2 py-1 rounded bg-primary text-primary-foreground">
                      {milestone.year}
                    </span>
                  </div>

                  {/* Milestone Details - Always Visible */}
                  <div className={`absolute ${index % 2 === 0 ? 'top-24' : 'bottom-24'} left-1/2 transform -translate-x-1/2 
                    w-64 p-4 bg-card border border-border rounded-lg shadow-card`}>
                    <h4 className="font-serif text-foreground font-semibold mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden space-y-6">
        {milestones.map((milestone, index) => {
          const Icon = iconMap[milestone.icon as keyof typeof iconMap] || Building;
          
          return (
            <div
              key={index}
              className={`flex items-start space-x-4 transition-all duration-500 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Timeline Node */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Icon className="h-4 w-4" />
                </div>
                {index < milestones.length - 1 && (
                  <div className="w-px h-12 bg-border ml-5 mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-lg font-serif font-semibold text-foreground">
                    {milestone.year}
                  </span>
                </div>
                <h4 className="font-serif text-foreground font-semibold mb-2">
                  {milestone.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {milestone.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;