import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamMember {
  slug: string;
  name: string;
  title: string;
  photo: string;
  expertise: string;
}

interface SuggestedProfilesProps {
  members: TeamMember[];
}

const SuggestedProfiles = ({ members }: SuggestedProfilesProps) => {
  if (members.length === 0) return null;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
          Meet Other Team Members
        </h2>
        <p className="text-muted-foreground">
          Discover more experts on our multidisciplinary team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.slug} className="card-elevated group hover:-translate-y-2">
            {/* Profile Image */}
            <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-muted">
              <img 
                src={member.photo}
                alt={`${member.name} - ${member.title}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-serif text-foreground mb-2 font-semibold">
                {member.name}
              </h3>
              <p className="text-primary font-medium text-sm mb-3">
                {member.title}
              </p>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {member.expertise}
              </p>
              
              <Button 
                asChild
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200"
              >
                <Link to={`/team/${member.slug}`}>
                  View Profile
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button asChild variant="outline" size="lg">
          <Link to="/team">
            View All Team Members
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SuggestedProfiles;