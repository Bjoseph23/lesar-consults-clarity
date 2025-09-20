import { LucideIcon } from "lucide-react";

interface QuickFact {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface QuickFactsProps {
  facts: QuickFact[];
}

const QuickFacts = ({ facts }: QuickFactsProps) => {
  return (
    <div className="card-elevated p-6">
      <h3 className="font-serif text-lg text-foreground mb-4">Quick Facts</h3>
      <div className="space-y-4">
        {facts.map((fact, index) => {
          const Icon = fact.icon;
          return (
            <div key={index} className="flex items-start">
              <div className="p-2 rounded-lg bg-primary/10 mr-3 flex-shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground mb-1">{fact.label}</p>
                <p className="text-sm font-medium text-foreground leading-tight">
                  {fact.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickFacts;