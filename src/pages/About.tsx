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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <AboutHero {...aboutData.hero} />

        {/* Who We Are Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
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
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gradient-subtle rounded-2xl p-8 flex items-center justify-center">
                  <img 
                    src="/logo.png" 
                    alt="Lesar Consults team working on health systems research" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <ValuesGrid values={aboutData.values} />

        {/* Approach Section */}
        <ApproachTimeline {...aboutData.approach} />

        {/* 3D Carousel Section */}
        <Image3DCarousel slides={aboutData.carousel} />

        {/* Quality Assurance Section */}
        <QASection {...aboutData.qualityAssurance} />

        {/* CTA Section */}
        <CTAInline variant="accent" />

        {/* Partners Section */}
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
          <PartnersMarquee />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;