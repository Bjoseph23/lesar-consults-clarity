import { CheckCircle, Users, Award, Globe } from "lucide-react";

const WhyChoose = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Evidence-Based Excellence",
      description: "We uphold the highest ethical standards in all research activities, delivering reliable and actionable insights through scientifically sound methodologies."
    },
    {
      icon: Users,
      title: "Collaborative Partnerships",
      description: "We believe in the power of partnerships to achieve sustainable improvements, working closely with governments, development partners, and civil society."
    },
    {
      icon: Award,
      title: "Innovation & Impact",
      description: "We embrace innovative approaches to address complex challenges and are committed to making a measurable difference in the communities we serve."
    },
    {
      icon: Globe,
      title: "International Expertise",
      description: "With experience across East and West Africa, our team brings global perspectives and local knowledge to every project."
    }
  ];

  return (
    <section id="why-choose" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Why Choose Lesar Consults
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our unique qualities and competitive advantages that set us apart as your trusted partner
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-lg font-serif font-semibold text-primary mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Additional Trust Indicators */}
        <div className="mt-16 pt-16 border-t border-border">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-lg font-serif font-semibold text-primary mb-2">
                Leadership Excellence
              </h4>
              <p className="text-sm text-muted-foreground">
                Led by PhD-qualified directors with 14+ years of experience in economics and health systems
              </p>
            </div>
            <div>
              <h4 className="text-lg font-serif font-semibold text-primary mb-2">
                Academic Contributions
              </h4>
              <p className="text-sm text-muted-foreground">
                Published researchers and peer reviewers for East African Health Research Journal and PubMed
              </p>
            </div>
            <div>
              <h4 className="text-lg font-serif font-semibold text-primary mb-2">
                Proven Track Record
              </h4>
              <p className="text-sm text-muted-foreground">
                Successfully delivered projects worth millions of USD across multiple countries and sectors
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;