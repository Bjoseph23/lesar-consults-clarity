import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import AboutHero from "@/components/AboutHero";
import ValuesGrid from "@/components/ValuesGrid";
import ApproachTimeline from "@/components/ApproachTimeline";
import QASection from "@/components/QASection";
import Image3DCarousel from "@/components/Image3DCarousel";
import PartnersMarquee from "@/components/PartnersMarquee";
import CTAInline from "@/components/CTAInline";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
import AnimatedSection from "@/components/AnimatedSection";
import aboutData from "@/data/about.json";

const About = () => {
  // SEO optimization
  useEffect(() => {
    document.title = "About Us - Lesar Consults | Premier Health Analytics Firm East Africa";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content", 
        "Learn about Lesar Consults, East Africa's premier data, research and analytics consultancy firm specializing in health systems strengthening and evidence-based solutions."
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = "Learn about Lesar Consults, East Africa's premier data, research and analytics consultancy firm specializing in health systems strengthening and evidence-based solutions.";
      document.head.appendChild(meta);
    }

    // Additional SEO meta tags
    const keywords = document.createElement('meta');
    keywords.name = 'keywords';
    keywords.content = 'Lesar Consults, health systems, analytics, research, East Africa, consulting, monitoring evaluation, financial analysis';
    document.head.appendChild(keywords);

    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = window.location.origin + '/about';
    document.head.appendChild(canonical);

    // Structured data for organization
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Lesar Consults",
      "url": window.location.origin,
      "description": "Premier data, research and analytics consultancy firm serving as a hub of innovation and excellence across East Africa and beyond",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nairobi",
        "addressCountry": "Kenya",
        "streetAddress": "Tom Mboya Avenue"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254-710-715-132",
        "contactType": "customer service",
        "email": "lesarconsults@gmail.com"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup meta tags on unmount
      const metaTags = document.querySelectorAll('meta[name="keywords"], link[rel="canonical"], script[type="application/ld+json"]');
      metaTags.forEach(tag => tag.remove());
    };
  }, []);

  const breadcrumbItems = [
    { label: "About" }
  ];

  const whoWeAreData = aboutData.whoWeAre;

  return (
    <div className="min-h-screen bg-background">
      {/* SEO optimized header */}
      <header>
        <Navbar />
      </header>

      {/* Breadcrumbs - positioned below navbar */}
      <div className="pt-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <main>
        {/* Hero Section */}
        <AnimatedSection>
          <div className="relative overflow-hidden">
            {/* Blurred background graphics */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary to-accent rounded-full blur-3xl"></div>
              <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-accent to-secondary rounded-full blur-2xl"></div>
              <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-gradient-to-br from-secondary to-primary rounded-full blur-3xl"></div>
            </div>
            <AboutHero {...aboutData.hero} />
          </div>
        </AnimatedSection>

        {/* Who We Are Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                  {whoWeAreData.title}
                </h2>
                <div className="space-y-4">
                  {whoWeAreData.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </AnimatedSection>
              
              <AnimatedSection 
                delay={200} 
                className="relative transition-all duration-1000 animate-fade-in-right"
              >
                <div className="aspect-square bg-placeholder-200 rounded-2xl p-8 flex items-center justify-center">
                  <img src="/placeholder.svg" alt="About us illustration" className="w-full h-full object-contain" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <AnimatedSection>
          <ValuesGrid values={aboutData.values} />
        </AnimatedSection>

        {/* Approach Section */}
        <AnimatedSection delay={100}>
          <ApproachTimeline {...aboutData.approach} />
        </AnimatedSection>

        {/* 3D Carousel Section */}
        <AnimatedSection delay={200}>
          <Image3DCarousel slides={aboutData.carousel} />
        </AnimatedSection>

        {/* Quality Assurance Section */}
        <AnimatedSection>
          <QASection {...aboutData.qualityAssurance} />
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection delay={100}>
          <CTAInline variant="accent" />
        </AnimatedSection>

        {/* Partners Section */}
        <AnimatedSection>
          <section id="partners" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                  Our Partners & Collaborators
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Working together with leading organizations to drive meaningful change across East Africa
                </p>
              </div>
            </div>
            <PartnersMarquee hideTitle={true} />
          </section>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollTop />
    </div>
  );
};

export default About;