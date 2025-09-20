import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, CheckCircle, Target, Lightbulb, TrendingUp, Users, BarChart3, Briefcase, FileText, Settings } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import servicesData from "@/data/services.json";
import ScrollTop from "@/components/ScrollTop";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  
  const service = servicesData.services.find(s => s.slug === slug);

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-navy mb-4">Service Not Found</h1>
            <Button asChild>
              <Link to="/services">Back to Services</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const serviceIcons = {
    "health-systems-strengthening": Users,
    "financial-analysis-economics": TrendingUp,
    "customized-research-analysis-surveys": BarChart3,
    "monitoring-evaluation": Target,
    "hr-management-capacity-building": Briefcase,
    "policy-advocacy-development": FileText,
    "project-management": Settings
  };

  const IconComponent = serviceIcons[service.id as keyof typeof serviceIcons];

  const processSteps = [
    { icon: Users, title: "Reach out", description: "Initial consultation" },
    { icon: Lightbulb, title: "Discovery", description: "Needs assessment" },
    { icon: FileText, title: "Proposal", description: "Customized solution" },
    { icon: Target, title: "Implementation", description: "Delivery & execution" },
    { icon: TrendingUp, title: "Support", description: "Ongoing assistance" }
  ];

  return (
    <>
      <Helmet>
        <title>{service.title} - Lesar Consults</title>
        <meta 
          name="description" 
          content={`${service.overview.slice(0, 160)}...`} 
        />
        <meta name="keywords" content={service.keywords.join(", ")} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.title,
            "description": service.overview,
            "provider": {
              "@type": "Organization",
              "name": "Lesar Consults",
              "url": "https://lesarconsults.com"
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section 
          ref={heroRef as React.RefObject<HTMLElement>}
          className={`pt-20 pb-16 bg-background transition-all duration-1000 ${heroVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
                  {service.title}
                </h1>
                <p className="text-xl text-navy leading-relaxed mb-8">
                  {service.overview}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-dark-red hover:bg-dark-red/90 text-white"
                    asChild
                  >
                    <Link to={`/contact?service=${service.slug}`} className="inline-flex items-center gap-2">
                      Request a Proposal
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-navy text-navy hover:bg-navy hover:text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download One-Pager
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-subtle rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <IconComponent className="w-20 h-20 text-navy mx-auto mb-4" />
                    <div className="text-navy text-lg font-medium">{service.title}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Overview */}
        <AnimatedSection>
          <section className="py-20 bg-cream">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-serif font-bold text-navy mb-8 text-center">
                Detailed Overview
              </h2>
              <div className="prose prose-lg max-w-none text-navy">
                <p className="text-xl leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Process Steps */}
        <AnimatedSection>
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-serif font-bold text-navy mb-12 text-center">
                Our Engagement Process
              </h2>
              <div className="grid md:grid-cols-5 gap-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-dark-red rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-navy mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-navy/70">
                      {step.description}
                    </p>
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-navy/20 transform translate-x-8" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Challenge → Approach → Outcome */}
        <AnimatedSection>
          <section className="py-20 bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Challenge */}
                <div className="bg-white rounded-lg p-8 shadow-card">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                    <Target className="w-6 h-6 text-dark-red" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-navy mb-6">Challenge</h3>
                  <ul className="space-y-3">
                    {service.challenge.map((item, index) => (
                      <li key={index} className="flex items-start text-navy">
                        <span className="w-2 h-2 bg-dark-red rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Approach */}
                <div className="bg-white rounded-lg p-8 shadow-card">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Lightbulb className="w-6 h-6 text-navy" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-navy mb-6">Approach</h3>
                  <ol className="space-y-3">
                    {service.approach.map((item, index) => (
                      <li key={index} className="flex items-start text-navy">
                        <span className="w-6 h-6 bg-navy text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Outcome */}
                <div className="bg-white rounded-lg p-8 shadow-card">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-navy mb-6">Outcome</h3>
                  <ul className="space-y-3">
                    {service.outcomes.map((item, index) => (
                      <li key={index} className="flex items-start text-navy">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Mini Services */}
        <AnimatedSection>
          <section className="py-20 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-serif font-bold text-navy mb-12 text-center">
                Specific Services
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {service.miniServices.map((item, index) => (
                  <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-navy/10">
                    <CheckCircle className="w-5 h-5 text-dark-red mr-3 flex-shrink-0" />
                    <span className="text-navy font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection>
          <section className="py-20 bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-serif font-bold text-navy mb-12 text-center">
                Client Success Stories
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {service.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-card">
                    <blockquote className="text-navy italic mb-4 leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="border-t border-navy/10 pt-4">
                      <div className="font-semibold text-navy">{testimonial.author}</div>
                      <div className="text-sm text-navy/70">{testimonial.organization}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Related Resources */}
        <AnimatedSection>
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-navy mb-4">
                  See Relevant Resources
                </h2>
                <p className="text-xl text-navy/70 max-w-3xl mx-auto">
                  Explore related insights, case studies, and research findings
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[1, 2, 3].map((item) => (
                  <article key={item} className="bg-white rounded-lg p-6 shadow-card group hover:shadow-elegant transition-all duration-300">
                    <div className="w-full h-32 bg-gradient-subtle rounded-lg mb-4 flex items-center justify-center">
                      <div className="text-navy/60 text-sm">Resource Thumbnail</div>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-dark-red/10 text-dark-red mb-3 inline-block">
                      Case Study
                    </span>
                    <h3 className="text-lg font-serif font-semibold text-navy mb-3 group-hover:text-navy/80 transition-colors">
                      Related {service.title} Project
                    </h3>
                    <p className="text-navy/70 text-sm mb-4 leading-relaxed">
                      Insights and outcomes from our recent {service.title.toLowerCase()} engagement.
                    </p>
                    <Button variant="ghost" size="sm" className="text-dark-red hover:text-dark-red/80 p-0 h-auto font-medium group">
                      <a href="#resources" className="flex items-center">
                        Read more
                        <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </article>
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  variant="outline" 
                  className="border-navy text-navy hover:bg-navy hover:text-white"
                  asChild
                >
                  <Link to="/resources">View All Resources</Link>
                </Button>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* CTA Strip */}
        <AnimatedSection>
          <section className="py-16 bg-navy">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Let's discuss how we can support your {service.title.toLowerCase()} needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-dark-red hover:bg-dark-red/90 text-white"
                  asChild
                >
                  <Link to={`/contact?service=${service.slug}`} className="inline-flex items-center gap-2">
                    Request a Proposal
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-navy"
                  asChild
                >
                  <Link to="/resources">
                    View Resources
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>

      <ScrollTop />
      <Footer />
    </>
  );
};

export default ServiceDetail;