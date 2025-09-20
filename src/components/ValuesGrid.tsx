import { 
  Shield, 
  Award, 
  Users, 
  Lightbulb, 
  Target,
  LucideIcon
} from "lucide-react";

interface Value {
  title: string;
  description: string;
  icon: string;
}

interface ValuesGridProps {
  values: Value[];
}

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Award,
  Users,
  Lightbulb,
  Target,
};

const ValuesGrid = ({ values }: ValuesGridProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Our Values
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do and every decision we make
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {values.map((value, index) => {
            const IconComponent = iconMap[value.icon] || Target;
            
            return (
              <div 
                key={index}
                className="card-elevated group hover:shadow-elegant text-center"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-semibold text-primary">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
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

export default ValuesGrid;