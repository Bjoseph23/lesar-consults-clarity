import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TeamGrid from "@/components/team/TeamGrid";
import Timeline from "@/components/team/Timeline";
import ScrollTop from "@/components/ScrollTop";
import AnimatedSection from "@/components/AnimatedSection";
import teamData from "@/data/team.json";
import milestonesData from "@/data/milestones.json";

const Team = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const breadcrumbItems = [
    { label: "Team" }
  ];

  return (
    <>
      <Helmet>
        <title>Meet Our Team - Expert Consultants | Lesar Consults</title>
        <meta 
          name="description" 
          content="Meet the expert team at Lesar Consults - leading economists, epidemiologists, and researchers providing evidence-based advisory services across Africa." 
        />
        <meta property="og:title" content="Meet Our Team - Expert Consultants | Lesar Consults" />
        <meta property="og:description" content="Meet the expert team at Lesar Consults - leading economists, epidemiologists, and researchers providing evidence-based advisory services across Africa." />
        <link rel="canonical" href="/team" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20">
          {/* Breadcrumbs */}
          <div className="container mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          {/* Hero Section */}
          <AnimatedSection className="py-16 bg-gradient-subtle">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
                  Meet our team
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  Our multidisciplinary team of economists, epidemiologists, and researchers brings 
                  decades of combined experience in evidence-based research and strategic advisory 
                  services across Africa and beyond.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Team Grid */}
          <AnimatedSection className="py-20">
            <div className="container mx-auto px-4">
              <TeamGrid members={teamData} />
            </div>
          </AnimatedSection>

          {/* Journey Timeline */}
          <AnimatedSection className="py-20 bg-secondary/20">
            <div className="container mx-auto px-4">
              <Timeline milestones={milestonesData} />
            </div>
          </AnimatedSection>

        </main>

        <ScrollTop />
        <Footer />
      </div>
    </>
  );
};

export default Team;