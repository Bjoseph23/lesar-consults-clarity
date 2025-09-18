import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PartnersMarquee from "@/components/PartnersMarquee";
import ServicesStrip from "@/components/ServicesStrip";
import Counters from "@/components/Counters";
import FeaturedCase from "@/components/FeaturedCase";
import ResourcesGrid from "@/components/ResourcesGrid";
import WhyChoose from "@/components/WhyChoose";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";

const Index = () => {

  // SEO optimization
  useEffect(() => {
    document.title = "Lesar Consults Ltd - Health Systems, Economics & Analytics Consultancy";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Premier data, research and analytics consultancy firm specializing in health systems strengthening, financial analysis, monitoring & evaluation across East Africa. Evidence-based solutions for sustainable impact.');
    }

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Lesar Consults Ltd - Demystifying Opinions in Health Systems & Economics');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Premier consultancy firm delivering evidence-based solutions in health systems, economics, and analytics across East Africa and beyond.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="relative">
        {/* Hero Section */}
        <Hero />
        
        {/* Partners Marquee */}
        <PartnersMarquee />
        
        {/* Services Overview */}
        <ServicesStrip />
        
        {/* Impact Numbers */}
        <Counters />
        
        {/* Featured Case Study */}
        <FeaturedCase />
        
        {/* Resources Section */}
        <ResourcesGrid />
        
        {/* Why Choose Lesar */}
        <WhyChoose />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollTop />
    </div>
  );
};

export default Index;
