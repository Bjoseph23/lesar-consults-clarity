import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, Target, BarChart3, Briefcase, FileText, Settings } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import servicesData from "@/data/services.json";
import ScrollTop from "@/components/ScrollTop";

const Services = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

   const breadcrumbs = [
    { label: "Services" }
  ];

  const serviceIcons = {
    "health-systems-strengthening": Users,
    "financial-analysis-economics": TrendingUp,
    "customized-research-analysis-surveys": BarChart3,
    "monitoring-evaluation": Target,
    "hr-management-capacity-building": Briefcase,
    "policy-advocacy-development": FileText,
    "project-management": Settings
  };

  return (
    <>
      <Helmet>
        <title>Services - Evidence-Based Consultancy | Lesar Consults</title>
        <meta 
          name="description" 
          content="Evidence-based consultancy services for health systems, finance, development, M&E, and project management across Kenya and East Africa." 
        />
        <meta name="keywords" content="consultancy services Kenya, health systems strengthening, financial analysis, monitoring evaluation, project management" />
      </Helmet>

      <Navbar />

      <div className="pt-20 pb-4 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section 
          ref={heroRef as any}
          className={`pt-20 pb-16 bg-background transition-all duration-1000 ${heroVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy mb-6">
                What we do — evidence-based consultancy for health systems, finance and development
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
                Comprehensive consultancy services that transform organizations through evidence-based strategies, rigorous analysis, and sustainable capacity building
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-dark-red hover:bg-dark-red/90 text-white"
                  asChild
                >
                  <Link to="/contact" className="inline-flex items-center gap-2">
                    Request a Proposal
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-navy text-navy hover:bg-navy hover:text-white"
                  asChild
                >
                  <Link to="/resources">
                    View Resources
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {servicesData.services.map((service, index) => {
                const IconComponent = serviceIcons[service.id as keyof typeof serviceIcons];
                const isEven = index % 2 === 0;
                const bgClass = isEven ? 'bg-cream' : 'bg-background';
                
                return (
                  <AnimatedSection key={service.id}>
                    <div className={`${bgClass} py-16`}>
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
                          {/* Image */}
                          <div className={`${isEven ? '' : 'lg:col-start-2'} group`}>
                            <div className="relative bg-gradient-subtle rounded-lg h-80 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                              <div className="text-center">
                                <IconComponent className="w-16 h-16 text-navy mx-auto mb-4" />
                                <div className="text-navy text-sm font-medium">Service Visualization</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className={`${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-6">
                              {service.title}
                            </h2>
                            
                            <p className="text-navy text-lg leading-relaxed mb-6">
                              {service.overview}
                            </p>
                            
                            <div className="mb-6">
                              <h3 className="text-xl font-serif font-semibold text-navy mb-4">Key Services:</h3>
                              <ul className="grid md:grid-cols-2 gap-2">
                                {service.miniServices.slice(0, 6).map((item, itemIndex) => (
                                  <li key={itemIndex} className="flex items-start text-navy">
                                    <span className="w-2 h-2 bg-dark-red rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span className="text-sm">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Metrics */}
                            <div className="bg-white rounded-lg p-4 mb-6 border border-navy/10">
                              <div className="text-2xl font-bold text-green-600 mb-1">
                                {service.metrics.value}
                              </div>
                              <div className="text-sm text-navy">
                                {service.metrics.description}
                              </div>
                            </div>
                            
                            <Button 
                              className="bg-dark-red hover:bg-dark-red/90 text-white"
                              asChild
                            >
                              <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-2">
                                Learn more
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <ScrollTop />
      <Footer />
    </>
  );
};

export default Services;