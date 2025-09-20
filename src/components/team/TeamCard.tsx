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
  return (
    <div className="bg-[#FAEED4] rounded-2xl shadow-sm overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
      {/* Profile Image - Full width, 70% of card height */}
      <div className="relative w-full h-80 overflow-hidden">
        <img 
          src={member.photo || '/placeholder.svg'} 
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      </div>

      {/* Card Content - Bottom 30% */}
      <div className="p-6 h-32 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1 font-serif">
            {member.name}
          </h3>
          <p className="text-sm text-[#162356] font-medium">
            {member.title}
          </p>
        </div>
        
        <div className="flex justify-end">
          <Link 
            to={`/team/${member.slug}`}
            className="text-sm text-[#162356] hover:underline focus:outline-none focus:ring-2 focus:ring-[#162356] focus:ring-opacity-50 rounded transition-colors duration-200"
          >
            View Profile →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;