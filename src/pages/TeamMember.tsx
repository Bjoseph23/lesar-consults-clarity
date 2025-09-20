import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TeamProfile from "@/components/team/TeamProfile";
import SuggestedProfiles from "@/components/team/SuggestedProfiles";
import AnimatedSection from "@/components/AnimatedSection";
import teamData from "@/data/team.json";

const TeamMember = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const member = teamData.find(m => m.slug === slug);
  
  if (!member) {
    return <Navigate to="/team" replace />;
  }

  const suggestedMembers = teamData
    .filter(m => m.slug !== slug)
    .slice(0, 3);

  const breadcrumbItems = [
    { label: "Team", href: "/team" },
    { label: member.name }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": member.name,
    "jobTitle": member.title,
    "worksFor": {
      "@type": "Organization", 
      "name": "Lesar Consults"
    },
    "description": member.summary,
    "url": `/team/${member.slug}`,
    ...(member.linkedin && { "sameAs": [member.linkedin] })
  };

  return (
    <>
      <Helmet>
        <title>{member.name} - {member.title} | Lesar Consults</title>
        <meta 
          name="description" 
          content={`${member.summary.substring(0, 155)}...`}
        />
        <meta property="og:title" content={`${member.name} - ${member.title} | Lesar Consults`} />
        <meta property="og:description" content={member.summary} />
        <meta property="og:type" content="profile" />
        <link rel="canonical" href={`/team/${member.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20">
          {/* Breadcrumbs */}
          <div className="container mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          {/* Team Member Profile */}
          <AnimatedSection className="py-8">
            <div className="container mx-auto px-4">
              <TeamProfile member={member} />
            </div>
          </AnimatedSection>

          {/* Suggested Profiles */}
          <AnimatedSection className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4">
              <SuggestedProfiles members={suggestedMembers} />
            </div>
          </AnimatedSection>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TeamMember;