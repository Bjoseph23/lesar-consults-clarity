import { useState } from "react";
import { Linkedin, FileText, Mail, GraduationCap, Award, Target, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import QuickFacts from "./QuickFacts";

interface TeamMember {
  slug: string;
  name: string;
  title: string;
  photo: string;
  expertise: string;
  summary: string;
  education: string[];
  competencies: string[];
  contributions: string[];
  projects: Array<{
    title: string;
    year: string;
    slug: string;
    impact: string;
  }>;
  linkedin: string;
  cv: string;
}

interface TeamProfileProps {
  member: TeamMember;
}

const TeamProfile = ({ member }: TeamProfileProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const quickFacts = [
    { label: "Education", value: member.education[0], icon: GraduationCap },
    { label: "Specialization", value: member.expertise.split(" ").slice(0, 3).join(" "), icon: Target },
    { label: "Experience", value: "10+ Years", icon: Award },
    { label: "Projects", value: `${member.projects.length}+ Completed`, icon: Briefcase }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-8">
        {/* Left Column - Photo & Quick Facts */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            {/* Portrait */}
            <div className="aspect-[3/4] w-full bg-muted rounded-lg overflow-hidden">
              <img 
                src={member.photo}
                alt={`${member.name} - ${member.title}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>

            {/* Quick Facts */}
            <QuickFacts facts={quickFacts} />
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="lg:col-span-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2">
              {member.name}
            </h1>
            <p className="text-xl text-primary font-medium mb-4">
              {member.title}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mb-6">
              {member.linkedin && (
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  aria-label={`${member.name}'s LinkedIn profile`}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {member.cv && (
                <a 
                  href={member.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                  aria-label={`Download ${member.name}'s CV`}
                >
                  <FileText className="h-5 w-5" />
                </a>
              )}
              <Button 
                asChild
                className="ml-auto"
              >
                <a href={`/contact?consultant=${member.slug}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Engage {member.name.split(' ')[0]}
                </a>
              </Button>
            </div>
          </div>

          {/* Tabbed Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="competencies">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif text-foreground mb-3 flex items-center">
                    <Target className="mr-2 h-5 w-5 text-primary" />
                    Professional Summary
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {member.summary}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-serif text-foreground mb-3 flex items-center">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    Key Contributions
                  </h3>
                  <ul className="space-y-2">
                    {member.contributions.map((contribution, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{contribution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="education" className="mt-6">
              <div>
                <h3 className="text-lg font-serif text-foreground mb-4 flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                  Education & Certifications
                </h3>
                <div className="space-y-3">
                  {member.education.map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-secondary/50 rounded-lg">
                      <GraduationCap className="h-4 w-4 text-primary mr-3" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="competencies" className="mt-6">
              <div>
                <h3 className="text-lg font-serif text-foreground mb-4 flex items-center">
                  <Target className="mr-2 h-5 w-5 text-primary" />
                  Core Competencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.competencies.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              <div>
                <h3 className="text-lg font-serif text-foreground mb-4 flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-primary" />
                  Recent Projects
                </h3>
                <div className="space-y-4">
                  {member.projects.map((project, index) => (
                    <div key={index} className="card-elevated p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-foreground">{project.title}</h4>
                        <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded">
                          {project.year}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.impact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-8">
        {/* Portrait */}
        <div className="aspect-[3/4] max-w-sm mx-auto bg-muted rounded-lg overflow-hidden">
          <img 
            src={member.photo}
            alt={`${member.name} - ${member.title}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </div>

        {/* Header Info */}
        <div className="text-center">
          <h1 className="text-3xl font-serif text-foreground mb-2">
            {member.name}
          </h1>
          <p className="text-xl text-primary font-medium mb-4">
            {member.title}
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center items-center gap-3 mb-6">
            {member.linkedin && (
              <a 
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                aria-label={`${member.name}'s LinkedIn profile`}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {member.cv && (
              <a 
                href={member.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                aria-label={`Download ${member.name}'s CV`}
              >
                <FileText className="h-5 w-5" />
              </a>
            )}
          </div>
          
          <Button asChild className="w-full sm:w-auto">
            <a href={`/contact?consultant=${member.slug}`}>
              <Mail className="mr-2 h-4 w-4" />
              Engage {member.name.split(' ')[0]}
            </a>
          </Button>
        </div>

        {/* Quick Facts */}
        <QuickFacts facts={quickFacts} />

        {/* Mobile Content - Accordion Style */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-serif text-foreground mb-3">Professional Summary</h3>
            <p className="text-muted-foreground leading-relaxed">
              {member.summary}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif text-foreground mb-3">Education & Certifications</h3>
            <div className="space-y-2">
              {member.education.map((item, index) => (
                <div key={index} className="flex items-center p-3 bg-secondary/50 rounded-lg">
                  <GraduationCap className="h-4 w-4 text-primary mr-3" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif text-foreground mb-3">Core Competencies</h3>
            <div className="flex flex-wrap gap-2">
              {member.competencies.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif text-foreground mb-3">Recent Projects</h3>
            <div className="space-y-3">
              {member.projects.map((project, index) => (
                <div key={index} className="card-elevated p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-foreground text-sm">{project.title}</h4>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {project.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamProfile;