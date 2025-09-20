import { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamMember {
  slug: string;
  name: string;
  title: string;
  photo: string;
  expertise: string;
  summary: string;
  linkedin: string;
  cv: string;
}

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard = ({ member }: TeamCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="card-elevated group relative overflow-hidden h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Profile Image */}
      <div className="relative w-full h-64 overflow-hidden bg-muted">
        <img 
          src={member.photo} 
          alt={`${member.name} - ${member.title}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-navy/90 transition-opacity duration-300 flex items-center justify-center p-4 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="text-center text-white">
            <p className="text-sm leading-relaxed">
              {member.summary.substring(0, 120)}...
            </p>
            <Button 
              asChild 
              variant="outline" 
              size="sm" 
              className="mt-4 border-white text-white hover:bg-white hover:text-navy"
            >
              <Link to={`/team/${member.slug}`}>
                View Profile <ExternalLink className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-serif text-foreground mb-2 font-semibold">
          {member.name}
        </h3>
        <p className="text-primary font-medium mb-3">
          {member.title}
        </p>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {member.expertise}
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {member.linkedin && (
            <a 
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              aria-label={`${member.name}'s LinkedIn profile`}
            >
              <Linkedin className="h-4 w-4" />
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
              <FileText className="h-4 w-4" />
            </a>
          )}
          <Button 
            asChild 
            variant="ghost" 
            size="sm"
            className="ml-auto text-xs"
          >
            <Link to={`/team/${member.slug}`}>
              Full Profile →
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;