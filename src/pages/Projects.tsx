import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Calendar, MapPin, Users, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollTop from "@/components/ScrollTop";
import Breadcrumbs from "@/components/Breadcrumbs";
import PartnersMarquee from "@/components/PartnersMarquee";
import MetricsBox from "@/components/MetricsBox";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { formatCurrency, convertToUSD } from "@/lib/currency";
import projectsData from "@/data/projects.json";

const Projects = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbs = [
    { label: "Projects" }
  ];

  const featuredProjects = projectsData.projects.filter(project => project.featured);
  const otherProjects = projectsData.projects.filter(project => !project.featured);

  const getServiceTitle = (serviceSlug: string) => {
    const serviceMap: { [key: string]: string } = {
      "health-systems-strengthening": "Health Systems Strengthening",
      "financial-analysis-economics": "Financial Analysis & Economics", 
      "customized-research-analysis-surveys": "Research & Surveys",
      "monitoring-evaluation": "Monitoring & Evaluation",
      "hr-management-capacity-building": "HR & Capacity Building",
      "policy-advocacy-development": "Policy & Advocacy",
      "project-management": "Project Management"
    };
    return serviceMap[serviceSlug] || "Our Services";
  };

  return (
    <>
      <Helmet>
        <title>Projects — Lesar Consults: Selected Engagement Highlights</title>
        <meta 
          name="description" 
          content="Explore our portfolio of successful projects across health systems strengthening, financial analysis, research, and policy development in Kenya and East Africa." 
        />
        <meta name="keywords" content="health systems projects Kenya, policy development, financial analysis, research projects, monitoring evaluation" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Projects",
            "description": "Selected engagement highlights from Lesar Consults",
            "url": "https://lesarconsults.com/projects",
            "publisher": {
              "@type": "Organization",
              "name": "Lesar Consults"
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      
      {/* Breadcrumbs */}
      <div className="pt-20 pb-4 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section 
          ref={heroRef as any}
          className={`py-16 bg-background transition-all duration-1000 ${heroVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy mb-6">
                Projects & Impact — Selected engagement highlights
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
                Transforming health systems, strengthening organizations, and delivering measurable impact across Kenya and beyond through evidence-based consultancy
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

        {/* Featured Projects */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">
                  Featured Projects
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Our most recent and impactful engagements across health systems, policy development, and strategic analysis
                </p>
              </div>
            </AnimatedSection>

            <div className="space-y-20">
              {featuredProjects.map((project, index) => {
                const isEven = index % 2 === 0;
                const bgClass = isEven ? 'bg-cream' : 'bg-background';
                const primaryService = project.services[0];
                
                return (
                  <AnimatedSection key={project.id}>
                    <div className={`${bgClass} py-16`}>
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
                          {/* Image */}
                          <div className={`${isEven ? '' : 'lg:col-start-2'} group`}>
                            <div className="relative">
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-80 object-cover rounded-lg shadow-elegant transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-navy/10 rounded-lg"></div>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className={`${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                            <div className="flex items-center gap-2 mb-4">
                              <Calendar className="w-4 h-4 text-navy" />
                              <span className="text-sm font-medium text-navy">{project.date_range}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                project.status === 'Launched' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-4">
                              {project.title}
                            </h3>
                            
                            <p className="text-navy text-lg leading-relaxed mb-6">
                              {project.summary}
                            </p>
                            
                            {/* Partners */}
                            <div className="mb-6">
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="w-4 h-4 text-navy" />
                                <span className="text-sm font-medium text-navy">Partners:</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {project.partners.map((partner, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-navy text-white text-xs rounded-full">
                                    {partner}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            {/* Key Achievements */}
                            <div className="mb-6">
                              <h4 className="text-lg font-serif font-semibold text-navy mb-3">Key Achievements:</h4>
                              <ul className="space-y-2">
                                {project.key_achievements.map((achievement, idx) => (
                                  <li key={idx} className="flex items-start text-navy">
                                    <span className="w-2 h-2 bg-dark-red rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span className="text-sm">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Metrics */}
                            <MetricsBox
                              metrics={project.metrics as any}
                              valueOriginal={(project as any).value_original}
                              valueOriginalLocal={(project as any).value_original_local}
                              valueUsd={(project as any).value_usd}
                              tenderValue={(project as any).tender_value_original}
                              tenderValueUsd={(project as any).tender_value_usd}
                              className="mb-6"
                            />
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                              <Button 
                                className="bg-dark-red hover:bg-dark-red/90 text-white"
                                asChild
                              >
                                <Link to={`/services/${primaryService}`} className="inline-flex items-center gap-2">
                                  Explore our approach
                                  <ArrowRight className="w-4 h-4" />
                                </Link>
                              </Button>
                              <Button 
                                variant="outline"
                                className="border-navy text-navy hover:bg-navy hover:text-white"
                                asChild
                              >
                                <Link to="/contact">
                                  Get in touch
                                </Link>
                              </Button>
                            </div>
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

        {/* Other Projects */}
        <AnimatedSection>
          <section className="py-20 bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">
                  Additional Projects
                </h2>
                <p className="text-xl text-navy/70 max-w-3xl mx-auto mb-4">
                  Our broader portfolio of successful engagements across diverse sectors and geographies
               {/* </p>
                 <p className="text-sm text-navy/50 max-w-2xl mx-auto">
                  Note: metrics shown as 'Estimated' are conservative projections prepared for website demonstration and are editable in the content data file.
                </p> */}
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg p-6 shadow-card group hover:shadow-elegant transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-navy" />
                      <span className="text-sm font-medium text-navy">{project.date_range}</span>
                    </div>
                    
                    <h3 className="text-lg font-serif font-semibold text-navy mb-3 group-hover:text-navy/80 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-navy/70 text-sm mb-4 leading-relaxed">
                      {project.summary}
                    </p>
                    
                    {/* Key Metric */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="mb-4 p-3 bg-cream rounded-lg">
                        <div className="text-center">
                          <div className="text-sm font-bold text-green-600 mb-1">
                            {project.metrics[0].value}
                          </div>
                          <div className="text-xs text-navy/70">
                            {project.metrics[0].label}
                          </div>
                          {(project.metrics[0] as any).type && (
                            <Badge 
                              variant="secondary" 
                              className={`text-xs mt-1 ${
                                (project.metrics[0] as any).type === "Reported" ? "bg-green-100 text-green-800" :
                                (project.metrics[0] as any).type === "Estimated" ? "bg-blue-100 text-blue-800" :
                                "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {(project.metrics[0] as any).type}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Partners */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {project.partners.slice(0, 2).map((partner, idx) => (
                          <span key={idx} className="px-2 py-1 bg-navy/10 text-navy text-xs rounded">
                            {partner}
                          </span>
                        ))}
                        {project.partners.length > 2 && (
                          <span className="px-2 py-1 bg-navy/10 text-navy text-xs rounded">
                            +{project.partners.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'Launched' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-dark-red hover:bg-dark-red/10 hover:text-dark-red transition-colors rounded-md px-2 py-1 font-medium group"
                        asChild
                      >
                        <Link to={`/services/${project.services[0]}`} className="flex items-center">
                          Our Approach
                          <ExternalLink className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Partners Section */}
        <AnimatedSection>
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-navy mb-4">
                  Trusted by Leading Organizations
                </h2>
                <p className="text-xl text-navy/70 max-w-3xl mx-auto">
                  We collaborate with governments, development partners, and leading organizations across Africa and beyond
                </p>
              </div>
              <PartnersMarquee />
            </div>
          </section>
        </AnimatedSection>
      </main>

      <ScrollTop />
      <Footer />
    </>
  );
};

export default Projects;
