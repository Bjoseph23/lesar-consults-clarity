import TeamCard from "./TeamCard";
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";

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

interface TeamGridProps {
  members: TeamMember[];
}

const TeamGrid = ({ members }: TeamGridProps) => {
  const { elementRef, visibleItems } = useStaggeredAnimation(members.length, 150);

  return (
    <div ref={elementRef as React.RefObject<HTMLDivElement>}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
          Our Expert Team
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Meet the professionals driving evidence-based solutions and strategic advisory services.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member, index) => (
          <div
            key={member.slug}
            className={`transition-all duration-700 ${
              visibleItems.includes(index) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: visibleItems.includes(index) ? `${index * 150}ms` : '0ms' 
            }}
          >
            <TeamCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamGrid;